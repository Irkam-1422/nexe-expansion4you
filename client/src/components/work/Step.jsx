import React from 'react'
import styles from '../../styles/Work.module.css'
import animStyles from '../../styles/Animation.module.css'
import {observer} from '../../observers.js'
import { useEffect, useRef } from 'react'

export const Step = ({step,i}) => {

  const cover = useRef(null)
  const container = useRef(null)

  // useEffect(() => {
  //   console.log(window.scrollY);
  //   // if (cover.current) { 
  //   //   if (i==0 || i==1) {
  //   //     console.log(0,1);
  //   //     cover.current.style.transform = 'translateX(100%)'
  //   //   } else if (i==3 && window.scrollY == window.innerHeight - 100) {
  //   //     console.log(3);
  //   //     cover.current.style.transform = 'translateX(100%)'
  //   //   }
  //   // } 
  // },[window.scrollY]) 

  useEffect(() => {
    if (container.current) { 
      observer(`${i%2==0 ? animStyles.hiddenOp : animStyles.hiddenOp}`).observe(container.current)
      //observer2(`${animStyles.test}`).observe(cover.current)
    } 
  },[])  

  return (
    <div className={`${styles.stepCont} ${i%2==0 ? animStyles.hiddenOp : animStyles.hiddenOp}`} style={i%2==0 ? {} : {flexDirection: 'row-reverse'}} ref={container}>
        <div className={styles.img} style={i%2==0 ? {marginRight: '6%'} : {marginLeft: '6%'}}>
          <div className={styles.imgImg} style={{backgroundImage: `url(${require(`../../assets/work${i+5}.png`)})`}}></div> 
        </div> 
        <div className={styles.info}> 
            <h1 className={styles.h1} style={i%2==0 ? {} : {textAlign: 'initial'}}>{step.title}</h1>
            <div className={styles.text} style={i%2==0 ? {} : {textAlign: 'initial'}}> 
              {step.text.map((text,i) => <span className={i%2==0 ? '' : styles.underline}> {text.trim()} </span>)} 
              {/* style={i%2==0 ? {left: '-100%'} : {left: '100%'}} */}
            </div>
        </div> 

        {/* <div ref={cover} className={i%2==0 ? `${styles.cover}` : `${styles.cover}`}></div> */}
    </div>
  )
}
