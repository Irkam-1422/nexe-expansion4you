import React from 'react'
import { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Modal.module.css'
import { AuthContext } from '../context/AuthContex';

export const Modal = ({msg, returnClose, page}) => {
  
  const auth = useContext(AuthContext)  
  const navigate = useNavigate()
  
  const closeModal = () => {
    returnClose()
  } 

  const handlePageNavigation = () => {
    navigate(`/${page}`)
    setTimeout(() => {
      auth.logout()
    },100)
  }

  return (
    <div className={styles.modalOuter}>
        <div className={styles.modalInner}>
            <div className={styles.text}>
                {msg.text}
            </div>
            {msg.success ? 
            <>
            <button className={`${styles.btn}`} onClick={handlePageNavigation} style={{background: '#6420665e'}}>Proceed to the edited page</button>
            <button className={styles.btn} onClick={closeModal}>Continue editing</button>
            </> :
            <button onClick={closeModal}>Close</button> } 
        </div>
    </div>
  )
}
