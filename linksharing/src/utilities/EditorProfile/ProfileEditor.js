
import '../EditorLinks/Cosumize'
import { useState,useEffect } from "react";
import { toast } from 'react-toastify';
import { updateProfile } from '../../compunets/lib/profile';
import './ProfileEditor.css';
import 'filepond/dist/filepond.min.css';
function ProfileEditor({user,devLinkId,profile,update}){
    const [file, setFile] = useState();
    const [fileBuffer,setFileBuffer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileBuffer(selectedFile);
        setFile(URL.createObjectURL(selectedFile));
        handleProfileChange('profileBlob', selectedFile);
        handleProfileChange('profileImgTemp',URL.createObjectURL(selectedFile))
      };

      const handleProfileChange = (key,data) =>{
        const updatedProfile = {
            ...profile,
            [key]: data,
          };
          update(updatedProfile);
          setIsEditing(true);
      }
    return(
            <div className="editor-container">
              <div className="editor">
                <div className="editor-header">
                  <h2 className="editor-title">Customize your links</h2>
                  <span className="editor-about">add/edit/remove links below and then share all your profiles with the world!</span>
                </div>
                  <div className="profile-editor-area">
                      <div className='profile-editor-container'>
                         <div className="profile-editor-container-first">
                             <span>profile picture</span>
                         </div>
                         <div className="profile-editor-container-last">
                              <picture>
                              <div class="profile-image" style={{ backgroundImage: `url('${profile.profileImgTemp || `${process.env.PUBLIC_URL}/nonAuthImgs/${profile.profile_picture}`}')` }} alt='profileimage'>
                                {!file ? (
                                  <div className='profile-image-ontop'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                               <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                <span>Change Image</span>
                              </div>
                                ) : (
                                <div className='profile-image-ontop hover'>
                              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                               <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                                <span>Change Image</span>
                              </div>
                                )}

                              <input type="file" onChange={(e)=>{
                                handleFileChange(e)
                              }} />
                                  </div>
                              </picture>
                              <div>
                                <span>images must be below 1024x1024px use PNG,JPG or BMP format</span>
                              </div>
                         </div>
                      </div>
                      <div className='profile-editor-container'>
                      {Object.entries(profile).slice(1).map(([key, value], index) => (
  !['profileBlob', 'profile_picture', 'profileImgTemp'].includes(key) && (
    <div key={index} className='profile-editor-row'>
      <span>{key.replace(/_/g, ' ')}*</span>
      <div className='form-field'>
        <input
          className='input-field'
          onChange={(e) => handleProfileChange(key, e.target.value)}
          type='text'
          value={value}
          placeholder={key.replace(/_/g, '')}
        />
      </div>
    </div>
  )
))}
                      </div>
                  </div>
                  {isEditing && (
        <div className="editor-bottom">
          <div className="editor-bottom-inner">
            <button onClick={()=>{
              updateProfile(devLinkId,profile,fileBuffer)
              setIsEditing(false)
            }} className="btn" >
                  Save
            </button>
          </div>
        </div>
      )}
              </div>

            </div>
         
    )
}
export default ProfileEditor;