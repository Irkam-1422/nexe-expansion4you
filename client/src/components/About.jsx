import React,{useState,useRef,useEffect} from 'react'
import styles from '../styles/About.module.css'
import animStyles from '../styles/Animation.module.css'
import {observer} from '../observers.js'
import { Step } from './about/Step' 
import { Footer } from './Footer' 
import { ContactImgBtn } from './contact/ContactImgBtn' 
import { Link } from 'react-router-dom'

// const titles = ['WHAT','ARE','WE','ABOUT?']
// const abouts = [
//   {
//     title: 'PERFORMANCE DRIVING',
//     text: '          We help companies to achieve tangible results. Our purpose is to give you that marketing strategy that helps you to show your brand online, breaks through barriers to success and drive results.'
//   },{
//     title: 'TAILOR MADE SOLUTIONS',
//     text: '          There is no “one size fits all” approach and we’ll work to tailor the campaigns that best suit your company based on your goals, in-house capability and budget.'
//   },{
//     title: 'GLOBAL PERSPECTIVE',
//     text: '          Whether you’re doing business in Europe, UK, US, we will help you successfully navigate the global online marketing presence.'
//   },{
//     title: 'CONSTANT LEARNING',
//     text: '          The innovation in technology and its adaptation by businesses have changed the way we communicate and receive information. We are working and learning around the clock to create new strategies to maximise your interaction with customers.'
//   }
// ]

export const About = ({page}) => {

  const [c1,setC1] = useState(0)
  const [c2,setC2] = useState(0)
  const [c3,setC3] = useState(0)
  const [titles,setTitles] = useState([])
  const [abouts,setAbouts] = useState([])
  const [rotated,setRotated] = useState(true)

  const cont1 = useRef(null)
  const cont2 = useRef(null)
  const title0 = useRef(null)
  const title1 = useRef(null)
  const title2 = useRef(null)
  const title3 = useRef(null)
  const container = useRef(null)
  const container2 = useRef(null)
  const founderImg = useRef(null)
  const founderText = useRef(null)
  const h1 = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  useEffect(() => {

    document.body.style.height = '100vh'
    document.body.style.overflowY = 'hidden'

    setTitles(page.components[1].content[0])
    const abts = page.components.slice(2,6).map(c => {
      return {title: c.content[0][0], text: c.content[0][1]}
    })
    setAbouts(abts)

    const footer = document.getElementById('footer')
    footer.style.display = 'flex'
    footer.style.zIndex = '0'    

    if (cont1 && cont2) {
      let timerId = setTimeout(() => {
        cont1.current.style.transform = 'translateX(-100%)'
        cont2.current.style.transform = 'translateX(100%)'
        document.body.style.height = 'auto'
        document.body.style.overflowY = 'scroll'

        const titles = [title0.current,title1.current,title2.current,title3.current]
        titles.forEach(title => {
          if (titles.indexOf(title) == 0) {window.addEventListener("scroll", handleScroll);}
          if (title) {
            setTimeout(() => {
              title.style.backgroundPositionX = 'right'
              title.style.webkitBackgroundClip = 'text'
            }, 500*titles.indexOf(title)) 
          }
        })

      },2300)
    }

    if (founderText.current) observer(`${animStyles.hiddenRight}`).observe(founderText.current) 
    if (founderImg.current) observer(`${animStyles.hiddenLeft}`).observe(founderImg.current) 

  },[])

  useEffect(() => {
    c1 !== +page.components[0].content[1][0] ? setTimeout(setC1, 750/+page.components[0].content[1][0], c1 + 1) : setTimeout(setC1, 2000, 0)
  }, [ c1 ]);

  useEffect(() => {
    c2 !== +page.components[0].content[2][0] ? setTimeout(setC2, 750/+page.components[0].content[2][0], c2 + 1) : setTimeout(setC2, 2000, 0)
  }, [ c2 ]);

  useEffect(() => {
    c3 !== +page.components[0].content[3][0] ? setTimeout(setC3, 750/+page.components[0].content[3][0], c3 + 1) : setTimeout(setC3, 2000, 0)
  }, [ c3 ]); 

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setRotated(false)
    } else {
      setRotated(true)
    }
    if (h1.current) {
      if (window.scrollY > getCoords(container.current).top - 200) {
        h1.current.style.backgroundPositionX = 'right'
      } else {
        h1.current.style.backgroundPositionX = 'left'
      }
    }
    if (container.current && container2.current) {
      const spans = Array.from(document.getElementsByClassName(`${styles.underline}`))
      if (window.scrollY > getCoords(container.current).top - 10) {
        container.current.style.background = '#fefefe'
        container2.current.style.background = '#fefefe'
        spans.forEach(span => {
          setTimeout(() => {
            span.style.backgroundPositionX = 'right'
          }, 500*spans.indexOf(span))
        });
      } else {
        container.current.style.background = '#000'
        container2.current.style.background = '#000'
        spans.forEach(span => span.style.backgroundPositionX = 'left')
      }
    }
  }

  const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }

  return (
    <div> 
      <div className={styles.aboutCont}>
          <div className={styles.aboutFlex1} ref={cont1}>{page.components[0].content[0][0]} <span className={styles.span}>{page.components[0].content[0][1]}</span> {page.components[0].content[0][2]} <hr className={styles.hr}/> </div>
          <div className={styles.aboutFlex2} ref={cont2}>
            <h1 className={styles.thinner}>Let's talk numbers!</h1>
            <div className={styles.numsCont}>
              <div className="">
                <div className={styles.num} style={{width: '14.7vw'}}>{c1}+</div>
                <div className={styles.lable}>{page.components[0].content[1][1]}</div>
              </div>
              <div className="">
                <div className={styles.num} style={{width: '17.5vw'}}>{c2}+</div>
                <div className={styles.lable}>{page.components[0].content[2][1]}</div>
              </div>
              <div className={styles.lastNum}>
                <div className={styles.num} style={{width: '22.4vw' }}>M{c3}+</div>
                <div className={styles.lable}>{page.components[0].content[3][1]}</div>
              </div>
            </div>
          </div>
      </div>
      <div className="">
        <div style={{background: 'black', zIndex: '2', position: 'relative'}}>
          {abouts.map((about,i) => {
            return (
              <div className={`${styles.cont} ${rotated ? styles[`rotateCont${i}`] : styles.transformNone}`} style={{position: 'relative', zIndex: `${i}`,flexDirection: window.innerHeight>window.innerWidth ? 'column' : i%2==0 ? 'row' : 'row-reverse', marginTop: i==0 ? '12%' : ''}}>
                <h1 className={styles.h1} style={window.innerHeight>window.innerWidth?{transform: 'none'}:i%2==0?{}:{transform: 'rotate(90deg)'}} ref={i==0?title0:i==1?title1:i==2?title2:title3}>{titles[i]}</h1> 
                <Step about={about}/>
              </div>
            )
          })}
        </div>
        <div className="container" ref={container} style={{transition: 'all 1s', height: 'auto', zIndex: '2', position: 'relative'}}>
          <h1 className={styles.h1_2} ref={h1} style={{marginTop: '0'}} >{page.components[6].content[0][0]}</h1>
          <div className="">
            <div className={styles.text1}>
            <span className={styles.underline}>{page.components[6].content[1][0]}</span> 
            {page.components[6].content[1][1]}
            </div>
            <div className={styles.text2}>
              <div className="div">
              - {page.components[6].content[2][0]} <span className={styles.underline}>{page.components[6].content[2][1]}</span>;
              </div>
              <div className="div">
              - {page.components[6].content[3][0]} <span className={styles.underline}>{page.components[6].content[3][1]}</span> <br />
              {page.components[6].content[3][2]} <span className={styles.underline}>{page.components[6].content[3][3]}</span> {page.components[6].content[3][4]};
              </div>
              <div className="div">
              - {page.components[6].content[4][0]} <span className={styles.underline}>{page.components[6].content[4][1]}</span> {page.components[6].content[4][2]};
              </div>
            </div>
          </div>
        </div>
        <div className={styles.founderCont} ref={container2} style={{zIndex: '2', position: 'relative'}}>
          <img src={require(`../assets/founder.jpg`)} className={`${styles.founder} ${animStyles.hiddenLeft}`} ref={founderImg}/>
          <div className={`${styles.foundertextBorder} ${animStyles.hiddenRight}`} ref={founderText}> 
            <div className={styles.founderText}>
              " {page.components[7].content[0][0]} " 
            </div>
          </div>
          <div className={styles.btnsCont}>
            <div className={styles.btns}>
            <Link to={'/articles/:Why-do-YOU-need-Digital-Marketing'} className={styles.btn}>Why do YOU need <br /> digital marketing</Link>
            <Link to={'/contact'} className={styles.btn}>Contact Us</Link>
            <Link to={'/articles'} className={styles.btn}>Articles</Link>
            <Link to={'/casestudies'} className={styles.btn}>Cases</Link>
            </div>
          </div>
        </div>
        <div className="container" style={{background: 'linear-gradient(45deg, #de30e4, #3cfaff'}}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
