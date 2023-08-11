import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { Contact } from './Contact'
import { Step2 } from './Step2'

const questions = [
  'Increasing brand awarenes',
  'Generate leads and sales',
  'Grow your brand’s audience',
  'Boost community engagement',
  'Drive traffic to your site',
  'Expand your team',
]

const questions2 = [
  'As different segments of your audience usually use different social media platforms, and different platforms tend to attract different audiences, we need to define what is best for you!',
  'Does your main audience use meta platforms like Facebook or Instagram?',
  'Or maybe LinkedIn or Twitter?',
]

const questions3 = [
'Have you thought about your  what to post?',
'Or which words to use to better present your product?',
'What about  content themes, stories and time-sensitive posts?',
'How are you gonna show the human-side of your brand?',
'Is it better to use photos or videos in your campaigns?',
'Or maybe just plain text?'
]

const steps = [
    {num: '01', title: ['First of all,','we need to clearly set your ','business goal.'], questions: questions, 
    style: {
      num: {}, 
      title: {marginLeft: '0%'}, 
      span: {width: 'max-content',fontSize: '2.2rem'}, 
      img: {width: '40%', top: '51.5%'},
      questions: {}
    }
    },
    {num: '02', title: ['Then we it’s',' time to define your ','audience & platforms.'], questions: questions2, 
    style: {
      num: {}, title: {}, 
      span: {padding: '2%'}, 
      img: {width: '35%',left: '1%'}, 
      questions: [{paddingLeft: '20%'},{paddingLeft: '25%'},{}]
    }
    },

    {num: '03', title: ['And now ', 'create engaging ','social content.'], questions: questions3, 
    style: {
      num: {}, 
      title: {marginLeft: '10%'}, 
      span: {padding: '2% 6%' },
      img: { width: '37%',top: '51%'}, 
      questions: [{},{},{paddingLeft: '30%'},{paddingLeft: '36%'},{paddingLeft: '43%'},{}]
    }
    },
]

const stepStyles = [
  {
      num: {}, 
      title: {marginLeft: '0%'}, 
      span: {width: 'max-content',fontSize: '2.2rem'}, 
      img: {width: '40%', top: '51.5%'},
      questions: {}
    },
  {
      num: {}, title: {}, 
      span: {padding: '2%'}, 
      img: {width: '35%',left: '1%'}, 
      questions: [{paddingLeft: '20%'},{paddingLeft: '25%'},{}]
    },
  {
      num: {}, 
      title: {marginLeft: '10%'}, 
      span: {padding: '2% 6%' },
      img: { width: '37%',top: '51%'}, 
      questions: [{},{},{paddingLeft: '30%'},{paddingLeft: '36%'},{paddingLeft: '43%'},{}]
    }
]

export const SocialMediaAdvertising = ({page}) => { 

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
                        <div className={styles.title2} style={{marginLeft: '21vw'}}>
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
