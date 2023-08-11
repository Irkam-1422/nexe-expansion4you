import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Articles.module.css'

export const StudyBox = ({casestudy}) => {
  return (
      <Link to={`/casestudies/:${casestudy._id}`} 
            className={styles.borderCont} 
            style={{width: '40%', margin: '2%'}}
            >
            <div className={styles.articleCont} > 
                <div className={styles.textCont} style={{textAlign: 'center'}}>
                    <h2 style={{fontWeight: '300'}}>{casestudy.titleSmall}</h2>
                    <hr />
                    <h1 className={`${styles.title} ${styles.gradienText}`}>{casestudy.titleBig}</h1>
                </div>  
            </div> 
      </Link>
  )
}
