import React from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const EmailTester = () => {

  const {loading, request, error, clearError} = useHttp()
  const [email,setEmail] = useState('')

  const publishHandler = async () => {
    try {
        const data = await request('/api/email/send', 'POST', {email})
    } catch (e) {} 
  }  

  return (
    <div style={{height: '100vh',
    background: '#fefe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>
        <div>
            <input type="text" name="email" id="" onChange={e => setEmail(e.target.value)}/>
            <button onClick={publishHandler}>Submit</button>
        </div>
    </div>
  )
}
