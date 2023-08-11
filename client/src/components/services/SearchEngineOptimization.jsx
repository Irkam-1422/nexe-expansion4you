import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { Contact } from './Contact'
import { Step2 } from './Step2'

// const questions = [
// 'To know your target market well, you need to be able to clearly define their problem.',
// 'But do you know how do they usually type it in their search engine?',
// 'What keywords do they use to find the solution?',
// 'And how can you play around with your keywords to match their search and increase your ranking?'
// ]

// const questions2 = [
// 'Remember in google search the users will only see a few lines on content!',
// 'How will your content answer the questions that customers have?',
// 'Will it provide them with any insights or solutions they can use?',
// 'How will you grab the attention of your target market?',
// 'Or integrate your keywords in your content?',
// ]

// const questions3 = [
// 'Have you heard that google tries to boost the websites with better user experience more?',
// 'How will you make your website more comfortable and intuitive for its users?',
// 'Is it comfortable to use your website on a phone and does it maybe need to have several language options?',
// ]

// const steps = [
//     {num: '01', title: ['First of all,','Know Your.','Keywords.'], questions: questions, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '16%'}, 
//       span: {}, 
//       img: {top: '42.5%',left: '0%',width: '43%'}, 
//       questions: [{},{paddingLeft: '30%'},{paddingLeft: '42%'},{paddingLeft: '34%'}]
//     }
//     },
//     {num: '02', title: ['Write High Quality','  ','Content.'], questions: questions2, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '16%'}, 
//       span: {}, 
//       img: {top: '0%',left: '0%',width: '35%'}, 
//       questions: [{},{paddingLeft: '20%'},{paddingLeft: '20%'},{paddingLeft: '25%'},{}]
//     }
//     },

//     {num: '03', title: ['And finally ', 'Improve ','User Experience.'], questions: questions3, 
//     style: {
//       num: {}, 
//       title: {marginLeft: '10%'}, 
//       span: {width: 'max-content',fontSize: '2.5rem',padding: '2%'}, 
//       img: {top: '48%',left: '0%',width: '37%'}, 
//       questions: [{},{paddingLeft: '20%'},{paddingLeft: '25%'}]
//     }
//     },
// ]

const stepStyles = [
  {
      num: {}, 
      title: {marginLeft: '16%'}, 
      span: {}, 
      img: {top: '42.5%',left: '0%',width: '43%'}, 
      questions: [{},{paddingLeft: '30%'},{paddingLeft: '42%'},{paddingLeft: '34%'}]
    },
  {
      num: {}, 
      title: {marginLeft: '16%'}, 
      span: {}, 
      img: {top: '0%',left: '0%',width: '35%'}, 
      questions: [{},{paddingLeft: '20%'},{paddingLeft: '20%'},{paddingLeft: '25%'},{}]
    },
  {
      num: {}, 
      title: {marginLeft: '10%'}, 
      span: {width: 'max-content',fontSize: '2.5rem',padding: '2%'}, 
      img: {top: '48%',left: '0%',width: '37%'}, 
      questions: [{},{paddingLeft: '20%'},{paddingLeft: '25%'}]
    }
]

export const SearchEngineOptimization = ({page}) => {

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
