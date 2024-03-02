import './Mockup.css'
import Socialink from './SocialLink';
import { Popover,Button,Image } from 'antd';
import { useState,useMemo } from 'react';
import FileMockup from './FileMockup';
import { generateBackgroundColor } from './lib/mediaPlatform';
import VideoEmbed from '../utilities/ui-compunets/VideoEmbed';
function Mockup({ref1,user,items,settings}) {
  const [open, setOpen] = useState(false);

    return (
     <>
     <div className="mockup-container" >
     <div className="mockup-container-inner">

       <svg
       ref={ref1}
         className="mockup"
         width="308"
         height="632"
         fill="none"
         viewBox="0 0 308 632"
       >
         <path
           stroke="#737373"
           d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
         />
         <path
             id='mockup-inner'
           stroke="#737373"
           d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
         />

         {user?.profile_picture || user.profileImgTemp ? (
           <g>
             <defs>
               <pattern id="avatar" x="0" y="0" height="1" width="1">
                 <image
                   preserveAspectRatio="xMidYMid slice"
                   x="0"
                   y="0"
                   height="100"
                   width="100"
                   xlinkHref={user.profileImgTemp
                   ? user.profileImgTemp
                  : `${process.env.PUBLIC_URL}/nonAuthImgs/${user.profile_picture}`}
                 />
               </pattern>
             </defs>
             <circle
               cx="153.5"
               cy="112"
               r="48"
               stroke="#633CFF"
               strokeWidth="4"
               fill="url(#avatar)"
             />
           </g>
         ) : (
           <circle cx="153.5" cy="112" r="48" fill="#EEE" />
         )}

         {user.first_name ? (
           <foreignObject x="0" y="180" width="100%" height="32" rx="4">
             <p className="profile-name">
               {user.first_name} {user.last_name}
             </p>
           </foreignObject>
         ) : (
           <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
         )}

         {user.email ? (
           <foreignObject x="0" y="208" width="100%" height="32" rx="4">
             <p className="profile-email">{user.email}</p>
           </foreignObject>
         ) : (
           <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
         )}
  
 
         {[...Array(5)].map((_, index) => {
  const item = items[index];

  return (
    <foreignObject
      key={index}
      width="100%"
      height="44"
      x="0"
      y={278 + index * 64}
      rx="4"
    >
       <div className='social-link-wrapper'>
        {item ? (
   
          <>
            {item.itemType === 'links' && (
              <Socialink link={item} settings={settings}/>
            )}
            {/* {item.itemType === 'medias' && (
              <>
                {item.type === 'video' && (
                  <Popover content={
                    <VideoEmbed embedId={item.url} />
                  } title="Preview" trigger="click">
                    <Button style={{ backgroundColor: generateBackgroundColor(item.platform.toUpperCase()) }}>Preview Video</Button>
                  </Popover>
                )}
                {item.type === 'image' && (
                  <Popover content={
                    <Image height={300} width={300} src={item.url} />
                  } title="Preview" trigger="click">
                    <Button>Preview Image</Button>
                  </Popover>
                )}
              </>
            )} */}
   
            {item.itemType === 'files' && (
              
                <FileMockup file={item} settings={settings}/>
              
            )}
          </>
      
        ) : (
              <div className='skeleton-bar'></div>

        )}
        </div>
    </foreignObject>
    
  );
})}
       

       </svg>
       </div>
     </div>
   </>
    );
}
export default Mockup;