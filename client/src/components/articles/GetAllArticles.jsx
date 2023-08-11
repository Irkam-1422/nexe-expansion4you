import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { ArticleBoxLight } from './ArticleBoxLight'
import styles from '../../styles/Articles.module.css' 

export const GetAllArticles = () => {
  const {loading, request, error, clearError} = useHttp()
  const [articles, setArticles] = useState([])
  
  const getArticles = useCallback(async () => {
    try {
      const fetched = await request(`/api/article`, 'GET', null)
      console.log(fetched)
      setArticles(fetched.articles)
    } catch (e) {}

  },[request])
 
  useEffect( () => {
    getArticles()
  },[getArticles])

  return ( 
    <div 
    className={styles.lightBoxCont}
    >
       {articles.map(a =>  <ArticleBoxLight article={a}/>)}
    </div>
  )
}
