import React from 'react'
import styles from '../../styles/Contact.module.css'

export const ContactImgBtn = () => {
  return (
    <div className={styles.contactBtnCont}>
        <div className={styles.contactBtn}>
            <div className={`${styles.phoneImg} ${styles.imgBtn}`}></div> 
        </div>
    </div>
  )
}
