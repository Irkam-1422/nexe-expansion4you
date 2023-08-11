import React from 'react'
import styles from '../../styles/Main.module.css'
 
export const SEO = () => {
  return (
    <div className={`${styles.smaCont} ${styles.seoCont}`}>
        <div className={styles.seoTextCont}>
            <div className={styles.seoText1}>
                Have you ever wondered who are those people, <br />
                whose websites are coming up first when you are typing 
            </div>
            <div className={styles.seoVidCont}>
                <video className={styles.seoVideo} src={require('../../assets/SEO.MP4')} muted ></video>
            </div>
            <div className={styles.seoText1}>
                in your google search? 
            </div>
            <div className={styles.well}> 
                Well,<span>well,</span><span>well…</span> 
            </div>
        </div>
        <div className={styles.seoNote}>
            then  <br /> we are about to solve another mystery and <span className={styles.underlineBlue}>make you the one on the top 5</span> results. 
        </div>
        <div className={`${styles.title1} ${styles.titleSmall}`}>But wait,</div>
        <div className={`${styles.title2} ${styles.titleSmall}`}>What if you type “Bike” instead of "Bicycle"?</div>
        <div className={styles.seoText2}>
            Well, that’s another thing to solve with <span className={styles.underlinePink}>Search Engine Optimization,</span> <br />
            So don’t worry you are in good hands!
        </div>

        <div className={styles.seoNote}>*Not only  working with Google,  <br /> the other engines are also included </div>
    </div>
  )
}
