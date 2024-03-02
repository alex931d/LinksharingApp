import Socialink from "../../compunets/SocialLink";
import { Link,useNavigate  } from 'react-router-dom';
import VideoEmbed from "../ui-compunets/VideoEmbed";
import './Preview.css';
import {toast} from 'react-toastify';
import { useParams } from 'react-router-dom';
import useAuth from "../../compunets/lib/auth";
import {useIsAuthenticated} from 'react-auth-kit';
import { useEffect,useState } from "react";
import FileMockup from "../../compunets/FileMockup";
import smallLogo from '../../images/logo-devlinks-small.svg';
import defaultProfileImg from '../../images/default-profile-picture.png'

import { generateBackgroundColor } from "../../compunets/lib/mediaPlatform";
import { Popover,Button,Image,Modal,QRCode } from 'antd';
function Preview({items,profileInfo,settings}){
  const navigate = useNavigate();
      const {getPreviewData} = useAuth();
    const [shareLinksOpen, setShareLinksOpen] = useState(false);
    const { id } = useParams();

      useEffect(() => {
        getPreviewData(id);
      }, [id]);
    const isAuthenticated = useIsAuthenticated()
    return (
        <>
        <div className="preview-container">
            <div className="preview-container-banner">
            <header className="center">
            {isAuthenticated() ?(
                <nav>
                <button className="btn look-btn" onClick={()=>navigate(-1)}>back to editor</button>
       
                    <button onClick={() => setShareLinksOpen(true) } className="btn">share link</button>
                </nav>
            ) : (
              <nav>
                    <button onClick={() => setShareLinksOpen(true)} className="btn">share link</button>
                </nav>
            )}
            </header>
            <div className="preview-container-inner">
                 <div className="preview-card">
                      <div className="preview-card-inner">
                           <div className="preview-card-inner-first">

                           {profileInfo.profile_picture ? (
        <img
          src={`${process.env.PUBLIC_URL}/nonAuthImgs/${profileInfo.profile_picture}`}
          alt="User Profile"
        />
      ) : (
        <img
          src={defaultProfileImg}
          alt="Default Profile"
        />
      )}


                               <p className="profile-name">
                                 {profileInfo.first_name} {profileInfo.last_name}
                                 </p>
                                 <p className="profile-email">
                                 {profileInfo.email}
                             </p>
                           </div>
                           <div className="preview-card-inner-last">
                           <ul>
                           {items.map((item, index) => (
                            <li key={index}>
                             {item.itemType === 'links' && (
                                <div className='social-link-wrapper'>
                             <Socialink link={item} settings={settings} />
                              </div>
                             )}
                             {item.type === 'medias' && (
                                <div className='social-link-wrapper'>
                                <div className="video-container-outer">
                                <VideoEmbed  embedId={item.url} />
                                </div>
                               
                              </div>
                             )}
                             {item.type === 'image' && (
                                <div className='social-link-wrapper'>
                                <Image height={300}  width={250}
                                  src={item.url}
                                  />
                               
                              </div>
                             )}
                             {item.itemType === 'files' && (
                              <div className='social-link-wrapper'>
                                <FileMockup file={item} settings={settings}/>
                              </div>
                             )}
                              </li>
                                  ))}
                           </ul>
                           </div>
                      </div>
                 </div>
            </div>
            </div>
            </div>
            <Modal
        title="share"
        centered
        open={shareLinksOpen}
        onOk={() => setShareLinksOpen(false)}
        onCancel={() => setShareLinksOpen(false)}
      >
      <div className="shareModal-container">
        <Button onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success('succesfully copied to clipboard!', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    });
    }
        }>copy url to clipboard</Button>
        <QRCode
        errorLevel="H"
        value={window.location.href}
        icon={smallLogo}
         />
      </div>
  
      </Modal>

        </>
    )
}
export default Preview;