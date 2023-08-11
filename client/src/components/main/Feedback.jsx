import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Main.module.css'
import animStyles from '../../styles/Animation.module.css'
import {observer} from '../../observers.js'

export const Feedback = ({content}) => {

  const titleCont = useRef(null)  
  const title1 = useRef(null)
  const title2 = useRef(null)
  const text1 = useRef(null)
  const text2 = useRef(null)  

  useEffect(() => {

    if (title1.current) observer(`${animStyles.hiddenLeft}`).observe(title1.current);
    if (title2.current) observer(`${animStyles.hiddenLeft}`).observe(title2.current);
    if (text1.current) observer(`${animStyles.hiddenLeft}`).observe(text1.current);
    if (text2.current) observer(`${animStyles.hiddenLeft}`).observe(text2.current);
}, [])
    

  return (
    <div id='fbCont' className={`container ${styles.feedbackCont}`}>
        <div className={styles.feegbackImgCont}>
            <div className={styles.feedbackImgWrap}>
                <div className={styles.feedbackImg}></div>
            </div>
            <div className={styles.feedbackImgWrap}>
                <div className={`${styles.feedbackImg} ${styles.feedbackImg2}`}></div>
            </div>
        </div>
        <div style={{width: '100%'}}>
            <div className={styles.feedbackTitles} ref={titleCont} id='feedback' style={window.innerHeight>window.innerWidth?{height: '0'}:{}}>
                <div className={`${styles.title1} ${styles.titleSmall}`} ref={title1} style={window.innerHeight>window.innerWidth?{fontSize: '3.7rem'}:{}}>
                    {content[0][0]}
                </div>
                {/* font-size: 3rem;
    background: black;
    color: #fefefe;
    margin-left: 0; */}
                <div className={`${styles.title2} ${styles.titleSmall}`} ref={title2} style={window.innerHeight>window.innerWidth?{fontSize: '3.7rem'}:{}}>
                    {content[0][1]}
                </div>
            </div>
            <div className={styles.feedbackTextCont}>
                <div className={styles.feedback} style={window.innerHeight>window.innerWidth?{marginTop: '10%'}:{marginTop: '-12vh'}}>
                    <div className={styles.fbText} ref={text1}>
                    {content[1][0]}
                    </div>
                    <div className={`${styles.noteBlue} ${styles.author1}`}>{
                    content[1][1]}
                    </div>
                </div>
                <div className={`${styles.feedback}`} style={window.innerHeight>window.innerWidth?{marginTop: '15%'}:{alignSelf: 'center'}}>
                    <div className={styles.fbText} ref={text2}>
                    {content[2][0]}
                    </div>
                    <div className={`${styles.notePink} ${styles.author2}`}>
                    {content[2][1]}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
