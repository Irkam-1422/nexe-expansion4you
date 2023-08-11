import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import styles from '../../styles/Articles.module.css' 
import { Link } from 'react-router-dom'
import { Modal2 } from '../Modal2'
import { useNavigate } from 'react-router-dom'

export const YourCaseStudies = () => {
  const {loading, request, error, clearError} = useHttp()
  const navigate = useNavigate()  
  const [casestudies, setCaseStudies] = useState([])
  const [modal,setModal] = useState(false)
  const [msg,setMsg] = useState({text: 'Are you sure you want to delete case study:', title: '', text2: 'You won`t be able to undo this action.', id: ''})
  
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

  const handleDeletingClick = (a) => {
    setMsg({...msg, title: a.titleSmall, id: a._id})
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const handleDeleting = async (id) => {
    const data = await request('/api/casestudy/delete', 'POST', {id})
    getCaseStudies()
  }


  const handleUpdate = (a) => { 
    navigate(`/edit-casestudy/:${a._id}`)
  }

  return ( 
    <div className={styles.allArticlesCont}>
      <h1 className={styles.allArticlesH1}>All CaseStudies:</h1>
      {/* background: linear-gradient(45deg, #de30e41f, #61dafb29);
    padding: 1% 5%; */}
      <div 
      className={styles.lightBoxCont}
      >
        {casestudies.map(a =>  <div className={styles.box}><Link to={`/casestudies/:${a._id}`} className={styles.lightBox}>
                                <div >
                                    <h1 className={styles.lightH1} style={{fontSize: '1.5rem'}}>{a.titleSmall}</h1>
                                    <div className="text">
                                      {a.titleBig}
                                    </div>
                                </div>
                            </Link>
                            <div className={styles.edcont}>
                              <button className={styles.editArticle} onClick={() => handleUpdate(a)}>Edit</button>
                              <button className={`${styles.editArticle} ${styles.deleteArticle}`} onClick={() => handleDeletingClick(a)}>Delete</button>
                            </div></div>)}   
      </div> 
      <Link to={'/add-casestudy'}><button className={`${styles.btn} ${styles.submit}`}>+ Add CaseStudy</button></Link>
      {modal && <Modal2 msg={msg} returnClose={closeModal} returnDelete={handleDeleting}/>}
    </div>
  )
}
