import React, {useState} from 'react'
import styles from '../styles/Articles.module.css'


export const FileInput = ({name, returnSuccess}) => {
  
  const [uploaded,setUploaded] = useState("")  

  const handleFileChange = async (e) => {
    try {
        const newName = name.includes('?') ? name.split('?').join('') : name 
        const formData = new FormData() 
        formData.append('file', e.target.files[0])
        formData.append('name', newName)

        const res = await fetch('/api/article/form', {
            method: 'POST',
            body: formData,
        })

        if (!res.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await res.json()
        console.log(data)
        returnSuccess(data.file)
        checkSource(data.file)
        // setTimeout(() => {
        //     console.log(require(`../assets/${data.file}`))
        //     setUploaded(data.file)
        // },1000)

    } catch (error) {
        console.error('Error:', error)
    }
  };

  const checkSource = (file) => {
    try {
        const src = require(`../assets/${file}`)
        setUploaded(src)
    } catch (e) {
        console.log(e)
    }
  }

  return (
    <div className={styles.inputCont}> 
        {!uploaded.length && <input type="file" 
               name="file" 
               onChange={handleFileChange} 
               className={styles.input}
               onClick={() => console.log('fileInput')}
               /> }
        {uploaded.length && <img src={require(`../assets/${uploaded}`)} style={{width: '60%', marginTop: '2%' }} /> }
    </div> 
  )
}
