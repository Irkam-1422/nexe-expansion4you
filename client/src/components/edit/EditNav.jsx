import React, { useContext } from 'react'
import { useState, useRef, useEffect } from 'react'
import styles from '../../styles/Edit.module.css'
import artStyles from '../../styles/Articles.module.css'
import { Link, useNavigate } from 'react-router-dom'

export const EditNav = ({givenPage, origActivity, returnPage, reload, services, returnClearServices}) => {

    const activities = ['Edit Content', 'Articles', 'CaseStudies']
    const acts = useRef(null)
    const navigate = useNavigate()
    const [activity,setActivity] = useState(origActivity)
    const [page,setPage] = useState('home')

    useEffect(() => {
        console.log('givenPage:',givenPage)
        setPage(givenPage)
        console.log('page:',page)
    },[givenPage])

    useEffect(() => {
        console.log(reload)
        if (reload) {
            setPage('main')
            returnPage('main')
            setTimeout(() => {
                setPage('services')
                returnPage('services')
            }, 100)
        }
    },[reload])

    const handlePageChange = (e) => {
        console.log(page)
        switch (e.target.value) {
            case 'home':
                setPage('main')
                returnPage('main')
                returnClearServices()
                break;
            case 'services':
                setPage('services')
                returnPage('services')
                break;
            case 'about':
                setPage('about')
                returnPage('about')
                returnClearServices()
                break;
            case 'work':
                setPage('work')
                returnPage('work')
                returnClearServices()
                break; 
            case 'contact':
                setPage('contact')
                returnPage('contact')
                returnClearServices()
                break;
            default:
                returnPage(e.target.value)
                break;
        }
    }

    useEffect(() => {
        console.log(origActivity);
        setActivity(origActivity)
    },[origActivity])

  return (
    <div className={styles.header}>
        <h2 className={styles.h2}
        onClick={() => navigate('/edit')}
        >
            {activity && <>
            {'<'}<span style={{position: 'relative', left: '-4%'}}>-</span> 
            <span style={{position: 'relative', left: '-6%'}}>-</span>Back   
            <span style={{position: 'relative', left: '5%', fontWeight: '400'}}>|</span>
            </>}
            <span style={{position: 'relative', left: '10%'}}>
                {activity}
            </span>
        </h2>
        {activity == 'Edit Content' && <select className={styles.select} name="pages" onChange={handlePageChange}>
            <option disabled>Page:</option>
            <option value="home" selected={givenPage=='home'}>Home</option>
            <option value="services" selected={givenPage=='services'}>Services</option>
            <option value="about" selected={givenPage=='about'}>About</option>
            <option value="work" selected={givenPage=='work'}>Work</option>
            <option value="contact" selected={givenPage=='contact'}>Contact</option>
        </select>}
        { activity == 'Edit Content' && page == 'services' && <select className={styles.select} name="services" onChange={handlePageChange} value={page}>
            <option disabled>Service:</option>
            {services.map(s => <option value={s.split(' ').join('').split('-').join('').toLowerCase()}>{s}</option>)}
            {/* <option value="marketingstrategy">Marketing Strategy</option>
            <option value="ecommerce">E-commerce</option>
            <option value="branding">Branding</option>
            <option value="socialmediaadvertising">Social Media Advertising</option>
            <option value="searchengineadvertising">Search Engine Advertising</option>
            <option value="webdevelopment">Web Development</option>
            <option value="searchengineoptimization">Search Engine Optimization</option> */}
        </select> }
    </div> 
  )
}
