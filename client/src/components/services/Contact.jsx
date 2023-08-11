import React from 'react'
import styles from '../../styles/Contact.module.css'

export const Contact = () => {
  return (
    <div className={styles.contactBtnCont}>
        {/*  */}
        <div className={styles.contactBtn}>
            {/*      */}
            <div className={styles.phoneImg}></div> 
            {/* Just icon:
            margin-top: 32vh;
    margin-left: -3vw;
    border-radius: 50%;
    border: 6px solid #642066;
    background-repeat: no-repeat;
    width: fit-content;
    transition: all 1s;
    cursor: pointer;
    background: #fefefe; */}
            <div className={styles.contactBtnText}>Contact us</div>
            {/*     font-size: 3vw;
    text-transform: uppercase;
    margin-left: 2vw;
    text-shadow: 3px 3px 0px black; */}
        </div>
    </div>
  )
}
