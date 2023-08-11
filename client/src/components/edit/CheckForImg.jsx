import React, {useEffect, useState} from 'react'
import { FileInput } from '../FileInput'

export const CheckForImg = ({source}) => {

  const [src,setSrc] = useState(null)

  useEffect(() => {
    console.log(source)
    console.log(source.slice(0,source.length-1));
    try{
        const src = source.includes('service') 
        ? require(`../../assets/${source}.png`)
        : require(`../../assets/${source.slice(0,source.length-1)}.png`)
        setSrc(src)
    }
    catch(err){
        try{
            const src = source.includes('service') 
            ? require(`../../assets/${source}.jpeg`)
            : require(`../../assets/${source.slice(0,source.length-1)}.jpeg`)
            setSrc(src)
        }
        catch(err){
            console.log(err)
        }
    }
  },[source])  

  const handlePhotoReturn = (name) => {
    console.log(name)
    //setForm({...form, body: form.body.concat({type: 'photo', text: name})}) 
  }

  return (
    <div>
        {src ? <>
            <div style={{color: '#8f3193', margin: '1%'}}>
                There's already an image existing for this step. <br /> 
                If you want to use another image, change the second input. 
            </div> 
            <img src={src} style={{width: '50%'}} />
            </> : <>
            <div className="">
                You have to upload the image for this step
            </div> 
            <FileInput name={source.includes('service') ? source : source.slice(0,source.length-1)} returnSuccess={(name) => handlePhotoReturn(name)}/>
            </>}
    </div>
  )
}
