import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Main.module.css'
import animStyles from '../../styles/Animation.module.css'

import {observer} from '../../observers.js'
export const About = ({reverted,content}) => {

  const title1 = useRef(null)  
  const image = useRef(null)  
  const text1 = useRef(null)  

  const title2 = useRef(null)  
  const text2 = useRef(null) 
  const container = useRef(null)  

  useEffect(() => {
    console.log(reverted)
    let elements1 = [title1.current,image.current,text1.current]
    let elements2 = [title2.current,text2.current]

    if (reverted) {
        if (container) container.current.style.transform = 'none'
        setTimeout(() => {
            elements1.forEach(elm => {
                if (elm) elm.classList.remove(`${animStyles.hiddenLeft}`)
            })
            elements2.forEach(elm => {
                if (elm) elm.classList.remove(`${animStyles.hiddenRight}`)
            })
        }, 1500);
    } else {
        if (container && window.innerHeight < window.innerWidth) container.current.style.transform = 'translateX(103%)'
        elements1.forEach(elm => {
            if (elm && window.innerHeight < window.innerWidth) elm.classList.add(`${animStyles.hiddenLeft}`)
        })
        elements2.forEach(elm => {
            if (elm && window.innerHeight < window.innerWidth) elm.classList.add(`${animStyles.hiddenRight}`)
        })
    }

  },[reverted])

  return (
    <div ref={container} className={`container ${styles.aboutMainCont}`} style={window.innerHeight>window.innerWidth?{transform: 'none'}:{position: 'absolute' ,top: `${window.innerHeight*2}px`}}>
        {/* style={window.innerHeight>window.innerWidth?{height: 'auto'}:{}} */}
        <div className={styles.revert}>
                <div className={styles.aboutCont}>
                    <div className={window.innerHeight>window.innerWidth?styles.title1:`${styles.title1} ${animStyles.hiddenLeft}`} styles={{transform: 'none'}} ref={title1} id='about'>{content[0][0]}</div>
                    <div className={styles.imgCont}>
                        <div className={window.innerHeight>window.innerWidth?styles.imgWrap:`${styles.imgWrap} ${animStyles.hiddenLeft}`} ref={image} style={{transition: 'all 1s'}}>
                            <img className={styles.img} src={require('../../assets/founder.jpg')} alt="founder" />
                        </div>
                        <div className={window.innerHeight>window.innerWidth?styles.aboutText:`${styles.aboutText} ${animStyles.hiddenLeft}`} ref={text1} style={{transition: 'all 1s'}}>
                            <div style={{background: '#fefefe', padding: '4%'}}>
                                "{content[1][0]}
                                <span className={styles.underlineBlue}>
                                {content[1][1]}
                                </span> 
                                {content[1][2]}
                                <span className={styles.underlineBlue}>
                                {content[1][3]}
                                </span>
                                </div>
                            <div style={{background: '#fefefe', padding: '4%'}}>
                            {content[2][0]} 
                                <span className={styles.underlineBlue}>
                                {content[2][1]}
                                </span> 
                                {content[2][2]} 
                                <span className={styles.underlineBlue}>
                                {content[2][3]}
                                </span> 
                                {content[2][4]}"
                                </div>
                            <div className={styles.founder} style={{background: '#fefefe', padding: '4%'}}>
                            {content[3][0]} <br /> 
                            {content[3][1]}
                            </div>
                        </div> 
                    </div>
                </div>
                <div className={window.innerHeight>window.innerWidth?styles.simpleCont:`${styles.simpleCont} ${animStyles.hiddenRight}`} ref={text2} style={{transition: 'all 1s'}}>
                    <div className={window.innerHeight>window.innerWidth?`${styles.title2} ${styles.simpleTitle}`:`${styles.title2} ${styles.simpleTitle} ${animStyles.hiddenRight}`} ref={title2} style={{transition: 'all 1s'}}>
                    {content[4][0]}
                    </div>
                    <div className='{animStyles.hiddenOp}'>
                    <div className="">
                    {content[5][0]}
                        <span className={styles.underlinePink}>
                        {content[5][1]}
                        </span></div>
                        <div className="">
                        {content[5][2]}
                            <span className={styles.underlinePink}>
                            {content[5][3]}
                            </span> <br />
                            {content[5][4]}
                            <span className={styles.underlinePink}>
                            {content[5][5]}
                            </span>
                        </div> 
                    </div>
                </div>
            </div>
    </div>
  )
}
