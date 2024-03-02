import './Link.css'
import { useEffect, useState } from 'react';
import LinkImg from '../images/link-solid(1).svg';
import Dropdown_ui from '../utilities/ui-compunets/Dropdown_ui';
import { PLATFORMS } from './lib/platform';


import { generatePlatformIcon } from './platformIcon';
import { urlIsValid,generateMatchExp} from './lib/platformValidator';
import { Select,Popover,Alert } from 'antd';
function Link({link,onRemove,onUpdate}) {
  const [isValidUrl, setIsValidUrl] = useState(urlIsValid(link.url,link.platform));
    const [platform, setPlatform] = useState(link.platform);
    const [url, setUrl] = useState(link.url);
  
    useEffect(() => {
      onUpdate({ platform: platform, url, isValidUrl });
    }, [url, isValidUrl, platform]);

    const handlePlatformChange = (value) => {
      setPlatform(value);
      if (urlIsValid(url, link.platform)) {
        setIsValidUrl(true);
      }
      else{
        setIsValidUrl(false)
      }
    };
  
    const handleUrlChange = (event) => {
      setUrl(event.target.value);
      if (urlIsValid(event.target.value, link.platform)) {
        setIsValidUrl(true);
      }
      else{
        setIsValidUrl(false);
      }

    };
  
    return(
        <>
            <div className="link-container">
                <div className="link-header">
                     <div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"></path></svg>
                     <span># link {link.id}</span>
                     </div>
                 
                     <button onClick={(onRemove)} className='btn remove-btn'>remove</button>
                </div>
                   <form>
                      <div className="form-field">
                       <label>platform</label>
                       <div className="input-field">
                         <div className="input-icon">
                            {generatePlatformIcon(link.platform, true)}
                         </div>
                         <Select 
                         defaultValue={link.platform}
   
                         onChange={(data)=>{handlePlatformChange(data)}}
                         options={Object.entries(PLATFORMS).map(([key, value]) => ({ value: value, label: value }))}>
                      </Select>
                       </div>

                      </div>
                      <div className="form-field">
                          <label>link</label>
                          <div className={`input-field ${isValidUrl ? 'valid' : 'error'}`}>
                          <div className="input-icon">
                         <img width="25px" height="25px" className="input-icon" alt='link icon' src={LinkImg}></img>
                         </div>
                         <Popover content={
                        <Alert message={`Currect Url: ${generateMatchExp(link.platform)}`} type="success" />
                        } title="Tip" trigger="hover">
                         <input type='text' value={link.url}   onChange={handleUrlChange} placeholder='www.google.com'></input>
                         </Popover>
                       </div>
                      </div>
                   </form>
                </div>
        </>
    )
}
export default Link;