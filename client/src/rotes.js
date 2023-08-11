import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { About } from './components/About'
import { Articles } from './components/Articles'
import { AddArticle } from './components/articles/AddArticle'
import { ArticleInside } from './components/articles/ArticleInside'
import { EditArticle } from './components/articles/EditArticle'
import { YourArticles } from './components/articles/YourArticles'
import { CaseStudies } from './components/CaseStudies'
import { AddStudy } from './components/casestudies/AddStudy'
import { EditCaseStudy } from './components/casestudies/EditCaseStudy'
import { StudyInside } from './components/casestudies/StudyInside'
import { YourCaseStudies } from './components/casestudies/YourCaseStudies'
import { Contact } from './components/Contact'
import { Edit } from './components/Edit'
import { AddService } from './components/edit/AddService'
import { EditContent } from './components/edit/EditContent'
import { EditNav } from './components/edit/EditNav'
import { LogIn } from './components/edit/LogIn'
import { EmailTester } from './components/EmailTester'
import { HowWeWork } from './components/HowWeWork'
import { Main } from './components/Main'
import { Navigation } from './components/Navigation'
import { Page } from './components/Page'
import { Services } from './components/Services'
import { ServiceTemplate } from './components/services/ServiceTemplate'

export const useRoutes = (isAuthentificated) => {

    const [activity,setActivity] = useState('')
    const [page,setPage] = useState('main')
    const [givenPage,setGivenPage] = useState('main')
    const [reload,setReload] = useState(false)
    const [services,setServices] = useState([])
    const [srvs,setSrvs] = useState([])

    const handleActivityReturn = (act) => {
        setActivity(act)
    }

    const handlePageReturn = (pg) => {
        setPage(pg)
    }

    const handleGivenPageReturn = (pg) => {
        console.log(pg)
        setGivenPage(pg)
    }

    const handleServicesReload = () => {
        setReload(true)
        setTimeout(() => {
            setReload(false)
        },100)
    }

    const handleGetServices = (array) => {
        setServices(array)
    }

    const handleClearServices = () => {
        setServices([])
    }

    const handleServicesReturn = (srvcs) => {
        setSrvs(srvcs)
    }

    if (isAuthentificated) {
        return (
            <>
            <EditNav origActivity={activity} returnPage={handlePageReturn} reload={reload} services={services} returnClearServices={handleClearServices} givenPage={givenPage}/> 
            <Routes>
                <Route path='/add-article' exact element={<AddArticle />}/> 
                <Route path='/edit' exact element={<Edit returnActivity={handleActivityReturn} returnPage={handlePageReturn} returnGivenPage={handleGivenPageReturn}/>}/> 
                <Route path='/articles/:name' element={<ArticleInside/>}/> 
                <Route path='/articles' element={<YourArticles/>}/> 
                <Route path='/edit-article/:name' element={<EditArticle component={<AddArticle/>}/>}/>  
                <Route path='/edit-content' element={<Page component={<EditContent returnPage={handlePageReturn} reloadServices={handleServicesReload} returnServices={handleGetServices}/>} name={page}/>}/> 
                <Route path='/add-casestudy' exact element={<AddStudy />}/>  
                <Route path='/edit-casestudy/:id' element={<EditCaseStudy component={<AddStudy/>}/>}/> 
                <Route path='/casestudies/:id' element={<StudyInside/>}/> 
                <Route path='/casestudies' element={<YourCaseStudies/>}/>  
                <Route path='/add-service' element={<AddService length={services.length}/>}/>  

                <Route path='/login' element={<Navigate to='/edit' replace/>} />  
            </Routes>
            </>
        )
    }

    return (
        <>
        <Navigation/> 
        <Routes>
            <Route path='/' element={<Page component={<Main/>} name={'main'}/>}/> 
            <Route path='/services' element={<Page component={<Services servicesReturn={handleServicesReturn}/>} name={'services'}/>}/> 
            <Route path='/about' element={<Page component={<About/>} name={'about'}/>}/> 
            <Route path='/work' element={<Page component={<HowWeWork/>} name={'work'}/>}/> 
            <Route path='/contact' element={<Page component={<Contact/>} name={'contact'}/>}/> 
            
            {/* <Route path='/marketingstrategy' element={<Page component={<MarketingStrategy/>} name={'marketingstrategy'}/>}/> 
            <Route path='/ecommerce' element={<Page component={<ECommerce/>} name={'ecommerce'}/>}/> 
            <Route path='/branding' element={<Page component={<Branding/>} name={'branding'}/>}/> 
            <Route path='/socialmediaadvertising' element={<Page component={<SocialMediaAdvertising/>} name={'socialmediaadvertising'}/>}/> 
            <Route path='/searchengineadvertising' element={<Page component={<SearchEngineAdvertising/>} name={'searchengineadvertising'}/>}/> 
            <Route path='/webdevelopment' element={<Page component={<WebDevelopment/>} name={'webdevelopment'}/>}/> 
            <Route path='/searchengineoptimization' element={<Page component={<SearchEngineOptimization/>} name={'searchengineoptimization'}/>}/>  */}

            {srvs && srvs.map(srv =>  <Route path={`/${srv.split(' ').join('').split('-').join('').toLowerCase()}`} element={<Page component={<ServiceTemplate/>} name={srv.split(' ').join('').split('-').join('').toLowerCase()}/>}/> )}
            <Route path='/marketingstrategy' element={<Page component={<ServiceTemplate/>} name={'marketingstrategy'}/>}/> 
            {/* <Route path='/ecommerce' element={<Page component={<ServiceTemplate/>} name={'ecommerce'}/>}/> 
            <Route path='/branding' element={<Page component={<ServiceTemplate/>} name={'branding'}/>}/> 
            <Route path='/searchengineadvertising' element={<Page component={<ServiceTemplate/>} name={'searchengineadvertising'}/>}/> 
            <Route path='/webdevelopment' element={<Page component={<ServiceTemplate/>} name={'webdevelopment'}/>}/> */}
            <Route path='/searchengineadvertising' element={<Page component={<ServiceTemplate/>} name={'searchengineadvertising'}/>}/>  
            <Route path='/socialmediaadvertising' element={<Page component={<ServiceTemplate/>} name={'socialmediaadvertising'}/>}/> 
            {/* <Route path='/ecommerce' element={<Page component={<ServiceTemplate/>} name={'ecommerce'}/>}/> */}
            <Route path='/login' element={<LogIn/>}/> 

            <Route path='/casestudy/:id' element={<StudyInside/>}/> 
            <Route path='/articles' element={<Articles/>}/> 
            <Route path='/articles/:name' element={<ArticleInside/>}/> 
            <Route path='/casestudies' element={<CaseStudies/>}/> 
            <Route path='/casestudies/:id' element={<StudyInside/>}/>

            <Route path='/edit' element={<Navigate to='/login' replace/>} />
            <Route path='/edit-content' element={<Navigate to='/login' replace/>} />
            <Route path='/add-article' element={<Navigate to='/login' replace/>} /> 
            <Route path='/add-casestudy' element={<Navigate to='/login' replace/>} /> 
            {/* <Route path='/' element={<Navigate to='/:main' replace/>} />  */}  

            <Route path='/emailtester' element={<EmailTester/>}/> 

        </Routes>
        </> 
    )
}