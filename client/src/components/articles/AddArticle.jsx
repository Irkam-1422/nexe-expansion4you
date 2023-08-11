import { useState, useRef, useEffect } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Articles.module.css'
import { useHttp } from "../../hooks/http.hook"
import { FileInput } from "../FileInput"
import { CheckForImage } from "./CheckForImage"

export const AddArticle = ({article}) => {

  const {loading, request, error, clearError} = useHttp()
  const navigate = useNavigate()
  const textarea = useRef(null)  
  const addBtn = useRef(null)
  const deleteBtn = useRef(null)
  const [elements, setElements] = useState([])  
  const [value, setValue] = useState("");
  const [form,setForm] = useState({title: '', body: []}) 
  const [additional,setAdditional] = useState([])

  useEffect(() => {
    if (article) {
      setForm(article)
    }
  },[article])

  useEffect(() => {
    if (textarea.current) {
        textarea.current.style.height = "0px";
        const scrollHeight = textarea.current.scrollHeight;

        textarea.current.style.height = scrollHeight + "px";
    }
  }, [textarea.current, value]);  

  const addSubtitle = () => {
    setElements(prev => prev.concat([
        <div className={styles.inputCont}>
            <input className={styles.input} 
                   name="subtitle"
                   type="text" 
                   placeholder="Subtitle"
                   onChange={changeHandler}/> 
        </div>
    ]))
  }

  const addParagrph = () => {
    setElements(prev => prev.concat([
        <div className={styles.inputCont}>
            <textarea name="paragraph" 
                      ref={textarea}
                      className={styles.input} 
                      placeholder="Paragraph" 
                      onChange={changeHandler}
                      ></textarea>
        </div>
    ]))
  }

  const addPhoto = () => {
    console.log(form.title.split(' ').join(''))
    setElements(prev => prev.concat([
        <FileInput name={form.title.split(' ').join('')} returnSuccess={handlePhotoReturn}/>
    ])) 
  }

  const handlePhotoReturn = (name) => {
    setForm({...form, body: form.body.concat({type: 'photo', text: name})}) 
  }

  const handlePhotoReturn2 = (name,index) => {
    console.log(name,+index+1) 
    setForm({...form, body: form.body
      .slice(0,+index+1)
      .concat({type: 'photo', text: name}, form.body 
      .slice(+index+1))})
  }

  const handleChange = (e) => {
    const val = e.target?.value;
    setValue(val);
  }

  const changeHandler = (e) => {
    console.log(e.target)
    console.log('changeHandler')
    if (e.target.name.includes('-')) {

      const index = e.target.name.split('-')[1]
 
      setForm({...form, body: form.body.map((elm,i) => {
        if (i==index) {
          return {type: elm.type, text: e.target.value}
        } else {
          return elm
        }
      })})
    } else if (e.target.name=='title') {
      setForm({...form, [e.target.name]: e.target.value})
    } else {
      if (e.target.name=='paragraph') handleChange(e)
      setForm({...form, body: form.body.concat({type: e.target.name, text: e.target.value, hide: true})})
    }
  }

  const subtitle = (index) => {
    return {
      subtitle: <div className={styles.inputCont}>
      <input className={styles.input} 
             name="subtitle"
             type="text" 
             placeholder="Subtitle"
             style={{color: 'red'}}
             onChange={(e) => handleAddsChange(e,+index+1)}/> 
    </div> 
    }
  }
  const paragraph = (index) => {
    return {
      paragraph: <div className={styles.inputCont}>
      <textarea name="paragraph" 
                ref={textarea}
                className={styles.input} 
                placeholder="Paragraph" 
                style={{color: 'red'}}
                onChange={(e) => handleAddsChange(e,+index+1)}
                ></textarea>
    </div>
    }
  }
  const btns = (index) => {
    return {
      btns: <>
      <hr />
      <div className={styles.btnsCont}>
          <button onClick={() => addAdditionals('subtitle', index)} className={styles.btn}>+ Add Subtitle</button>
          <button onClick={() => addAdditionals('paragraph', index)} className={styles.btn}>+ Add Paragraph</button>
          <button onClick={() => addAdditionals('photo', index)} className={styles.btn}>+ Add Photo</button>
      </div>
      </> 
    }
  }

  const publishHandler = async () => {
    console.log(form.title)
    console.log(form.title.split(' ').join('-'))
    try {
        const data = await request('/api/article/publish', 'POST', {...form})
        navigate(`/articles/:${form.title.split(' ').join('-')}`)
    } catch (e) {}
  }

  const updateHandler = async () => {
    console.log(form)
    try {
      const id = article._id
      const data = await request('/api/article/update', 'POST', {form,id}) 
      navigate(`/articles/:${form.title.split(' ').join('-')}`)
    } catch (error) {
      console.log(error)
    } 
  }

  const handleShowAddBtn = (e, i) => {
    const top = getCoords(e.target).top
    if (addBtn.current) {
      addBtn.current.style.top = `${top+8}px`
      addBtn.current.dataset.id = i
    }
    if (deleteBtn.current) {
      deleteBtn.current.style.top = `${top}px`
      deleteBtn.current.dataset.id = i
    }
  }

  const handleAddBtnClick = (e) => {
    const index = e.target.dataset.id
    const array = additional
    array[index] = btns(index).btns
    console.log(array) 
    setAdditional([...array])
  }

  const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

  const handleDeleteEntry = (e) => {
    console.log('handleDeleteEntry')
    const index = e.target.dataset.id 
    console.log(index)
    console.log(form.body.filter((elm,i) => i!==+index))
    setForm({...form, body: [...form.body.filter((elm,i) => i!==+index)]}) 
  }

  function addAdditionals(text, index) {
    console.log('addAdditionals')
    const array = additional
    if (text=='subtitle') array[index] = subtitle(index).subtitle
    if (text=='paragraph') array[index] = paragraph(index).paragraph
    console.log(text)
    if (text=='photo') array[index] = <FileInput name={form.title.split(' ').join('')} returnSuccess={(name) => handlePhotoReturn2(name,index)}/>
    setAdditional([...array])
  } 

  function handleAddsChange(e,i) { 
    console.log('handleAddsChange')
    if (e.target.name=='paragraph') handleChange(e)  
    setForm({...form, body: form.body 
      .slice(0,i)
      .concat([{type: e.target.name, text: e.target.value}], form.body.slice(i))})
    e.target.style.display = 'none'
  }


  return (
    <div className={`${styles.addArticleCont} ${styles.addArticleCont1}`} style={{minHeight: '100vh'}}>
      <div className={styles.addBtn} ref={addBtn} onClick={handleAddBtnClick}>+</div>
      <div className={`${styles.addBtn} ${styles.deleteBtn}`} ref={deleteBtn} onClick={handleDeleteEntry}>Delete</div>
      <div className={styles.addArticleCont}> 
        {article && <div className="">
        <div className={styles.inputCont}>
            <input type="text" 
                   name="title"
                   placeholder="Title" 
                   value = {form.title}
                   className={styles.titleInput}
                   onChange={changeHandler}/>
        </div>
        {form.body.map((elm,i) => {
          if (elm.hide) 
          { 
            return "" 
          } else {
          return (
            <div className={styles.inputCont} 
                 onMouseEnter={(e) => handleShowAddBtn(e,i)}
                 >
              {elm.type == 'subtitle' && <input className={styles.input}  
                    name={`subtitle-${i}`}
                    type="text" 
                    value = {elm.text}
                    placeholder="Subtitle"
                    style={{fontWeight: '600'}}
                    onChange={changeHandler}/> }
              {elm.type == 'paragraph' && <textarea name={`paragraph-${i}`}
                    ref={textarea}
                    value = {elm.text}
                    className={styles.input} 
                    placeholder="Paragraph" 
                    onChange={changeHandler}
                    ></textarea>}
              {elm.type == 'photo' && 
                 <CheckForImage source={elm.text}/>
              }
              {additional[i] && additional[i]} 
            </div> )
          }
        })}
        </div>}
        {!article && <div className={styles.inputCont}>
            <input type="text" 
                   name="title"
                   placeholder="Title" 
                   className={styles.titleInput}
                   onChange={changeHandler}/>
        </div>}
        {elements}
        <>
        <hr />
        <div className={styles.btnsCont}>
            <button onClick={addSubtitle} className={styles.btn}>+ Add Subtitle</button>
            <button onClick={addParagrph} className={styles.btn}>+ Add Paragraph</button>
            <button onClick={addPhoto} className={styles.btn}>+ Add Photo</button>
        </div>
        </>
      </div>
      {!article && <button className={`${styles.btn} ${styles.submit}`} onClick={publishHandler}>Publish</button>}
      {article && <button className={`${styles.btn} ${styles.submit}`} onClick={updateHandler}>Update</button>}
    </div>
  )
}
