import React from 'react'
import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/Articles.module.css'
import { useHttp } from "../../hooks/http.hook"
import { CheckForImage } from '../articles/CheckForImage'
import { FileInput } from '../FileInput'

export const AddStudy = ({casestudy}) => {
  
  const {loading, request, error, clearError} = useHttp()
  const navigate = useNavigate()
  const textarea = useRef(null)  
  const hashInp = useRef(null)  
  const [elements, setElements] = useState([])  
  const [hashes, setHashes] = useState([])  
  const [value, setValue] = useState("")
  const [form,setForm] = useState({titleBig: '', titleSmall: '', hashtags: [], body: []}) 
  const addBtn = useRef(null)
  const deleteBtn = useRef(null)
  const [additional,setAdditional] = useState([])


  useEffect(() => {
    if (casestudy) {
      setForm(casestudy)
      setHashes(casestudy.hashtags)
    }
  },[casestudy])

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

  const handleHashes = (e) => {
    if (hashInp.current.value.length) {
      setHashes(prev => prev.concat([hashInp.current.value]))
    }
    setTimeout(() => {
      hashInp.current.value = ''
      //setForm({...form, hashtags: hashes}) 
    },100)
  }

  const handleChange = (e) => {
    const val = e.target?.value;
    setValue(val);
  }

  const changeHandler = (e) => {
    if (e.target.name.includes('-')) {

      const index = e.target.name.split('-')[1]
 
      setForm({...form, body: form.body.map((elm,i) => {
        if (i==index) {
          return {type: elm.type, text: e.target.value}
        } else {
          return elm
        }
      })})
    } else if (e.target.name=='titleBig' || e.target.name=='titleSmall') {
      setForm({...form, [e.target.name]: e.target.value})
    } else {
      if (e.target.name=='paragraph') handleChange(e)
      setForm({...form, body: form.body.concat({type: e.target.name, text: e.target.value, hide: true})})
    }
  }

  const publishHandler = async () => {
    try {
        setForm({...form, hashtags: hashes}) 
        const data = await request('/api/casestudy/publish', 'POST', {...form})
        navigate(`/casestudies/:${data.casestudy._id}`)
    } catch (e) {} 
  }

  const updateHandler = async () => {
    console.log(form)
    try {
      const id = casestudy._id
      const data = await request('/api/casestudy/update', 'POST', {form,id}) 
      navigate(`/casestudies/:${id}`)
    } catch (error) {
      console.log(error)
    } 
  }

  const handleDeleteHash = (i) => {
    // const newHashes = hashes
    // newHashes.splice(i,1)
    setHashes(hashes.filter((h,index) => index!==i))  
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

  const handleShowAddBtn = (e, i) => {
    const top = getCoords(e.target).top
    if (addBtn.current) {
      addBtn.current.style.top = `${top}px`
      addBtn.current.dataset.id = i
    }
    if (deleteBtn.current) {
      deleteBtn.current.style.top = `${top}px`
      deleteBtn.current.dataset.id = i
    }
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

  const handleAddBtnClick = (e) => {
    const index = e.target.dataset.id
    const array = additional
    array[index] = btns(index).btns
    console.log(array) 
    setAdditional([...array])
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
        {casestudy && <>
          <div className={styles.inputCont}>
            <input className={styles.titleInput} 
                   style={{borderBottom: '1px solid', fontSize: '1.4rem', fontWeight: '400'}} 
                   name="titleSmall"
                   type="text" 
                   value={form.titleSmall}
                   placeholder="Main Subtitle"
                   onChange={changeHandler}/> 
        </div>
        <div className={styles.inputCont}>
            <input type="text" 
                   name="titleBig"
                   value={form.titleBig}
                   placeholder="Main Title" 
                   className={styles.titleInput}
                   onChange={changeHandler}/>
        </div>
        {form.body.map((elm,i) => {
          if (elm.hide) { return "" } else {
          return ( <div className={styles.inputCont}
                        onMouseEnter={(e) => handleShowAddBtn(e,i)}>
                    {elm.type == 'subtitle' && <input className={styles.input} 
                                                          name={`subtitle-${i}`}
                                                          type="text" 
                                                          value = {elm.text}
                                                          placeholder="Subtitle"
                                                          onChange={changeHandler}/> }
                    {elm.type == 'paragraph' && <textarea name={`paragraph-${i}`} 
                                                              ref={textarea}
                                                              value = {elm.text}
                                                              className={styles.input} 
                                                              placeholder="Paragraph" 
                                                              onChange={changeHandler}
                                                              ></textarea>}
                    {elm.type == 'photo' && <CheckForImage source={elm.text}/>}
                    {additional[i] && additional[i]} 
                   </div> )}
          // if (elm.type == 'subtitle') return ( <div className={styles.inputCont}>
          //                                           <input className={styles.input} 
          //                                                 name="subtitle"
          //                                                 type="text" 
          //                                                 value = {elm.text}
          //                                                 placeholder="Subtitle"
          //                                                 onChange={changeHandler}/> 
          //                                       </div> )
          // if (elm.type == 'paragraph') return ( <div className={styles.inputCont}>
          //                                           <textarea name="paragraph" 
          //                                                     ref={textarea}
          //                                                     value = {elm.text}
          //                                                     className={styles.input} 
          //                                                     placeholder="Paragraph" 
          //                                                     onChange={changeHandler}
          //                                                     ></textarea>
          //                                       </div> )
          // if (elm.type == 'photo') return ( <div className={styles.inputCont}>
          //                                       <input type="file" 
          //                                             name="photo"
          //                                             value = {elm.text}
          //                                             className={styles.input}
          //                                             onChange={changeHandler}/>
          //                                   </div> )
        })}
        </>}
        {!casestudy && <>
        <div className={styles.inputCont}>
            <input className={styles.titleInput} 
                   style={{borderBottom: '1px solid'}}
                   name="titleSmall"
                   type="text" 
                   placeholder="Main Subtitle"
                   onChange={changeHandler}/> 
        </div>
        <div className={styles.inputCont}>
            <input type="text" 
                   name="titleBig"
                   placeholder="Main Title" 
                   className={styles.titleInput}
                   onChange={changeHandler}/>
        </div>
        </>}
        <div className={styles.inputCont} style={{margin: '2% 0'}}>
          <div className={styles.hashesText}>Add some keywords: </div>
          <input type="text"
                 ref={hashInp}
                 className={styles.input} 
                 placeholder="e.g: Social Media" 
                 style={{width: '63%', paddingLeft: '1%'}}/>
          <button onClick={handleHashes} className={styles.btn}>+Add</button>
        </div>
        <div className={styles.addHashesCont}>
          {hashes.map((h,i) => <div className={styles.addHash}>{h} 
            <div className={styles.deleteHash} onClick={() => handleDeleteHash(i)}>X</div> 
          </div> )} 
        </div>
        {elements}
        <hr />
        <div className={styles.btnsCont}>
            <button onClick={addSubtitle} className={styles.btn}>+ Add Subtitle</button>
            <button onClick={addParagrph} className={styles.btn}>+ Add Paragraph</button>
            <button onClick={addPhoto} className={styles.btn}>+ Add Photo</button>
        </div>
      </div>
      {!casestudy && <button className={`${styles.btn} ${styles.submit}`} onClick={publishHandler}>Publish</button>}
      {casestudy && <button className={`${styles.btn} ${styles.submit}`} onClick={updateHandler}>Update</button>}
    </div>
  )
}
