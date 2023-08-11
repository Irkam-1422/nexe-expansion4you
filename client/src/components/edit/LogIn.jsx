import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContex'
import { useHttp } from '../../hooks/http.hook'
import styles from '../../styles/Login.module.css'
 
export const LogIn = () => {

  const auth = useContext(AuthContext)  
  const {loading, request, error, clearError} = useHttp()  
  const [form,setForm] = useState({email: '', password: ''}) 
  const [msg,setMsg] = useState('')
  
  useEffect(() => {
    if (error) {
        setMsg(error)
        clearError()
    }
  },[error, clearError])

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const registerHandler = async () => {
    try {
        console.log('FORM:', {...form});
        const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId)
    } catch (e) {
        
    }
  }

  const registerFromEnter = (e) => {
    if (e.key == 'Enter') registerHandler()
  }

  return (
    <div className={styles.cont}>
        <div className={styles.form}>
            <h1>Log In</h1>
            <input className={styles.input} 
                   type="text" 
                   name="email" 
                   placeholder='email'
                   onChange={changeHandler} 
                   onKeyDown={registerFromEnter}
                   />
            <input className={styles.input} 
                   type="password" 
                   name="password" 
                   placeholder='password'
                   onChange={changeHandler} 
                   onKeyDown={registerFromEnter}
                   />
            <div style={{color: 'red'}}>{msg}</div>
            <button className={styles.submit} 
                    disabled={loading}
                    onClick={registerHandler}
                    >Log In</button>
        </div>
    </div>
  )
}
