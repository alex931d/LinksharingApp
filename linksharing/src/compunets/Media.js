import { useState } from "react";
import './Link.css'
import { MediaurlIsValid } from "./lib/mediaPlatformValidator";
import {Select  } from 'antd'; 
import VideoEmbed from "../utilities/ui-compunets/VideoEmbed";
import { RenderMediaContent } from "./RenderMediaContent";
function Media({media,onRemove,onUpdate}){
    const [isValidUrl,setIsValidUrl] = useState(false);
    const [platform,setPlatform] = useState(media.platform);
    const [url,setUrl] = useState(media.url)
    const [type,setType] = useState(media.type)

    const handleInputChange = (event) =>{
        onUpdate({type:type,url: event.target.value,platform:platform})
        setUrl(event.target.value);
        if (MediaurlIsValid(event.target.value, media.platform)) {
            setIsValidUrl(true);
          }
          else{
            setIsValidUrl(false);
          }
  
    }
    return(
        <>
                 <div className="link-container">
                <div className="link-header">
                     <div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"></path></svg>
                     <span># media {media.id}</span>
                     </div>
                     <button onClick={(onRemove)} className='btn remove-btn'>remove</button>
                   </div>
                   <form>
                   <div className="form-field">
                   <Select
                defaultValue="video"
                onChange={(data)=>{
                    setType(data)
                    onUpdate({type: data,url: url})
                }}
                options={[
                  {value: 'video',label:'video'},
                  {value: 'image',label:'image'}
                ]} />

                   </div>
                       <RenderMediaContent type={type} isValid={isValidUrl} media={media} handleInputChange={handleInputChange} handlePlatformChange={(data)=>{
                        setPlatform(data)
                        onUpdate({type:type,url: url,platform:data})
                       }} />
                   </form>
                </div>
        </>
    )
}
export default Media;