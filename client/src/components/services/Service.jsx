import React from 'react'
import styles from '../../styles/Services.module.css'
import animStyles from '../../styles/Animation.module.css'
import {observer} from '../../observers.js'
import { InsideService } from './InsideService'
import { useNavigate } from 'react-router-dom'
 
export const Service = ({service,i}) => {

  const srvc = React.useRef(null)  
  const navigate = useNavigate()
  const [open,setOpen] = React.useState(false)

  React.useEffect(() => {
    if (i%2 == 0) {observer(`${animStyles.hiddenRight}`).observe(srvc.current)}
    else {observer(`${animStyles.hiddenLeft}`).observe(srvc.current)}
  }, []) 

  const handleClick = (title) => {
    //setOpen(true)
    navigate(`/${title.split(' ').join('').split('-').join('').toLowerCase()}`)
  } 
  return (
    <>
    {open && <InsideService closeModal={() => setOpen(false)} i={i}/>}
    <div className={i%2 == 0 ? styles.serviceCont_2 : styles.serviceCont_1} >
        <div
             style={{transition: 'all 1s'}}
             >
            <div className={`${styles.serviceWrap} ${styles[`bbb${i%2==0 ? '2' : '1'}`]} ${animStyles[i%2==0 ? 'hiddenRight' : 'hiddenLeft']}`}  
                 ref={srvc}
                 onClick={() => handleClick(service.title)}
                >
                <img className={styles.imgService} 
                     src={require(`../../assets/service${i+1}.png`)} 
                     alt="" 
                     />
                <div className={i%2 == 0 ? `${styles.servicesText_2} ${styles[`aaa${i}`]}` : `${styles.servicesText_1} ${styles[`aaa${i}`]}`} id={`srvc${i}`}>
                    {/* position: absolute;
    top: 10%; */}
                    {service.title}
                </div>
            </div> 
        </div>
    </div>
    </>
  )
}
