import React from 'react'
import { useEffect } from 'react'
import styles from '../styles/Modal.module.css'

export const Modal2 = ({msg, returnClose, returnDelete}) => {


  const closeModal = (e) => {
    returnClose()
    if (e.target.innerHTML == 'Delete') {
      msg.id ? returnDelete(msg.id) : returnDelete(msg.title)
    } 
  } 


  return (
    <div className={styles.modalOuter}>
        <div className={styles.modalInner}>
            <div className={styles.text}>
                {msg.text}
                <h2>"{msg.title}"</h2>
                {msg.text2} 
            </div>
            <div className="">
                <button onClick={closeModal} className={`${styles.deleteBtn} ${styles.editBtn}`}>Delete</button>
                <button onClick={closeModal} className={styles.editBtn}>Close</button>
            </div>
        </div>
    </div>
  )
}