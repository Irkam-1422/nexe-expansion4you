import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from "../../hooks/http.hook"
import styles from '../../styles/Articles.module.css'
import { GetAllArticles } from './GetAllArticles'

export const ArticleInside = () => {

  const {loading, request, error, clearError} = useHttp()
  const [article, setArticle] = useState()
  const name = useParams().name

  useEffect(() => {
    window.scrollTo(0, 0)
  },[name])
  
  const getArticle = useCallback(async () => {
    try {
      const fetched = await request(`/api/article/${name.slice(1)}`, 'GET', null)
      setArticle(fetched.article)
    } catch (e) {}

  },[request,name])

  useEffect( () => {
    console.log(name)
    getArticle()
  },[getArticle])

  return (
    <div className={styles.articleOuterCont}>
      {article && <div className={styles.articleInnerCont}>
        <h1>{article.title}</h1>
        <hr className={styles.hr}/>
        {article.body.map(elm => { 
          if (elm.type == 'subtitle') return ( <h2 className={styles.subtitle}>{elm.text}</h2> )
          if (elm.type == 'paragraph') return ( <p>{elm.text}</p> )
          if (elm.type == 'photo') return ( <img src={require(`../../assets/${elm.text}`)} style={{width: '100%'}} /> )
        })}
        <hr className={styles.hr}/>
        <Link to={'/articles'} className={`${styles.subtitle} ${styles.backToAll}`}>
          {'<'} <div className={styles.dash}>-</div> 
          Back To All Articles</Link>
        <hr className={styles.hr}/>
        <GetAllArticles/> 
      </div>}
    </div>
  )
}
