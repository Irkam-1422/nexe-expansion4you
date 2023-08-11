import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Main.module.css'
import animStyles from '../../styles/Animation.module.css'
import { SEA } from './SEA'
import { SEO } from './SEO'
import { SMA } from './SMA'
import {observer} from '../../observers.js'
import { useNavigate } from 'react-router-dom'

export const Services = ({content}) => {

  const fbCont = document.getElementById('fbCont')
  const title = useRef(null)
  const sma = useRef(null)
  const seo = useRef(null)
  const sea = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (title.current) observer(`${animStyles.hiddenLeft}`).observe(title.current)
    if (sma.current) observer(`${animStyles.hiddenLeft}`).observe(sma.current)
    if (seo.current) observer(`${animStyles.hiddenRight}`).observe(seo.current)
    if (sea.current) observer(`${animStyles.hiddenRight}`).observe(sea.current)
  },[])

  return (
    <div className={`${styles.servicesCont} container`} id='services' style={{height: 'auto'}}>
      <div className="">
        <div className={`${styles.title1} ${styles.titleServices}`} ref={title} >
          {content[0][0]}
        </div>
      </div>
      <div className={styles.services}>
        <div className={styles.servicewrapWrap} ref={sma} style={{transition: 'all 1s', alignitems: 'baseline'}}> 
        <div className={styles.serviceWrap}  onClick={() => navigate('/socialmediaadvertising')}>
          <img className={styles.imgService} src={require('../../assets/SMA.jpg')} alt="" />
        </div>
          <div className={`${styles.servicesText}`} style={{textAlign: 'initial'}}>
          {content[1][0]}
          </div>
        </div> 
        <div className={styles.middleDiv} ref={seo} style={{transition: 'all 1s'}}>
          <div className={`${styles.serviceWrap} ${styles.seoWrap}`} onClick={() => navigate('/searchengineoptimization')}>
            <img className={styles.imgService} src={require('../../assets/SEO.jpg')} alt="" />
          </div>
          <div className={`${styles.servicesText} {styles.seoText}`}>
          {content[1][1]}
          </div>
        </div>
        <div className={styles.servicewrapWrap} ref={sea} style={{transition: 'all 1s'}}>
          <div className={styles.serviceWrap} onClick={() => navigate('/searchengineadvertising')}> 
            <img className={styles.imgService} src={require('../../assets/SEA.jpg')} alt="" />
          </div>
          <div className={`${styles.servicesText} {styles.sea}`}>
          {content[1][2]}
          </div>
        </div> 
      </div>
    </div>
  )
}
