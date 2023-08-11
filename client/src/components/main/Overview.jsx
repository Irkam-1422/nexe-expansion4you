import React, {useState, useRef, useEffect} from 'react'
import styles from '../../styles/Main.module.css'
import animStyles from '../../styles/Animation.module.css'
import {observer} from '../../observers.js'

export const Overview = ({content}) => {

  const title1 = useRef(null)
  const title2 = useRef(null)
  const text = useRef(null)
  const stop = useRef(null)
  const remark = useRef(null)

  useEffect(() => {
    let elements = [title1.current,title2.current]
    let elements2 = [text.current,stop.current]
    for (let elm of elements) {
      if (elm) observer(`${animStyles.hiddenLeft}`).observe(elm);
    }
    for (let elm of elements2) {
      if (elm) observer(`${animStyles.hiddenOp}`).observe(elm);
    }
    if (remark.current) observer(`${animStyles.hiddenRight}`).observe(remark.current);
})



  return (
    <div className={`${styles.overviewCont} container`}>
        <div className={`${styles.title1} ${animStyles.hiddenLeft}`} ref={title1}>
          {/*     font-size: 5rem; */}
          {content[0][0]}
        </div>
        <div  id='overview' className={`${window.innerHeight>window.innerWidth?'':styles.title2} ${animStyles.hiddenLeft}`} ref={title2}>
          {window.innerHeight>window.innerWidth?
          <>
            <div className={styles.title2}>{content[1][0]}</div> 
            {/* font-size: 5rem;
    margin-top: 2rem; */}
            <div className={styles.title2} style={{marginLeft: '20rem'}}>{content[1][1]}</div>
          </>
          :`${content[1][0]} ${content[1][1]}`}
        </div>
        <div className={`${styles.textCont} ${animStyles.hiddenOp}`} ref={text}>
          {content[2][0]}
            {/* <span>Beware, boosting your digital marketing strategy can <span className={styles.span}>attract new customers significantly</span>.</span> <br />
            <span>This can cause <span className={styles.span}>severe growth</span> of your <span className={styles.span}>revenue</span> and <span className={styles.span}>customer loyality</span>. </span><br />
            <span>All the content we are showing here is based on <span className={styles.span}>real life cases</span>, </span><br />
            <span>and may cause the addiction to admiring the digital marketing, </span><br />
            <span>and the will to <span className={styles.span}>change your business for the best</span>.</span><br /> */}
        </div>
        <div  className={styles.stopCont}>
            <div className={`${styles.stop} ${animStyles.hiddenOp}`} ref={stop}>
              {content[3][0]}
            </div>
            <span  className={`${styles.remark} ${animStyles.hiddenRight}`} ref={remark}>{content[4][0]}</span>
        </div>
    </div>
  )
}
