import React, {useEffect,useState} from 'react'

export const CheckForImage = (source) => {
  
  const [src,setSrc] = useState(null)

  useEffect(() => {
    try{
        const src = require(`../../assets/${source.source}`)
        setSrc(src)
    }
    catch(err){
        console.log(err)
    }
  },[source])  

  return (
    <>
        {src ? <img src={src} style={{width: '74%', marginTop: '.1%'}} /> : <div style={{color: 'red'}}>Something went wrong</div> }
    </>
  )
}
