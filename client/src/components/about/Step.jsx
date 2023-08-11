import React from 'react'
import styles from '../../styles/About.module.css'

export const Step = ({about}) => {
  return (
    <div className={styles.stepBorder}>
        <div className={styles.stepCont}>
            <h2 className={styles.stepTitle}>{about.title}</h2>
            <div className={styles.stepText}>{about.text}</div>
        </div>
    </div>
  )
}
