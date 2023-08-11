import React, {useCallback, useState, useEffect, cloneElement} from 'react'
import { useHttp } from "../hooks/http.hook"

export const Page = ({name,component}) => {

    const {loading, request, error, clearError} = useHttp()
    const [element,setElement] = useState(null)

    const getPage = useCallback(async () => {
        try {
            const fetched = await request(`/api/content/:${name}`, 'GET', null)
            setElement(cloneElement(component, {page: fetched.page}))
        } catch (e) {}
    },[request,name]) 

  useEffect( () => {
    getPage()
  },[getPage])
 
  return (
    <div>
      {element}
    </div>
  )
}
