import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import styles from '../styles/Articles.module.css'
import { ArticleBox } from './articles/ArticleBox'

// const articles = [
//     {
//         title: 'Why do You need Digital Marketing',
//         text:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor, 
//             sit amet consectetur adipisicing elit. Quisquam unde ab odio, modi eligendi laborum, 
//             distinctio temporibus sapiente recusandae aperiam sit? Ratione a sit recusandae eaque velit error, 
//             nobis beatae? Temporibus provident dolor, velit modi facilis esse perferendis autem vero tempora error 
//             doloremque molestiae consectetur dignissimos delectus nulla sapiente veritatis? 
//             Nam quaerat assumenda eligendi quas! Sequi voluptatum enim eos maxime?
//             Itaque odio beatae est repudiandae nobis amet quo? Ducimus reiciendis doloremque commodi voluptatum dolor distinctio fuga officia esse repellendus facilis culpa, odit mollitia inventore animi, pariatur adipisci atque a laudantium.
//             Laborum odio cupiditate atque similique. Beatae exercitationem iure explicabo illo architecto facilis eius. A, non! Amet deserunt aspernatur dolorum, possimus impedit mollitia fuga saepe voluptates, ducimus delectus quis modi dolore?
//             Et libero temporibus assumenda quis possimus ipsa, saepe velit nostrum similique architecto incidunt 
//             dolorum ipsum quibusdam nam unde blanditiis fugiat illum perspiciatis est, itaque distinctio veniam. 
//             Doloremque voluptates exercitationem sequi? Velit quisquam ipsum incidunt quo quos corporis voluptate 
//             quod modi dolorem suscipit!`,
//         img: 'channels.png'
//     }
// ]

export const Articles = () => {

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
    <div className={styles.cont}>
        <h1 className={styles.h1}>Articles</h1>
        {articles.map((article,i) => <ArticleBox revert={i%2!==0} article={article}/>)}
    </div>
  )
}
