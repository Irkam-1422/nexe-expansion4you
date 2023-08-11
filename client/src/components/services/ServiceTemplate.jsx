import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { Contact } from './Contact'
import { Step2 } from './Step2'
import { useNavigate } from 'react-router-dom'

const stepStyles = [
    {},
    {num: {marginLeft: '4%'}, title: {marginLeft: '17%'}, 
    span: {padding: '2%',transform: 'scaleX(1.1)'}, img: {top: '40%',width: '35%',left: '0'}},
    {num: {marginLeft: '3%'}, title: {marginLeft: '10%', width: 'max-content'}, 
    span: {padding: '2%'}, img: {top: '58.5%',width: '35%'}},
    {num: {marginLeft: '3%'}, title: {marginLeft: '18%'}, 
    span: {padding: '2%', fontSize: '2.3rem', width: 'max-content'}, img: {width: '40%'}}
]

export const ServiceTemplate = ({page}) => {

  const title1 = useRef(null)
  const title2 = useRef(null)
  const container = useRef(null)
  const cover = useRef(null)
  const navigate = useNavigate()
  const [steps,setSteps] = useState([])

  useEffect(() => {
    if (cover.current) {
        setTimeout(() => {
          cover.current.style.opacity = '0'
          cover.current.style.zIndex = '-1'
            //container.current.style.background = 'linear-gradient(45deg, #ca33cf, #61dafb)'
            // container.current.style.background = '#ca33cf'
        }, 100)
    }
  },[])

  const handleClick = () => {
    cover.current.style.opacity = '1'
    cover.current.style.zIndex = '1'
    setTimeout(() => {
       navigate('/services')
    },1000)
  }

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
    <div className={styles.insideCont} ref={container} id='container'>
      <div className={styles.coverDiv} ref={cover}></div>
        <div className={styles.back} 
             onClick={handleClick}
             > 
            {'<'}<div className={styles.backDash}>-</div> All Services
        </div>
        {page.page == 'branding' ? 
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
        :
            <div className={styles.msCont}>
                <h1 className={styles.msTitle}>
                {page.components[0].content[0][0]}
                </h1>
                <div className={styles.msDefinition}>
                “{page.components[0].content[0][1]}”
                <br />  
                    <div className={styles.msDefinitionAuthor}>
                    {page.page == 'marketingstrategy' && page.components[0].content[0][2]}
                    </div>
                </div>
                <div className={styles.msNotesTitle}>
                    <div className={`${styles.noteTitle} ${animStyles.hiddenRight}`} ref={title1} style={{transition: 'all 1s'}}>
                    {page.page == 'marketingstrategy' ? page.components[0].content[0][3] : page.components[0].content[0][2]}
                    </div>
                    <div className={`${styles.noteTitle} ${animStyles.hiddenRight}`} ref={title2} style={{transition: 'all 1s'}}>
                    {page.page == 'marketingstrategy' ? page.components[0].content[0][4] : page.components[0].content[0][3]}
                    </div>
                </div>
            </div>}

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
    </div>
  )
}