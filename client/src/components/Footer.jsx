import React, {useCallback,useEffect} from 'react'
import styles from '../styles/Footer.module.css'
import emailjs from 'emailjs-com'
import { Link } from 'react-router-dom'
import { useHttp } from "../hooks/http.hook"
import { useState } from 'react'

export const Footer = () => {

    const {loading, request, error, clearError} = useHttp()
    const [page,setPage] = useState(null)

    const getPage = useCallback(async () => {
        try {
            const fetched = await request(`/api/content/:footer`, 'GET', null)
            setPage(fetched.page)
        } catch (e) {}
    },[request])  

    useEffect(() => {
        getPage()  
    }, [getPage])

    

  const sendEmail = (e) => {
    e.preventDefault() 

    emailjs.sendForm('test', 'template_cjx31w9', 
    e.target, 'cNS0RvHP3DClgf7RI')
    .then((result) => {
          console.log(result.text);
          alert('Your message was successfully send!')
      }, 
       (error) => {
          console.log(error.text);
       });
  }

  const handleMouseEnter = (e) => {
    console.log(e.target.innerHTML)
    // const text = e.target.innerHTML.slice(2)
    // e.target.innerHTML = `> ${text}`
  }
  const handleMouseLeave = (e) => {
    console.log(e.target.innerHTML)
    // const text = e.target.innerHTML.slice(4) 
    // e.target.innerHTML = `- ${text}`
  }

  return (
    <div className={styles.footerCont} id='footer'>
        {page && <>
        <div className={styles.textAndLogo}>  
            <div className={styles.logo}></div>
            {/*     width: 44%; */}
            <div className={styles.text}>
                {/*     width: 64%; */}
            {page.components[0].content[0][0]}
            {/* We talented digitalmarketeers who are passionate about delivering exceptional highly customised results to our clients across the globe through innovative approaches.  */}
            <br /><br />
            {page.components[0].content[0][1]}
            {/* We firmly believe that there is a better way to do this things – DIGITAL! */}
            </div>
        </div>
        <div className={styles.linksAndContact}>
        <div className={`${styles.cont} ${styles.links}`}>
            <h1 className={styles.h1}>
            {page.components[1].content[0][0]}
            {/* Quick Links */}
            </h1>
            <Link to='/'>
                <div className={styles.navbtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {page.components[1].content[1][0]}
                    {/* - Home */}
                </div>
            </Link>
            <Link to='/services'>
                <div className={styles.navbtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {page.components[1].content[1][1]}
                    {/* - Services */}
                </div>
            </Link>
            <Link to='/about'>
                <div className={styles.navbtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {page.components[1].content[1][2]}
                    {/* - About */}
                </div>
            </Link>
            <Link to='/work'>
                <div className={styles.navbtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {page.components[1].content[1][3]}
                    {/* - Work */}
                </div>
            </Link>
            <Link to='/contact'>
                <div className={styles.navbtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {page.components[1].content[1][4]}
                    {/* - Contact */}
                </div>
            </Link>
        </div>
        <div className={`${styles.cont} ${styles.contacts}`}>
            <h1 className={styles.h1}>
            {page.components[2].content[0][0]}
            {/* Connect */}
            </h1>
            <div className="">
            {page.components[2].content[1][0]}
            {/* +31638471411 */}
            </div>
            <div className="">
            {page.components[2].content[1][1]}
            {/* info@expansion4you.nl */}
            </div>
            <div className={styles.imgs}>
                <div className={styles.linkedIn}></div>
                <div className={styles.twitter}></div>
                <div className={styles.facebook}></div>
            </div>
        </div>
        </div>
        <form onSubmit={sendEmail} className={`${styles.cont} ${styles.form}`}>
            <h1 className={styles.h1}>Drop Us an Email!</h1>
            <input className={styles.input} type="text" name='from_name'  placeholder='Name'/>
            <input className={styles.input}  type="text" name='from_email'  placeholder='Email'/>
            <hr />
            <textarea className={styles.input}  placeholder="Your message" name="message" id="" cols="30" rows="2"></textarea>
            <input className={styles.submit}  type="submit" value="Send" />
        </form>
        </>}
    </div>
  )
}
