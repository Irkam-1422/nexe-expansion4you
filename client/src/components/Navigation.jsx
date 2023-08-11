import React, { useState, useRef, useEffect }  from 'react'
import styles from '../styles/Navigation.module.css'
import anime from "animejs/lib/anime.es.js"
import { Link } from 'react-router-dom'

const links = ['/','/services','/about','/work','/contact']
const btns = ['Who Are We?','What Do We Offer?','Wana Know More About Us?','How Do We Work?','Want To Contact Us?']
 
const home = []
const services = []
const about = []
const work = []
const contact = []

export const Navigation = () => {

  const menu = useRef(null) 
  const [open,setOpen] = useState([])
  const [page,setPage] = useState(null)

  useEffect(() => {
    const location = window.location.href.split('/')
    location[location.length-1] == 'services' ?  setPage(1) :
    location[location.length-1] == 'about' ?  setPage(2) :
    location[location.length-1] == 'work' ?  setPage(3) :
    location[location.length-1] == 'contact' ?  setPage(4) :
    setPage(0)

    //const data = 
  }, [])

  const handleHover = (e) => {
    console.log(open)
    if (e.target.id == 0) {
      setOpen(home)
    } else if (e.target.id == 1) {
      setOpen(services)
    } else if (e.target.id == 2) {
      setOpen(about)
    } else if (e.target.id == 3) {
      setOpen(work)
    } else if (e.target.id == 4) {
      setOpen(contact)
    } 
  }

  const handleClick = (i) => {
    setPage(i)
    if (window.innerHeight>window.innerWidth) {
      menu.current.style.transform = 'translateY(-95%)'
    }
  }

  const handleCloseMenu = (e) => {
    if (menu.current) {
      menu.current.style.transform = 'translateY(-95%)'
      e.target.style.background = 'transparent'
    }
  }

  const handleOpenMenu = (e) => {
    if (menu.current) {
      console.log('opening');
      menu.current.style.transform = 'none'
      e.target.style.background = 'transparent'
    }
  }

  return (
    <div 
    className={styles.navCont}
    onMouseLeave={() => setOpen([])}
    >
      <div className={`${styles.menu} buttons`} ref={menu}> 
          {window.innerHeight>window.innerWidth && <div className={`${styles.navBtn} ${styles.x}`} onClick={handleCloseMenu}>x</div> }
          {window.innerHeight>window.innerWidth && <div className={`${styles.navBtn} ${styles._}`} onClick={handleOpenMenu}>- <br />- <br />- <br /></div> }
          {btns.map((btn,i) => <Link to={`${links[i]}`}><div key={i} 
                                    id={i} 
                                    className={page == i ? `${styles.navBtn} _${i} ${styles.hover}` : `${styles.navBtn} _${i}`}
                                    onMouseEnter={handleHover} 
                                    onClick={handleClick} 
                                    >{btn}</div></Link>)} 
      </div>
    </div>
  )
}
