import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { Contact } from './Contact'
import { Step2 } from './Step2'

// const questions = [
// 'Your website is basically the digital face of your company. Therefore, your aim is to make a solid fist impression for the ones who see it and provoke their will to work with you. The visual part is not only about photos and videos that you use, it’s also very much about correspondence to your brand style and brand vibe.'
// ]

// const questions2 = [
// 'Have you ever wondered how to make the visitors of your website actually read your content? Here comes the content-writing! and the main goal here is to make it engaging and relatable to your brand voice. Therefore, the proper content on your website will not only be a huge bonus of your digital representation, but also a boost of your customer’s engagement.',
// ]

// const questions3 = [
// 'Good user experience is becoming more and more important for website rankings.',
// 'As if you are able to deliver quality user experiences across platforms and devices, this will not only increase appearance of your website in search engine, but also engage your customers to use it more.',
// 'Mainly, this is something that happens behind the senses but vastly increases the comfort of using your webpage.'
// ]

// const steps = [
//     {num: '01', title: ['Firstly,','let`t talk about','Appearance.'], questions: questions, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '16%'}, 
//       span: {}, 
//       img: {width: '35%',top: '49.5%',left: '1%'}, 
//       questions: [{paddingLeft: '34%'}]}
//     },
//     {num: '02', title: ['Now let1s move to','  ','Content.'], questions: questions2, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '16%'}, 
//       span: {}, 
//       img: {top: '41.5%',left: '-3%',width: '35%'}, 
//       questions: [{paddingLeft: '30%'}]}
//     },

//     {num: '03', title: ['And again ', 'Improve ','User Experience.'], questions: questions3, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '10%'}, 
//       span: {}, 
//       img: {top: '38%',width: '34%',left: '1%'}, 
//       questions: [{paddingLeft: '30%'},{paddingLeft: '30%'},{}]
//     }
//     },
// ]

const stepStyles = [
  {
      num: {}, 
      title: {marginLeft: '16%'}, 
      span: {}, 
      img: {width: '35%',top: '49.5%',left: '1%'}, 
      questions: [{paddingLeft: '34%'}]},
  {
      num: {}, 
      title: {marginLeft: '16%'}, 
      span: {}, 
      img: {top: '41.5%',left: '-3%',width: '35%'}, 
      questions: [{paddingLeft: '30%'}]},
  {
      num: {}, 
      title: {marginLeft: '10%'}, 
      span: {}, 
      img: {top: '38%',width: '34%',left: '1%'}, 
      questions: [{paddingLeft: '30%'},{paddingLeft: '30%'},{}]
    }
]

export const WebDevelopment = ({page}) => {

  const title1 = useRef(null)
  const title2 = useRef(null)
  const [steps,setSteps] = useState([])

  useEffect(() => {

    setSteps(page.components.slice(1,page.components.length-1).map((c,i) => {
        return {
            num: `0${i+1}`,
            title: c.content[0],
            questions: c.content[1],
            style: stepStyles[i]
        }
    }))

    if (title1.current && title2.current) {
            setTimeout(() => {
                title1.current.classList.remove(`${animStyles.hiddenRight}`)
                title2.current.classList.remove(`${animStyles.hiddenRight}`)
            }, 300)
    }
  },[])

  return (
    <>
        <div className={styles.msCont}>
        <h1 className={styles.msTitle}>
        {page.components[0].content[0][0]}
        </h1>
        <div className={styles.msDefinition}>
        “{page.components[0].content[0][1]}”
        </div>
        <div className={styles.msNotesTitle}>
            <div className={`${styles.noteTitle} ${animStyles.hiddenRight}`} ref={title1} style={{transition: 'all 1s'}}>
            {page.components[0].content[0][2]} 
            </div>
            <div className={`${styles.noteTitle} ${animStyles.hiddenRight}`} ref={title2} style={{transition: 'all 1s'}}>
            {page.components[0].content[0][3]}
            </div>
        </div>
        </div>

        <div className={styles.stepsCont}>
            {steps.map(step => <Step2 step={step}/> )} 
        </div>

        <div className={styles.stepsCont}>
            <div className={styles.msCont}>
                <div className={styles.msDefinition}>
                    <div className={styles.textCont}>
                    {page.components[page.components.length-1].content[0][0]} 
                    </div>
                    <div style={{overflow: 'hidden'}}>
                        <div className={styles.title2}>
                        {page.components[page.components.length-1].content[0][1]}
                        </div>
                        <div className={styles.contactTextCont}>
                            <div>
                            {page.components[page.components.length-1].content[0][2]}
                            </div>
                            <hr style={{width: '100%'}}/>
                            <Contact/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}