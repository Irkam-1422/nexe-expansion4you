import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'

export const Step = ({step}) => {

  const [question,setQuestion] = useState(step.questions[0])
  const questCont = useRef(null)
 
  useEffect(() => {
    let i = 0
        let timerId = setInterval(() => {
            if (questCont.current) {
                questCont.current.style.color = 'transparent';
                setTimeout(() => {
                    setQuestion(step.questions[i])
                    i < 4 ? i++ : i=0 
                    setTimeout(() => {
                        if (questCont.current) questCont.current.style.color = '#fefefe';
                    }, 700) 
                }, 700)
            } else {
                clearInterval(timerId)
            }
        }, 3500); 
  },[])

  return (
        <div className={styles.smFirstStep} 
             style={step.num == '02' || step.num == '04' ? {flexDirection: 'row-reverse', position: 'relative'} : {}}>
            <div className={styles._01}>{step.num}</div>
            <div className={styles.stepTitle} 
                 style={step.num == '02' ? {transform: 'scaleX(1.3)', margin: '3vw'} :
                 step.num == '03' || step.num == '04' ? {fontSize: '2.7vw'} : {}}>
                {step.title[0]} <br />     
                {step.title[1]} <br />  
                <span className={`${styles.span} ${styles[`span_${step.num}`]}`} 
                      >
                        {step.title[2]}
                </span>
            </div>
            <div className={styles.questionMarks} 
                 style={step.num == '02' || step.num == '04' ? {borderRight: '1px solid #fefefe', borderLeft: 'none', marginLeft: 0, marginRight: '2vw'} : {}}>
                <div className={styles.qqq0}>?</div>
                <div className={styles.qqq1}>?</div>
                <div className={styles.qqq2}>?</div> 
                <div className={styles.qqq3}>?</div>
                <div className={styles.qqq4}>?</div>
            </div>
            <div className={step.num == '02' || step.num == '04' ? 
            `${styles.questionCont}  ${styles.questionContLeft}` : `${styles.questionCont}`}
            style={step.num == '03' ? {marginLeft: '4vw'} 
            : step.num == '04' ? {marginLeft: '6vw'} : {}}>
                <div className={styles.question} 
                     style={{transition: 'all 1s'}} ref={questCont}>{question}</div>
            </div>
        </div>
  )
}
