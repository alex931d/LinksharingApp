import { Select,Image,Collapse } from 'antd';
import { useState } from 'react';
import { MEDIAPLATFORMS } from './lib/mediaPlatform';
import VideoEmbed from '../utilities/ui-compunets/VideoEmbed';
export const RenderMediaContent = ({type,isValid,media,handleInputChange,handlePlatformChange}) => {
    switch (type) {
      case 'image':
        return (
            <>
         <div className="form-field">
                  <label>embed image</label>
                    <div className="input-field">
                      <input type='text' value={media.url} onChange={handleInputChange} placeholder='www.google.com'></input>
                    </div>
               </div>
                <div className='form-field'>
                    <label>image Preview</label>
                    <Collapse items={[{
                          key: '1',
                          label: 'Preview',
                          children:      <Image height={300}  width={300}
                        src={media.url}
                      />,
                    }]} />
                     
                </div>
            </>
        );
      case 'video':
        return (
            <>
               <div className="form-field">
                  <label>embed video</label>
                    <div className={`input-field ${isValid ? 'valid' : 'error'}`}>
                      <input type='text' value={media.url} onChange={handleInputChange} placeholder='www.google.com'></input>
                    </div>
               </div>
               <div className='form-field'>
                 <label>platfrom</label>
                 <Select
                defaultValue="Youtube"
                onChange={handlePlatformChange}
                options={Object.entries(MEDIAPLATFORMS).map(([key, value]) => ({ value: value, label: value }))}/>
               </div>
                <div className='form-field'>
                    <label>video Preview</label>
                    <Collapse items={[{
                          key: '1',
                          label: 'Preview',
                          children:     <VideoEmbed  embedId={media.url} />,
                    }]} />
                
                </div>
            </>
        );
      default:
        return null;
    }
  };