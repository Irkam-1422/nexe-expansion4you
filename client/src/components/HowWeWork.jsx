import React, {useEffect, useRef,useState} from 'react'
import { Step } from './work/Step'
import styles from '../styles/Work.module.css'
import { Footer } from './Footer'
import { Link } from 'react-router-dom'
 

// const steps = [
//   {
//     title: 'BUT WHAT’S NEXT?',
//     text: [
//       `This is the well-known problem that entrepreneurs face. 
//       You would like to take that next step and introduce your product to as many people as possible, 
//       but how do you find all the `,
//       `time`,
//       ` and `,
//       `knowledge`,
//       ` to do it well? Then you call us!`]
//   },
//   {
//     title: 'SO, WHAT WILL WE DO?',
//     text: [`First, we want to know you better! What is your service and product? 
//     Why do you sell it? Who are you selling it to? What are you unique in? 
//     By doing this we will drive out the answer to a very important question: `,
//     `«What is that special about your offer that differs you from any other company on the market?`,
//     ` And `,
//     `why do people need to choose you?»`]
//   },
//   {
//     title: 'AND THEN?',
//     text: [`Then, we will find out`,
//     `who your target audience are`,
//     `. 
//     How to advertise your product to different groups of people? 
//     How to find`,
//     `the ones who are really interested in it?`,
//     ` Which problems can your product solve for your customers? 
//     Thus, we can create`,
//     `a story that will land with the ideal target group`,
//     `. 
//     The next steps are about `,
//     `analyzing your online environment`,
//     `.
//     We look both internally and externally at the factors that contribute to the `,
//     `growth of your company`,
//     `. 
//     How are you currently found by the people who are already looking for your product? 
//     How do you serve the people online who are already customers and where can we find more of these people? 
//     Is it clear what role online plays in the purchase process?`]
//   },
//   {
//     title: 'AND WHAT’S NEXT?',
//     text: [`We will answer all these questions, 
//     and from there we will make a `,
//     `plan aimed at continuously growing`,
//     ` your company. 
//     From our experience, it will take you `,
//     `less than two years`,
//     ` to observe the `,
//     `real changes`,
//     ` in your business growth and reach your desired goals!`]
//   },
//   {
//     title: 'WHY US?',
//     text: [`We offer `,
//     `unique strategy`,
//     ` for each of our various clients. 
//     We look deeply at their business and try to `,
//     `step in the shoes of their customers`,
//     ` 
//     to really understand what they `,
//     `need`,
//     ` and what they `,
//     `want`,
//     `. We work with different businesses `,
//     `worldwide`,
//     ` 
//     and gain a lot of knowledge about different customer groups. We have a highly `,
//     `skilled team`,
//     ` 
//      that is extremely excited to work with every new business. 
//     So, maybe you are the one we’ve been waiting for! Make a step outside the borders,
//      call us! And we will offer some `,
//      `expansion 4you!`]
//   }
// ]

export const HowWeWork = ({page}) => {

  const cont = useRef(null)
  const other = useRef(null) 
  const [heigh,setHeight] = useState(window.innerHeight*4)
  const [steps,setSteps] = useState([])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  useEffect(() => {

    const stps = page.components.slice(1).map(c => {
      return {title: c.title, text: c.content[0]}
    })
    setSteps(stps)

  // window.addEventListener("scroll", handleScroll);
  //  const footer = document.getElementById('footer')
  //  if (footer) footer.style.display = 'flex'

  //  console.log(getCoords(cont.current).bottom);
  //  if (cont.current) setHeight(getCoords(cont.current).top)
  },[]) 

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
      <div className={styles.header}>
        <video className={styles.video} 
               style={{height: `${window.innerHeight*5}px`}}
               src={require('../assets/water2.mp4')}  
               type="video/mp4"
               muted  
               autoPlay="autoplay"   
               loop="loop" 
               ></video>  
        <div className="">
          <div className={styles.btns}>
            <Link to={`/articles/:${page.article}`} className={styles.btn}>
              {page.article.split('-').map((a,i) => i!==4 ? `${a} ` : <><br />{a} </>)}
              {/* Why do YOU need <br /> digital marketing */}
            </Link>
            <Link to={'/contact'} className={styles.btn}>Contact Us</Link>
            <Link to={'/articles'} className={styles.btn}>Articles</Link>
            <Link to={'/casestudies'} className={styles.btn}>Cases</Link>
          </div>
        </div>
        <h1 className={styles.headerH1}>
          {page.components[0].content[0][0]}
        </h1> 
        <div className={styles.headerText}>
        {page.components[0].content[0][1]}
        <span className={styles.underline}>{page.components[0].content[0][2]}</span>
        {page.components[0].content[0][3]}
          {/* {page.components[0].content[1].text} */}
        {/* As an entrepreneur you only want one thing, <span className={styles.underline}>GROW</span>! 
        You have created a great product or service and everyone 
        who already knows where to find you is very exited.  */}
        </div>
      </div>
      {steps.map((step,i) => <div ref={i==steps.length-1 ? cont : other}><Step step={step} i={i}/></div>)}
      {/* <div className={`${styles.footerCont}`} style={{position: 'relative',  background: 'linear-gradient(45deg, #61dafb, #ca33cf)'}} ref={cont}>
        <Footer />
      </div> */}
    </div>
  )
}
