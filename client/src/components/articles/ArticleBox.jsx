import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/Articles.module.css'

export const ArticleBox = ({revert,article}) => {
  return (
    <Link to={`/articles/:${article.title.split(' ').join('-')}`} className={styles.borderCont}>
            <div className={styles.articleCont} style={revert?{flexDirection: 'row-reverse'}:{}}>
                <div className={styles.textCont} style={revert?{textAlign: 'end'}:{}}>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className="">{article.body.filter(b => b.type=='paragraph')[0].text.split(' ').slice(0,30).join(' ')}...</div>
                </div>  
                <div className={styles.imgCont}>
                <img className={styles.img} src={require(`../../assets/channels.png`)} alt="" />
                    {/* <img className={styles.img} src={require(`../../assets/${article.img}`)} alt="" /> */}
                </div>
            </div>
    </Link>
  )
}
