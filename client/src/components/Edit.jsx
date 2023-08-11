import React, {useState, useRef, useEffect, useContext} from 'react'
import { EditContext } from '../context/EditContext';
import { Main } from './Main'
import { Services } from './Services'
import { About } from './About'
import { HowWeWork } from './HowWeWork'
import { Contact } from './Contact'
import styles from '../styles/Edit.module.css'
import { Header } from './main/Header'
import { Overview } from './main/Overview'
import { Welcoming } from './main/Welcoming'
import { About as MainAbout } from './main/About'
import { Services as MainServices } from './main/Services'
import { Feedback } from './main/Feedback'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContex';import { useHttp } from '../hooks/http.hook'


const home = [
    {page: <Header/>, value: 'Header'},
    {page: <Overview/>, value: 'Warning'},
    {page: <Welcoming/>, value: 'Welcoming'},
    {page: <MainAbout/>, value: 'About'},
    {page: <MainServices/>, value: 'Services'},
    {page: <Feedback/>, value: 'Feedback'}
]

const services = [
    {page: <Header/>, value: 'Marketing Strategy'},
    {page: <Overview/>, value: 'E-Commerce'},
    {page: <Welcoming/>, value: 'Branding'},
    {page: <MainAbout/>, value: 'Search Engine Advertizing'},
    {page: <MainServices/>, value: 'Social Media Advertizing'},
    {page: <Feedback/>, value: 'Web Development'},
    {page: <Feedback/>, value: 'Search Engine Optimization'}
]
const about = [
    {page: <Header/>, value: 'What are we about?'},
    {page: <Overview/>, value: 'Not a regular company'},
    {page: <Welcoming/>, value: 'Founder'},
]
const work = [
    {page: <Header/>, value: 'What`s next?'},
    {page: <Overview/>, value: 'What will we do?'},
    {page: <Welcoming/>, value: 'And then?'},
    {page: <MainAbout/>, value: 'And next?'},
    {page: <MainServices/>, value: 'Why us?'}
]
const contact = []

export const Edit = ({returnActivity,returnGivenPage,returnPage}) => {

  const {loading, request, error, clearError} = useHttp()  
  const container = useRef(null)  
  const auth = useContext(AuthContext)  
  const navigate = useNavigate()
  const [height,setHeight] = useState(window.innerHeight)  
  const [width,setWidth] = useState(window.innerWidth)  
  const [pages,setPages] = useState([])  
  const [components,setComponents] = useState(home) 


  useEffect(() => {

    returnActivity('')

    const getPages = async () => {
      const data = await request('/api/content/', 'GET', null)
      setPages(data.pages)
    }
    getPages()

    if (container.current) {
        setHeight(getCoords(container.current).bottom-getCoords(container.current).top)
        setWidth(getCoords(container.current).right-getCoords(container.current).left);
    }
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

  const handleLogOut = () => {
    navigate('/')
    setTimeout(() => {
      auth.logout()
    },100)
  }

  const handlePageBtnClick = (p) => {
    navigate('/edit-content')
    returnActivity('Edit Content')
    returnPage(p) 
    returnGivenPage(p)
  }

  return (
    <>
    <div className={styles.cont}>
      <div className={styles.editContentCont}>
        <Link to={`/edit-content`} className={styles.btn} onClick={() => returnActivity('Edit Content')}>Edit Content</Link>
        <div className={styles.editContentBtnsCont}>
          {pages.map(p => p.parent=='services' ? '' 
          : <div className={styles.serviceBtn} onClick={() => handlePageBtnClick(p.page)}>{p.page}</div> )}  
        </div>        
      </div> 
        <div className={styles.btnsCont}>
            <Link to={'/articles'} className={styles.btn} onClick={() => returnActivity('Add Article')}>+ Add Article</Link>
            <Link to={'/casestudies'} className={styles.btn} onClick={() => returnActivity('Add Case Study')}>+ Add Case Study</Link> 
            <Link to={'/'} className={styles.btn} onClick={handleLogOut} style={{color: '#dedede'}}>Log Out</Link>
        </div>
    </div>
    </>
  )
}
