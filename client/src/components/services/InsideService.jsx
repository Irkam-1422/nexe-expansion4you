import React, {useState,useRef,useEffect} from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import { MarketingStrategy } from './MarketingStrategy'
import { ECommerce } from './ECommerce'
import { Branding } from './Branding'
import { SearchEngineAdvertising } from './SearchEngineAdvertising'
import { SocialMediaAdvertising } from './SocialMediaAdvertising'
import { WebDevelopment } from './WebDevelopment'
import { SearchEngineOptimization } from './SearchEngineOptimization'
import { Link } from 'react-router-dom'
import { Page } from '../Page'

export const InsideService = ({closeModal,i}) => {

  const container = useRef(null)
  const cover = useRef(null)

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
    //container.current.style.background = '#fefefe'
    setTimeout(() => {
        closeModal()
    },1000)
  }

  return (
    <div className={styles.insideCont} ref={container} id='container'>
      <div className={styles.coverDiv} ref={cover}></div>
        <div className={styles.back} onClick={handleClick}> 
            {'<'}<div className={styles.backDash}>-</div> Back
        </div>
        {i==0 ? <Page component={<MarketingStrategy/>} name={'marketingstrategy'}/>:
        i==1 ? <Page component={<ECommerce />} name={'ecommerce'}/> : 
        i==2 ? <Page component={<Branding />} name={'branding'}/> :  
        i==3 ? <Page component={<SearchEngineAdvertising />} name={'searchengineadvertising'}/> : 
        i==4 ? <Page component={<SocialMediaAdvertising />} name={'socialmediaadvertising'}/> : 
        i==5 ? <Page component={<WebDevelopment />} name={'webdevelopment'}/> : 
        <Page component={<SearchEngineOptimization />} name={'searchengineoptimisation'}/>}
    </div>
  )
}
