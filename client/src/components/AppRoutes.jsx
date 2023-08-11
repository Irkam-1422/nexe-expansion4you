import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Main } from './Main'
import { About } from './About'
import { Contact } from './Contact'
import { Navigation } from './Navigation'
import { Services } from './Services'
import { HowWeWork } from './HowWeWork'
import { Edit } from './Edit'
import { Articles } from './Articles'
import { ArticleInside } from './articles/ArticleInside'
import { AddArticle } from './articles/AddArticle'
import { LogIn } from './edit/LogIn'

export const AppRoutes = () => {
  return (
    <div>
        <Navigation/> 
        <Routes>
            <Route path='/' element={<Main height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/services' element={<Services height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/about' element={<About height={window.innerHeight} width={window.innerWidth}/>}/>  
            <Route path='/work' element={<HowWeWork height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/contact' element={<Contact height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/login' element={<LogIn height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/articles' element={<Articles height={window.innerHeight} width={window.innerWidth}/>}/> 
            <Route path='/articles/:name' element={<ArticleInside height={window.innerHeight} width={window.innerWidth}/>}/> 
        </Routes>
    </div>
  )
}
