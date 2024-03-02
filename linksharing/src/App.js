
import './App.css';
import Nav from './utilities/Nav';
import React from 'react';
import { useState,useRef } from 'react';
import Main from './compunets/Main';
import Signup from './utilities/Auth/Signup/Signup';
import { RequireAuth } from 'react-auth-kit'
import { ToastContainer } from 'react-toastify';
import Logout from './utilities/Auth/Logout/Logout';
import 'react-toastify/dist/ReactToastify.css';
import Mockup from "./compunets/Mockup";
import Login from './utilities/Auth/Login/Login';
import useAuth from './compunets/lib/auth';
import Cosumize from "./utilities/EditorLinks/Cosumize";
import LandingPage from './utilities/Landing/LandingPage';
import ProfileEditor from "./utilities/EditorProfile/ProfileEditor";
import ImgEditor from './compunets/ImgEditor';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import Preview from './utilities/Preview/Preview';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { APIContext,APIContextProvider  } from './compunets/lib/context';
import { useContext,useEffect } from 'react';
import SideMenu from './compunets/lib/SideMenu';
import {useIsAuthenticated} from 'react-auth-kit';
import {useAuthUser} from 'react-auth-kit';
import { Tour } from 'antd';
import MemberShip from './utilities/MemberShip/MemberShip';
import { useDarkMode } from './compunets/lib/themeContext';
function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const steps = [
    {
      title: 'Preview',
      description: 'see your Preview of your links here',
      placement: 'center',
      target: () => ref1.current,
    },
    {
      title: 'Creating',
      description: 'Create your links here and other items',
      placement: 'bottom',
      target: () => ref2.current,
    },
    {
      title: 'Select Item',
      placement: 'bottom',
      description: 'select your prefered item in the dropdown menu',
      target: () => ref3.current,
    },
    {
      title: 'simply add',
      placement: 'top',
      description: 'then add your prefered item',
      target: () => ref4.current,
    }
  ];
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isEditorOpen,setEditorOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated()
  
  const { authState } = useAuthUser();
   const { checkAuthentication,closeTour } = useAuth();
   
    useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const menuOpenParam = queryParams.get('menuOpen');

    if (menuOpenParam === 'true') {
      setMenuOpen(true);
    }
  }, []);
  const contextData = useContext(APIContext);
  

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
const {darkMode,toggleDarkMode} = useDarkMode();
 const { serverData, dataLoaded } = contextData;
 const [itemsList, setItemsList] = useState([]);
 const [globalSettings,setGlobalSettings] = useState({
  enable_global_color_change: false,
 });
 const [profile, setProfile] = useState({
   profileBlob: '',
   profileImgTemp: null,
   profile_picture: '',
   first_name: '',
   last_name: '',
   email: '',
 });

const [userProfile,setUserProfile] = useState({
  firstLogin: '',
  _id: '',
  email: '',
  isPaidTier: undefined,
  userAuditLogs: [],
  avatar: null,
})
const [tourBegin, setTourBegin] = useState(false);
 // update data when context changes
  useEffect(() => {
    const avatar = createAvatar(identicon, {
      seed: serverData.userInfo?.email,
    });
    const fetchDataAndSetLinks = async () => {
    const {serverData} = contextData;
    if (contextData) {
      setItemsList(serverData.items);
      setGlobalSettings({
        enable_color_customization: serverData.userInfo?.enable_color_customization || false,
      })
      setProfile({
        profileBlob: '',
        profileImgTemp: null,
        profile_picture: serverData.userInfo?.profileImg || '',
        first_name: serverData.userInfo?.firstName || '',
        last_name: serverData.userInfo?.lastName || '',
        email: serverData.userInfo?.email || '',
      });
      setUserProfile({
        firstLogin: serverData.profileInfo.firstLogin || '',
        _id: serverData.profileInfo.userId || '',
        email: serverData.profileInfo.email || '',
        isPaidTier: serverData.profileInfo.isPaidTier || undefined,
        userAuditLogs: serverData.userAuditLogs || [],
        avatar:  serverData.profileInfo.avatar === null || serverData.profileInfo.avatar === "default"
        ? avatar.toJson().svg
        : serverData.profileInfo.avatar
      })
    }

  }
  fetchDataAndSetLinks();
  }, [contextData,dataLoaded,isAuthenticated(),serverData]);

  return (

 <React.Fragment>
 <div className={`App`} data-theme={darkMode ? 'dark' : 'light'}>
    <Tour open={tourBegin} onClose={() => {
    setTourBegin(false) 
    closeTour(userProfile)}} steps={steps} />
          <Routes>
              {/* Protected routes */}

                
                <Route
              path="/editor/links"
              element={(
                <RequireAuth loginPath={'/login'}>
                
                <div className="main-container">
                <div className='main-container-area'>
                  <header>
                    <Nav toggleMenu={()=>toggleMenu()}  profileInfo={userProfile} devLinkId={serverData._id}/>
                  </header>
                  <main>
                 <div className="main-content">
                    <Mockup ref1={ref1} user={profile} items={itemsList} settings={globalSettings} />
                    <Cosumize 
                    ref2={ref2}
                    ref3={ref3}
                    ref4={ref4}
                    user={userProfile}
                    itemsList={itemsList} 
                    profileInfo={profile} 
                    settings={globalSettings}
                    devLinkId={serverData._id}   
                    update={(data) => {setItemsList(data)}} 
                    updateSetting={(data) => setGlobalSettings((prevSettings) => ({ ...prevSettings, ...data }))}
                    />
               </div>
              </main>
          
                </div>
                 <SideMenu userProfile={userProfile} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} toggleMenu={toggleMenu} serverData={serverData}  updateUserData={(data) => setUserProfile((prevSettings) => ({ ...prevSettings, ...data }))}/>
                </div>
              
              </RequireAuth>
              )}
            />
            <Route path='/logout'
              
              element={(
                <RequireAuth loginPath={'/login'}>
                <div className="main-container">
               <Logout  />
               </div>
               </RequireAuth>
              )}>
              </Route>
            <Route
            path='/editor/profile'
            element={(
              <RequireAuth loginPath={'/login'}>
              <div className="main-container">
                 <div className='main-container-area'>
                  <header>
                    <Nav toggleMenu={toggleMenu} profileInfo={userProfile} devLinkId={serverData._id}/>
                  </header>
                  <main>
                 <div className="main-content">
                    <Mockup user={profile} items={itemsList} settings={globalSettings} />
                    <ProfileEditor user={userProfile}  devLinkId={serverData._id}  profile={profile} update={(data)=>setProfile(data)} />
                    
               </div>
               <SideMenu userProfile={userProfile} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} toggleMenu={toggleMenu} serverData={serverData}  updateUserData={(data) => setUserProfile((prevSettings) => ({ ...prevSettings, ...data }))}/>

             </main>
             </div>
                </div>
            
            </RequireAuth>
            )}>
     
            </Route>
 
            <Route
              path="/membership"
              element={(
                <RequireAuth loginPath={'/login'}>
                
                <div className="main-container">
                <div className='main-container-area'>
                  <header>
                    <Nav toggleMenu={()=>toggleMenu()} userInfo={profile} profileInfo={userProfile} devLinkId={serverData._id}/>
                  </header>
                  <main>
                 <div className="main-content">
                  <MemberShip profileInfo={userProfile} devLinkId={serverData._id} />
               </div>
              </main>
          
                </div>
                <SideMenu userProfile={userProfile} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} toggleMenu={toggleMenu} serverData={serverData}  updateUserData={(data) => setUserProfile((prevSettings) => ({ ...prevSettings, ...data }))}/>
                </div>
              
              </RequireAuth>
              )}
            />
                    {/*public routes */}
                    <Route 
                      path='/'
                      element={(
                        <div className="main-container">
                <div className='main-container-area'>
                  <header>
                    <Nav toggleMenu={()=>toggleMenu()} userInfo={profile} profileInfo={userProfile} devLinkId={serverData._id}/>
                  </header>
                  <main>
                 <div className="main-content">
                 <LandingPage />
                </div>
              </main>
          
                </div>
                <SideMenu userProfile={userProfile} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} toggleMenu={toggleMenu} serverData={serverData}  updateUserData={(data) => setUserProfile((prevSettings) => ({ ...prevSettings, ...data }))}/>
                </div>
                      )}
                    />
            <Route
              path={`/preview/:id`}
              element={(

              <Preview items={itemsList} profileInfo={profile}  settings={globalSettings} />
              )}
            />
          
        
            <Route
            path='/login'
            element={(
              <div className='main-container'>
              <Login />

              </div>
            )
            }/>
            
            <Route
            path='/signup'
            element={(
              <div className='main-container'>
              <Signup />

              </div>
            )
            }>
               
            </Route>
          </Routes>

        
    </div>
    
    <ToastContainer limit={3} />
    </React.Fragment>

    
  );
}

export default App;
