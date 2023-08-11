import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { Contact } from './Contact'
import { Step2 } from './Step2'

// const questions = [
//     'Your brand story is not only about solid facts and sentimental memories. Is the the possibility to become closer with your customers and share them your mission and values in a special manner. Talking about your ups and downs you let the people get to know you better and become more emotionally connect with your brand.'
// ]
 
// const questions2 = [
//     'The succes of a message delivered  to people is not only based on the meaning, but also very ,uch on the form. Therefore, the voice of your brand is usually based on the language, phares and words you use in communication with your customers.',
//     'It can be friendly, caring, strict or funny, which will change the perception of your brand and put you in the right position in front of your customer.'
// ]

// const questions3 = [
//     'The visual part of your brand is as important as the content part! The brand design is usually the most memorable part of the brand, therefore, you need to make sure to correctly adjust it with your message and product.',
//     ' Wether it’s bright colours with thick lines and screaming text or something indeed light, aerial and soft with elegant cursive fonts? This is time for art that will wake up the emotions inside the ones who see it.'
// ]

// const questions4 = [
//     'This is an essential element of a brand strategy to understand who you are, and what is your position in  the world and on the market. Brand value helps your customers to understand you deeper and you to find the right people to work with. Brand value answers such questions as:',
// 	'Why does your company exist?',
//   'What do you value the most?',
//   'What is your vision of the world and of yourself in it?'
// ]

// const questions5 = [
//     'The vibe is a mixture of every element combined, by mainly it’s about emotions. What do you want people to feel while looking at your website, your product catalog, your social media accounts?',
//     'What atmosphere do you want to be around your brand? It can literally be anything until it triggers any emotions inside people’s hearts!'
// ]

// const steps = [
//     {num: '01', title: ['','','Brand Story '], questions: questions, style: {}, 
//     style: {
//       num: {},title:{},
//       img:{width: '43%',top: '45%'},
//       span:{width: 'max-content',marginLeft: '34%'},
//       questions:[{paddingLeft: '39%'}]}
//     },
//     {num: '02', title: ['','','Brand Voice '], questions: questions2, 
//     style: {
//       num: {},title:{},
//       img:{width: '40%',top: '56%',left: '1%'},
//       span:{width: 'max-content',marginLeft: '34%'},
//       questions:[{paddingLeft: '30%'},{paddingLeft: '41%'}]}
//     },
//     {num: '03', title: ['',' ','Brand Design '], questions: questions3, 
//     style: {
//       num: {},title:{},
//       img:{width: '40%',top: '54%',left: '1%'},
//       span:{width: 'max-content',marginLeft: '34%'},
//       questions:[{},{paddingLeft: '37%'}]}
//     },
//     {num: '04', title: ['','','Brand Value '], questions: questions4, 
//     style: {
//       num: {},title:{},
//       img:{width: '39%',top: '54%',left: '-2.3%'},
//       span:{width: 'max-content',marginLeft: '34%'},
//       questions:[{},{},{},{paddingLeft: '45%'}]}
//     },
//     {num: '05', title: ['','','Brand Vibe '], questions: questions5, 
//     style: {
//       num: {},title:{},
//       img:{width: '36%',left: '-2%',top: '52%',transform: 'rotateY(190deg)'},
//       span:{width: 'max-content',marginLeft: '34%'},
//       questions:[{paddingLeft: '13%'},{paddingLeft: '28%'}]}
//     }
// ]

const stepStyles = [
  {
      num: {},title:{},
      img:{width: '43%',top: '45%'},
      span:{width: 'max-content',marginLeft: '34%'},
      questions:[{paddingLeft: '39%'}]},
  {
      num: {},title:{},
      img:{width: '40%',top: '56%',left: '1%'},
      span:{width: 'max-content',marginLeft: '34%'},
      questions:[{paddingLeft: '30%'},{paddingLeft: '41%'}]},
  {
      num: {},title:{},
      img:{width: '40%',top: '54%',left: '1%'},
      span:{width: 'max-content',marginLeft: '34%'},
      questions:[{},{paddingLeft: '37%'}]},
  {
      num: {},title:{},
      img:{width: '39%',top: '54%',left: '-2.3%'},
      span:{width: 'max-content',marginLeft: '34%'},
      questions:[{},{},{},{paddingLeft: '45%'}]},
  {
      num: {},title:{},
      img:{width: '36%',left: '-2%',top: '52%',transform: 'rotateY(190deg)'},
      span:{width: 'max-content',marginLeft: '34%'},
      questions:[{paddingLeft: '13%'},{paddingLeft: '28%'}]}
]

export const Branding = ({page}) => {

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
          <h1 className={styles.noteTitle} ref={title1} style={{marginLeft: '-57%'}}>
          {page.components[0].content[0][0]}
          </h1>
          <div className={styles.msDefinition} style={{paddingRight: '30vw',paddingLeft: '4vw', textAlign: 'initial'}}>
          “{page.components[0].content[0][1]}”
          </div>
          <h1 className={styles.noteTitle} ref={title1} style={{marginLeft: '63%',color: '#61dafb'}}>
          {page.components[0].content[0][2]}
          </h1>
          <div className={styles.msDefinition} style={{paddingLeft: '30vw',paddingRight: '4vw', textAlign: 'end'}}>
          “{page.components[0].content[0][3]}”
          </div>
        </div>

        <div className={styles.stepsCont}>
            {steps && steps.map(step => <Step2 step={step}/> )} 
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
