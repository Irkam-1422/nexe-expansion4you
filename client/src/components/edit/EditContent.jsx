import React, {useRef,useCallback, useEffect} from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import styles from '../../styles/Edit.module.css'
import { Modal } from '../Modal'
import { Modal2 } from '../Modal2'

export const EditContent = ({page,returnPage,reloadServices,returnServices}) => {

  const {loading, request, error, clearError} = useHttp()  
  const navigate = useNavigate()
  const container = useRef(null) 
  const textarea = useRef(null) 
  const contentCont = useRef(null)
  const [value,setValue] = useState([])
  const [steps,setSteps] = useState([])
  const [form,setForm] = useState([])
  const [open,setOpen] = useState(false)
  const [modal,setModal] = useState(false)
  const [msg,setMsg] = useState({
    text: '', success: ''
  })
  const [msg2,setMsg2] = useState({
    text: 'Are you sure you want to delete article:', 
    title: '', text2: 'You won`t be able to undo this action.', id: ''
  })

  useEffect(() => {
    setForm(page.components)
    setSteps([])
    if (page.page=='services') {
      const serviceTitles = page.components[0].content.slice(1).map(a => a[0])
      returnServices(serviceTitles) 
    }
  }, [page.components]); 

  useEffect(() => {
    if (error) {
        setMsg({text: error, success: false})
        setOpen(true) 
        clearError()
    }
  },[error, clearError])

  const changeHandler = (e) => {
    const nums = e.target.name.split('-')
    let newForm = form[nums[0]]
    newForm.content[nums[1]][nums[2]] = e.target.value
    setForm(prev => prev.slice(0,nums[0]).concat([newForm].concat(prev.slice(nums[0]+1))))
    console.log(form);
  }

  const publishHandler = async () => {
    try {
        if (page.parent == 'services') {
          setForm(prev => prev.splice(prev.length-1,0,...steps))
          console.log(form)
        }
        const id = page._id
        setTimeout(async () => { 
          const data = await request('/api/content/update', 'POST', {id,form})
          if (data) setMsg({text: 'Your changes were successfuly saved!', success: true})
          setOpen(true) 
        },100)
    } catch (e) {}
  }

  const closeModal = () => {
    setOpen(false)
    setModal(false)
  }

  const handleServicePageReturn = (e) => {
  console.log(returnPage) 
  const name = e.target.innerHTML.split('<')[0].toLowerCase().split(' ').join('')
  returnPage(name)
  }

  const deleteService = async (title) => {
  console.log(title)
  const name = title.split(' ').join('').split('-').join('').toLowerCase()
  const data = await request('/api/content/delete-service', 'POST', {name,title})
  if (data) {
    reloadServices()
  } 
  }

  const handleDeleteFromInside = () => {
  const string = page.components[page.components.length-1].content[0][1].split(' ').slice(1).join(' ')
  const title = string.slice(0,string.length-1)
  deleteService(title)
  }

  const handleAddStep = () => {
  setSteps(prev => prev.concat([{
    title: `Step ${prev.length+1}`, 
    content: [['Then it`s about','',''],['']] 
  }]))
  }

  const handleStepChange = (e) => {
  if (e.target.name.includes('title')) {
    setSteps(prev => prev.map((step,i) => { 
      if (i==e.target.name.split('-')[0]) {
        step.title = e.target.value
      } 
      return step
    }))
  } else {
    const nums = e.target.name.split('-')
    setSteps(prev => prev.map((step,i) =>  {
      if (i==nums[0]) {
        step.content[nums[1]][nums[2]] = e.target.value
      } 
      return step
    })) 
  }
  }

  const handleAddParagraph = (index) => {
  setSteps(prev => prev.map((step,i) =>  {
    if (i==index) {
      let newContent = step.content[1].concat([''])
      step.content[1] = newContent
      console.log(newContent)
      return step 
    } else {
      return step
    }
  })) 
  console.log(steps[0].content)
  }

  const handleDeletingClick = (a) => {
    setMsg2({...msg2, title: a, id: null})
    setModal(true)
  }

return (
<div className={styles.cont}>
    {open && <Modal msg={msg} returnClose={closeModal} page={page.page}/>} 
    {modal && <Modal2 msg={msg2} returnClose={closeModal} returnDelete={deleteService}/>} 
    <div className={styles.pannel}> 
        {page.components.map((c,component) => {
            return (<>
            {page.parent == 'services' && (c.title=='Footer' || component==page.components.length-1) && <> {steps.map((step,index) => <div className={styles.box}>
              <input type="text" 
                     name={`${index}-title`} 
                     className={`${styles.input} ${styles.titleInp}`}  
                     onChange={handleStepChange}
                     value={step.title} /> 
               <div className="">
                {step.content[0].map((c,i) => i==1 ? '' : <input type="text" 
                                        name={`${index}-0-${i}`} 
                                        className={styles.input} 
                                        value={c}
                                        onChange={handleStepChange}
                                        placeholder={c == '' ? 'You/Channels/Emotions/Content' : ''}/> )} 
               </div>
               <div className="">
                {step.content[1].map((c,i) => <textarea type="text" 
                                        name={`${index}-1-${i}`}  
                                        className={styles.input} 
                                        value={c}
                                        onChange={handleStepChange}
                                        placeholder={`paragraph ${i+1}`}/> )}  
               </div> 
              <button className={styles.addServiceBtn} onClick={() => handleAddParagraph(index)} style={{top: '-1vh'}}>+ Add Paragraph</button>
            </div> )}
            <button className={styles.addService} onClick={handleAddStep}>
            + Add Step 
            </button></>} 
            <div className={styles.box}>
                <h2 style={{display: 'inline-flex'}}> 
                    {c.title} 
                </h2> 
                {page.parent == 'services' && component==0 && <button className={styles.deleteService} onClick={handleDeleteFromInside}>Delete Service</button> }
                <div className={styles.contentCont} ref={contentCont}> 
                {c.content.map((array,content) => {
                return (
                <div className={styles.inputCont}>
                    {array.map((a,i) => {
                    if (a.length<45) {
                    return ( 
                        <input type="text" 
                            className={styles.input} 
                            style={i==array.length-1?{borderBottom: '1.5px solid #642066'}:{}}
                            value={a}
                            onChange={changeHandler}
                            name={`${component}-${content}-${i}`}
                            />
                    ) 
                    } 
                    return (
                        <textarea className={styles.input} 
                                style={i==array.length-1 ? 
                                        {borderBottom: '1.5px solid #642066', 
                                        height: textarea.current ? `${textarea.current.scrollHeight}px` : 'auto'}
                                        :{height: textarea.current ? `${textarea.current.scrollHeight}px` : 'auto'}}      
                                type="text"
                                ref={textarea}
                                onChange={changeHandler}
                                name={`${component}-${content}-${i}`}
                                >{a}
                        </textarea>
                    )})}
                </div>
                )})}
                </div>
                {c.title == 'Our Services' && <>
                <button className={styles.addService} onClick={() => navigate('/add-service')}>+ Add Service</button>
                <div className="">
                  <div className={styles.servicesDisplay}>
                    {c.content.slice(1).map(a => {
                      return (<div className={styles.serviceBtn}>
                        <div onClick={handleServicePageReturn}> 
                        {a}
                      </div>
                      <div className={styles.delete} style={{right: '8px'}} onClick={() => handleDeletingClick(a[0])}>X</div>
                      </div>) 
                    })}
                  </div> 
                </div>
                </>}
            </div> 
            </>
        )})}
    </div>
    <button className={styles.submitUpdates} onClick={publishHandler}>Submit Updates</button>
</div>
)}
