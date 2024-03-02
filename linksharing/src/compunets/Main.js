import Mockup from "./Mockup";
import Cosumize from "../utilities/EditorLinks/Cosumize";
import ProfileEditor from "../utilities/EditorProfile/ProfileEditor";
import { useState } from "react";
import './Main.css'

function Main(profile,links,setProfile,setLinks) {


    return (
       <>
         <main>
            <div className="main-content">
                <Mockup user={profile} links={links} />
                <ProfileEditor profile={profile} update={(data)=>setProfile(data)} />
            </div>
         </main>
       </>
    );
  }
  
  export default Main;