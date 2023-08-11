import React, {useEffect, useState} from 'react'
import { Service } from './services/Service'
import styles from '../styles/Services.module.css'
import {Footer} from './Footer' 

export const Services = ({page,servicesReturn}) => {

  const [services,setServices] = useState([])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])
  
  useEffect(() => {

    // setServices([
    //   {img: 'SMA.jpg', title: page.components[0].content[1][0]},
    //   {img: 'SMA.jpg', title: page.components[0].content[2][0]}, 
    //   {img: 'SMA.jpg', title: page.components[0].content[3][0]},
    //   {img: 'SMA.jpg', title: page.components[0].content[4][0]},
    //   {img: 'SMA.jpg', title: page.components[0].content[5][0]},
    //   {img: 'SMA.jpg', title: page.components[0].content[6][0]},
    //   {img: 'SMA.jpg', title: page.components[0].content[7][0]}
    // ])

    servicesReturn(page.components[0].content.map(s => s[0]))

    for (let i = 0; i < page.components[0].content.length; i++) {
      const element = page.components[0].content[i][0]
      setServices(prev => prev.concat([{img: 'SMA.jpg', title: element}]))
    }

    const footer = document.getElementById('footer')
    if (footer) footer.style.display = 'flex'
  },[])

  return (
    <div style={{marginTop: '6vh',width:'100%'}}>
      <div className={styles.mainCont}>
        <div className={styles.servicesCont}>
          <h1 className={styles.servicesTitle}>{page.components[0].content[0][0]}</h1>
        </div>
        {services.map((service,i) => <Service service={service}  i={i}/>)}
      </div>
      <div className={`${styles.footerCont} container`} style={{position: 'relative'}}>
        <Footer />
      </div>
    </div>
  )
}
