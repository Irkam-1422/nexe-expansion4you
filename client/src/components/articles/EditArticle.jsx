import React, { useEffect,useCallback,useState,cloneElement } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'

export const EditArticle = ({component}) => {
  const {loading, request, error, clearError} = useHttp()
  const name = useParams().name 
  const [element,setElement] = useState(null) 
 
  const getArticle = useCallback(async () => {
    try {
      const fetched = await request(`/api/article/${name.slice(1)}`, 'GET', null)
      setElement(cloneElement(component, {article: fetched.article}))
    } catch (e) {}

  },[request,name])

  useEffect( () => {
    console.log(element)
    getArticle()
  },[getArticle])
 
  return (
    <div>
        {element}
    </div>
  )
}
