import React from 'react'
import styles from '../../styles/Main.module.css'

export const SEA = () => {
  return (
    <div className={`${styles.smaCont} ${styles.seaCont}`}>
        <div className="">
            <div className={`${styles.seoText1} ${styles.seaText1}`}>
                And what about those annoying adds in Google which come up even before the top results?
            </div>
            <div className={`${styles.well} ${styles.dontworry}`}>Don’t worry!</div>
            <div className={`${styles.notePink} ${styles.seaText2}`}>We can arrange that for you as well!</div>
            <div className={styles.seoText1}>
                Will then people be angry at you for seeing your website as a first result while looking for something else?
            </div>
            <div className={styles.seaText3}>
            <div className={`${styles.noteBlue} ${styles.seaWell}`}> Well… </div>
            <div className={styles.seaSecondText}>
                <div className={`${styles.notePink} ${styles.no}`}>no!</div>
                <div className="">
                    The right promotional strategy will actually show the add to the people who are potentially attracted to your business
                </div>
            </div>
            <div className={`${styles.notePink} ${styles.seaNoteLast}`}>*yes, they just don’t know abot it yet</div>
            <div className={styles.seaLastCont}>
                <div className={`${styles.noteBlue} ${styles.seaLastText}`}>
                    And that’s how our PPC campaigns deliver that exactly positive results you are looking for!
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
