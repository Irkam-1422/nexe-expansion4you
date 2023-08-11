import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import styles from '../styles/Articles.module.css'
import { StudyBox } from './casestudies/StudyBox'

export const CaseStudies = () => {

  const {loading, request, error, clearError} = useHttp()
  const [casestudies, setCaseStudies] = useState([])
  
  const getCaseStudies = useCallback(async () => {
    try {
      const fetched = await request(`/api/casestudy`, 'GET', null)
      console.log(fetched)
      setCaseStudies(fetched.casestudies)
    } catch (e) {}

  },[request])

  useEffect( () => {
    getCaseStudies()
  },[getCaseStudies])

  return ( 
    <div className={styles.cont}>
        <h1 className={styles.h1}>Case Studies</h1>
        <div className={styles.casestudies}>
        {casestudies.map((casestudy,i) => <StudyBox casestudy={casestudy}/>)}
        </div>
    </div>
  )
}