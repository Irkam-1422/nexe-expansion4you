import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Main.module.css'
import anime from "animejs/lib/anime.es.js"
import { Header } from './main/Header';
import { Overview } from './main/Overview';
import { Welcoming } from './main/Welcoming';
import { Services } from './main/Services';
import { Feedback } from './main/Feedback';
import { Footer } from './Footer';
 
export const Main = ({page}) => {

  const fadeInAnime = useRef(null); 
  const [reverted,setReverted] = useState(false)
  const [feedback,setFeedback] = useState(false)

  // useEffect(() => {
  //     fadeInAnime.current = anime.timeline({
  //       loop: false,
  //       autoplay: true,
  //       easing: "easeInOutQuad",
  //       duration: 1800,
  //     })

  //     fadeInAnime.current.add({
  //       targets: `.title`,
  //       opacity: `100%`
  //     })
  //     fadeInAnime.current.add({
  //       targets: `.text`,
  //       opacity: `100%`,
  //       keyframes: [
  //         {backgroundColor: 'rgba(255, 255, 255, 0)', color: '#FFF'},
  //         {backgroundColor: 'rgba(255, 255, 0, 1)', color: '#000000'},
  //         //{backgroundColor: 'rgba(255, 255, 255, 0)', color: '#FFF'},
  //       ]
  //     })

  // },[])
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  return (
    <div id='Home'>
        <Header content={page.components[0].content} returnReverted={(cond) => setReverted(cond)} returnFeedback={(cond) => setFeedback(cond)}/> 
        <Overview content={page.components[1].content}/>
        <Welcoming content={page.components[2].content} aboutContent={page.components[3].content} reverted={reverted}/>
        <Services content={page.components[4].content}/> 
        <Feedback content={page.components[5].content} feedback={feedback}/>
        <div className="container">
          <Footer/>
        </div>
    </div>
  ) 
}
