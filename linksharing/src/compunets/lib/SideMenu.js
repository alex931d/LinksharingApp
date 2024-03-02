import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import ProfileModal from '../../utilities/myProfile/ProfileModal';
import '../../utilities/myProfile/ProfileModal.css'
import { Formik,Form,Field,ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import DisplayUserCreds from '../../utilities/Auth/Signup/DisplayUserCreds';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import useAuth from './auth';
import { Button, Drawer,Timeline,Modal,Tooltip } from 'antd';
import ProfilePictureGeneator from './ProfilePictureGeneator';
import '../../compunets/lib/SideMenu.css';
const profileSchema = Yup.object().shape({
email: Yup.string().email('invalid email').required('email is required')
})

function SideMenu({userProfile, isMenuOpen, setMenuOpen, toggleMenu,serverData,updateUserData }) {
  const { updateUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [selectedKey, setSelectedKey] = useState(null);
  const [subDrawer,setSubDrawer] = useState(false);
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
    const useQueryParam = (paramName, paramValue, replace = true) => {
        const navigate = useNavigate();
       
        useEffect(() => {
          const queryParams = new URLSearchParams(window.location.search);
      
          if (paramValue) {
            queryParams.set(paramName, paramValue);
          } else {
            queryParams.delete(paramName);
          }
      
          navigate(`?${queryParams.toString()}`, { replace });
        }, [paramName, paramValue, replace, navigate]);
      };


    useQueryParam('menuOpen', isMenuOpen.toString());

    const handleProfileChange = (data,key) =>{
      const updatedProfile = {
          [key]: data,
        };
        updateUserData(updatedProfile);
        updateUser(updatedProfile,userProfile._id)

    }


  return (
    <Drawer title="Profile settings" onClose={toggleMenu} open={isMenuOpen}>

           <div className='profile-modal'>
                  <div className='profile-modal-header'>
           
                        <div class="profile-modal-pic" onClick={()=>{setIsProfileModelOpen(true)}}>
                        <Tooltip title="change profile picture">
                        <svg style={{ width: '30px', height: '30px' }}  dangerouslySetInnerHTML={{__html: userProfile.avatar}} />
                        </Tooltip>
                        </div>
                 
                  </div>
            
                  <div className='profile-modal-body'>



       <div className='form-field'>
       <Link className="btn look-btn" to="/logout">
              Logout
            </Link>
       </div>
       <div className='form-field'>
       <button onClick={()=>setSubDrawer(true)} className='btn look-btn'>user credentials</button>
   
       </div>

    
    </div>
        </div>
           <Drawer
           title="user credentials" 
           onClose={()=>setSubDrawer(false)}
            open={subDrawer}>
              <div>
              <div className='side-menu-container'>
              <DisplayUserCreds userProfile={userProfile} onSubmit={(data,key)=>{handleProfileChange(data,key)}}/>
              </div>
           </div>
           </Drawer>
           <Modal open={isProfileModelOpen} onCancel={()=>{setIsProfileModelOpen(false)}}
              footer={[
        ]}>
        <div className='profile-picture-change-container'>
        <div class="profile-modal-pic">
                         
                           {userProfile.avatar ? (
                             <>
                           
                              <svg style={{ width: '30px', height: '30px' }} dangerouslySetInnerHTML={{ __html: userProfile.avatar }}></svg>
                         
                             </>
                           ) : (
                            <svg dangerouslySetInnerHTML={{__html: userProfile.avatar}} />
                           )}
            </div>
            <ProfilePictureGeneator user={userProfile}  onSelect={(selection,key)=>{handleProfileChange(selection,key)}}/>
        </div>
      </Modal>
        </Drawer>
        
  );
}

export default SideMenu;