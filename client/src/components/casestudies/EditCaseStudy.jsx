import React, { useEffect,useCallback,useState,cloneElement } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'

export const EditCaseStudy = ({component}) => {
  const {loading, request, error, clearError} = useHttp()
  const id = useParams().id 
  const [element,setElement] = useState(null) 
 
  const getCaseStudy = useCallback(async () => {
    try {
      const fetched = await request(`/api/casestudy/${id.slice(1)}`, 'GET', null) 
      setElement(cloneElement(component, {casestudy: fetched.casestudy}))
      console.log(fetched.casestudy)
    } catch (e) {}

  },[request,id]) 

  useEffect( () => {
    console.log(element)
    getCaseStudy()
  },[getCaseStudy])
 
  return (
    <div>
        {element}
    </div>
  )
}