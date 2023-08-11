import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { ArticleBoxLight } from './ArticleBoxLight'
import styles from '../../styles/Articles.module.css' 
import { Link } from 'react-router-dom'
import { Modal2 } from '../Modal2'
import { useNavigate } from 'react-router-dom'

export const YourArticles = () => {
  const {loading, request, error, clearError} = useHttp()
  const navigate = useNavigate()  
  const plashka = useRef(null)
  const [articles, setArticles] = useState([])
  const [modal,setModal] = useState(false)
  const [main,setMain] = useState(null)
  const [msg,setMsg] = useState({text: 'Are you sure you want to delete article:', title: '', text2: 'You won`t be able to undo this action.', id: ''})
  
  const getArticles = useCallback(async () => {
    try {
      const fetched = await request(`/api/article`, 'GET', null)
      console.log(fetched)
      setArticles(fetched.articles)
      setMain(fetched.main)
    } catch (e) {}

  },[request])
 
  useEffect( () => {
    getArticles()
  },[getArticles])

  const handleDeletingClick = (a) => {
    setMsg({...msg, title: a.title, id: a._id})
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const handleDeleting = async (id) => {
    const data = await request('/api/article/delete', 'POST', {id})
    getArticles()
  }

  const handleUpdate = (a) => { 
    navigate(`/edit-article/:${a.title.split(' ').join('-')}`)
  }

  const setAsMainArticle = async (title) => {
    //console.log(e.target.innerHTML)
    //e.target.innerHTML == '☆' ? e.target.innerHTML = '★' : e.target.innerHTML = '☆' 
    try {
      const name = title.split(' ').join('-')
      console.log(name)
      const data = await request(`/api/content/set-article`, 'POST', {name})
      getArticles()
    } catch (e) {}
    
  }

  return ( 
    <div className={styles.allArticlesCont}>
      <h1 className={styles.allArticlesH1}>All Articles:</h1>
      {/* background: linear-gradient(45deg, #de30e41f, #61dafb29);
    padding: 1% 5%; */}
      <div 
      className={styles.lightBoxCont}
      >
        {articles.map(a =>  <div className={styles.box}>
                              <div className={styles.starEmpty} 
                                  onMouseEnter={(e) => {e.target.parentNode.childNodes[1].style.opacity = '1'}}
                                  onMouseLeave={(e) => {e.target.parentNode.childNodes[1].style.opacity = '0'}}
                                   onClick={(e) => setAsMainArticle(a.title)}> 
                                   {main && a.title 
                                              .split(' ')
                                              .join('-')
                                              .includes(main) ? '★' : '☆'}
                              </div>
                              <div className={styles.plashka} ref={plashka}>
                                {a.title
                                      .split(' ') 
                                      .join('-')
                                      .includes(main) ? 'This article is set as main article.' 
                                      : 'Set this article as a main article.' } 
                              </div>
                              <Link to={`/articles/:${a.title.split(' ').join('-')}`} className={styles.lightBox}>
                                <div > 
                                    <h1 className={styles.lightH1} style={{fontSize: '1.5rem'}}>{a.title}</h1>
                                    <div className="text">
                                      {a.body.filter(b => b.type=='paragraph')[0].text.split(' ').slice(0,20).join(' ')}...
                                    </div>
                                </div>
                            </Link>
                            <div className={styles.edcont}>
                              <button className={styles.editArticle} onClick={() => handleUpdate(a)}>Edit</button>
                              <button className={`${styles.editArticle} ${styles.deleteArticle}`} onClick={() => handleDeletingClick(a)}>Delete</button>
                            </div></div>)}   
      </div> 
      <Link to={'/add-article'}><button className={`${styles.btn} ${styles.submit}`}>+ Add Article</button></Link>
      {modal && <Modal2 msg={msg} returnClose={closeModal} returnDelete={handleDeleting}/>}
    </div>
  )
}
