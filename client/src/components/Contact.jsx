import React, {useRef,useEffect} from 'react'
import styles from '../styles/Contact.module.css'
import emailjs from 'emailjs-com'
import { Footer } from './Footer'

export const Contact = ({page}) => {

  const cover = useRef(null)
  const submit = useRef(null)

  useEffect(() => {
   // document.getElementById('footer').style.display = 'flex'

    let timerId = setTimeout(() => {
      if (cover.current) cover.current.style.transform = 'translateX(51.3%)'
      timerId = setTimeout(() => {
        if (cover.current) cover.current.style.transform = 'translateX(100%)'
      }, 1200)
    }, 200)
  },[])

  const sendEmail = (e) => {
    e.preventDefault() 

    // emailjs.sendForm('test', 'template_cjx31w9', 
    // e.target, 'cNS0RvHP3DClgf7RI')
    // .then((result) => {
    //       console.log(result.text);
    //       alert('Your message was successfully send!')
    //   }, 
    //    (error) => {
    //       console.log(error.text);
    //    });
  }

  const handleClick = (e) => {
    e.target.style.transform = 'scale(.98)'
    setTimeout(() => {
      e.target.style.transform = 'scale(1)'
    }, 500)
  }

  return (
    <>
    <div className={styles.pageCont}>
      <div className={styles.imgCont}>
        <div className={styles.imgText}>
          {page.components[0].content[0][0]}
          <br />  
          <br />
          <div className={styles.infoText}>
            <div className={styles.mailImg}></div>
            {page.components[0].content[1][0]} <br />
            <div className={`${styles.mailImg} ${styles._img2}`}></div>
            {page.components[0].content[1][1]} <br />
            <div className={`${styles.mailImg} ${styles._img3}`}></div>
            {page.components[0].content[1][2]}
          </div>
        </div>
      </div>
      <div className={styles.formCont}>
        <div className={styles.cover} ref={cover}></div>
        <h1 className={styles.h1}>Let's get in touch!</h1>
        <hr className={styles.hr}/>
        <form className={styles.form} 
              onSubmit={sendEmail}
              >
          <input className={styles.input} 
                 type="text" 
                 placeholder='name'
                 />
          <input className={styles.input} 
                 type="text" 
                 placeholder='email'
                 />
          <input className={styles.input} 
                 type="text" 
                 placeholder='subject'
                 />
          <hr className={`${styles.hr} ${styles.hr2}`}/>
          <textarea className={styles.input} 
                    name="message" 
                    cols="30" 
                    rows="4" 
                    placeholder='Your message'
                    ></textarea>
          <div className={styles.submit}>
          <input type="submit" 
                 value="Send Email" 
                 className={`${styles.input} ${styles.submitInp}`}
                 ref={submit}
                 onClick={handleClick} />
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
