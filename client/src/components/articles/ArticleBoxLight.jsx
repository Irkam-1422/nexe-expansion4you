import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Articles.module.css'

export const ArticleBoxLight = ({article}) => {
  return (
    <Link to={`/articles/:${article.title.split(' ').join('-')}`} className={styles.lightBox}>
        <div className="box">
            <h1 className={styles.lightH1}>{article.title}</h1>
            <div className="text">{article.body.filter(b => b.type=='paragraph')[0].text.split(' ').slice(0,20).join(' ')}...</div>
        </div>
    </Link>
  )
}
