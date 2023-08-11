import React, {useState, useEffect} from 'react'
import styles from '../../styles/Edit.module.css'
import { useHttp } from '../../hooks/http.hook'
import { useNavigate } from 'react-router-dom'
import { FileInput } from '../FileInput'
import { CheckForImg } from './CheckForImg'

export const AddService = ({length}) => {
  
  const {loading, request, error, clearError} = useHttp()  
  const navigate = useNavigate()
  const [titleValue,setTitleValue] = useState(null)

  useEffect(() => {
    console.log(length)
  },[length])

  const handleChange = (e) => {
    //console.log(e.target.name)
    if (e.target.name == 'title') {
        setForm({...form, [e.target.name]: e.target.value})
    } else {
        const nums = e.target.name.split('-')
        let newBody = form.body
        newBody[nums[0]].content[nums[1]][nums[2]] = e.target.value
        //console.log('newBody:',newBody[nums[0]].content[nums[1]][nums[2]])
        setForm({...form, body: newBody})

        // setTimeout(() => {
        //     console.log('form.body:',form.body[nums[0]].content[nums[1]][nums[2]]);
        // },100)
    }
  }

  const [value,setValue] = useState('')
  const [form,setForm] = useState({
    title: '',
    body: [
       {title: 'Overview', content: [[
        'What is title','','Now let`s break it in smaller parts','to find out what we do here!'
       ]]},
       {title: '', content: [
        ['First of all it`s about','',''],
        ['']
       ]},
       {title: 'Footer', content: [
        ['All of these questions can be answered with two words:','- title','']
       ]}    
    ]
  })  
  const [steps,setSteps] = useState([1])  

  const handleAddStep = () => {
    const newBody = form.body 
    newBody.splice(-1,0,{
        title: '', content: [
            ['Then all it`s about','',''],
            ['']
           ]
    })
    console.log(newBody)
    setForm({...form, body: newBody})
    setTimeout(() => {
        setSteps(prev => prev.concat([1]))
    },100)
  }

  const handleAddParagraph = (index) => {
    console.log(index)
    const newBody = form.body 
    newBody[index].content[1].push('')
    console.log(newBody)
    setForm({...form, body: newBody})
  }

  const publishHandler = async () => {
    let newBody = form.body 
    newBody[0].content[0][0] = `What is ${form.title}`
    newBody[newBody.length-1].content[0][1] = `- ${form.title}.`
    newBody = [newBody[0]].concat(newBody.slice(1,-1).map(b => { 
        return {content: b.content, title: b.content[0][2]}
    }), [newBody[newBody.length-1]]) 
    const titles = []
    for (let i = 0; i < newBody.length-2; i++) {
        console.log(newBody[i+1])
        titles.push(newBody[i+1].content[0][2])
    }
    console.log(titles)
    const page = form.title.toLowerCase().split(' ').join('')
    setForm({...form, body: newBody})  
    setTimeout(async () => {
        const data = await request('/api/content/add-service', 'POST', {page,form,titles}) 
        if (data) navigate('/edit-content')
    },100)
  }

  const handlePhotoReturn = (name) => {
    console.log(name)
    //setForm({...form, body: form.body.concat({type: 'photo', text: name})}) 
  }

  return (
    <div className={styles.addServiceCont}>
        <div className={styles.inputDiv}>
            <input className={styles.serviceInput} 
                   style={{fontSize: '2rem'}} 
                   type="text" 
                   name="title" 
                   value={form.title} 
                   onChange={handleChange}
                   placeholder='Service Title'/>
        </div>
        {length && <CheckForImg source={`service${+length+2}`}/>}  
        <div className={styles.inputBox}>
            <textarea className={styles.serviceInput} 
                      name="0-0-1" 
                      onChange={handleChange}
                      value={form.body[0].content[0][1]} 
                      placeholder='Write a little description of this service'></textarea>
            <input className={styles.serviceInput} 
                   type="text" 
                   name="0-0-2" 
                   onChange={handleChange}
                   value={form.body[0].content[0][2]}/>
            <input className={styles.serviceInput} 
                   type="text" 
                   name="0-0-3" 
                   onChange={handleChange}
                   value={form.body[0].content[0][3]}/>
        </div>
        {steps.map((step,index) => <div className={styles.inputBox}>
                <p className={styles.stepNum}>Step {index+1}</p> 
                <input className={styles.serviceInput} 
                       type="text" 
                       name={`${index+1}-0-0`} 
                       value={form.body[index+1].content[0][0]} 
                       onChange={handleChange}
                       />
                <input className={styles.serviceInput}  
                       type="text" 
                       name={`${index+1}-0-2`} 
                       value={form.body[index+1].content[0][2]}
                       placeholder='You/Channels/Keywords/Content'
                       onChange={handleChange}
                       />
                {form.body[index+1].content[1].map((c,i) => 
                    <textarea className={styles.serviceInput}  
                            type="text" 
                            name={`${index+1}-1-${i}`} 
                            value={form.body[index+1].content[1][i]}
                            placeholder={`paragraph ${i}`}
                            onChange={handleChange}
                            ></textarea>)}
                <CheckForImg source={form.body[index+1].content[0][2].split(' ').join('').toLowerCase()}/>
                <button className={styles.addServiceBtn} onClick={() => handleAddParagraph(index+1)}>+ Add Paragraph</button>
            </div>)}
        <button className={`${styles.addServiceBtn} ${styles.addStepBtn}`} 
                onClick={handleAddStep}>+ Add Step</button>
        <div className={styles.inputBox}>
            <textarea className={styles.serviceInput} 
                      name={`${form.body.length-1}-0-2`} 
                      onChange={handleChange}
                      value={form.body[form.body.length-1].content[0][2]} 
                      placeholder='Write a little closing statement about this service'></textarea>
        </div>
        <button className={styles.submitUpdates} onClick={publishHandler}>Publish</button>
    </div>
  )
}
