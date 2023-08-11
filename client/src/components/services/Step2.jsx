import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Inside.module.css'
import animStyles from '../../styles/Animation.module.css'
import {observer} from '../../observers.js'

export const Step2 = ({step}) => {

  const cont = useRef(null)  

  React.useEffect(() => { 
    console.log(window.innerWidth) 
    if (window.innerWidth < 850) {
        +step.num%2 == 0 ? cont.current.classList.remove(`${animStyles.hiddenRight}`) : cont.current.classList.remove(`${animStyles.hiddenLeft}`)
    } else {
        if (+step.num%2 == 0) {observer(`${animStyles.hiddenRight}`).observe(cont.current)}
        else {observer(`${animStyles.hiddenLeft}`).observe(cont.current)}
    }
  }, [])  

  return (
    <div ref={cont} className={+step.num%2==0 ? `${styles.questCont2} ${animStyles.hiddenRight}` : `${styles.questCont} ${animStyles.hiddenLeft}`}>
        <div className={styles.questHeaderCont}>
            <div className={styles._01} style={step.style ? step.style.num : {}}>
                {step.num}
            </div>
            <div className={styles.titleCont} style={step.style ? step.style.title : {}}>
                {step.title[0]} {step.title[1]} <br />  
                <div className={styles.span}
                     style={step.style ? step.style.span : {}}
                     >{step.title[2]}</div>
            </div>
        </div>
        {step.questions && <div className={styles.questions}>
                {step.questions.map((q,i) => <p style={step.style && step.style.questions ? step.style.questions[i] : {paddingLeft: '32%'}}>- {q}</p>)}
            </div>}
        <img className={styles.img} src={require(`../../assets/${step.title[2].toLowerCase().slice(0,-1).split(' ').join('')}.png`)} 
             style={step.style ? step.style.img : {}}
             alt="" />
    </div>
  )
}
