import { Divider,Carousel } from 'antd';
import editIcon from './icons/editable.svg';
 import saveIcon from './icons/save.svg';
 import shareIcon from './icons/share.svg';
 import speedIcon from './icons/speed.svg';
 import heroImage from './icons/image.PNG';
 import heroImage2 from './icons/image2.PNG';
 import './LandingPage.css';
import BenefitCard from './compunets/BenefitCard';
function LandingPage({}){


    return (
        <>
            <div className="landing-page-container center">
                <div className="hero-section">
                    <div className="hero-section-first">
                         <h1 className='bold'>
                         🚀Elevate Your Developer Profile with DevLink
                         </h1>
                         <p>
                         Effortlessly share and edit your developer profile with DevLink. Streamline the sharing process and make quick edits to keep your information up-to-date. Maximize efficiency and let your developer journey shine.
                         </p>
                                                 <button className="btn">get started</button>
                    </div>
                    <div className="hero-section-secound">
                            <img src={heroImage} alt="" />
                    </div>
                </div>
                <main>
                     <div className="main-body">
                         <span className="l-large-text">
                           join hundress of other users creating amazing devlinks
                         </span>
                         <Divider />
                         <span className="l-large-text bold">
                             like seriously, it's this easy
                         </span>
                         <div className="video-section">
                         <Carousel autoplay>
                         <div>
                              <img src={heroImage} alt="" />
                         </div>
                          <div>
                          <img src={heroImage2} alt="" />
                        </div>
                        </Carousel>
                         </div>
                         <div className="paragraph-container">
                            <span className="l-large-text bold">
                            ✨ Effortless Setup
                            </span>
                
                            <p>

Creating your personalized DevLink is a breeze! In just a few clicks, you can showcase your GitHub, LinkedIn, and other platform profiles, making it easy for others to discover your work.
                            </p>
                         </div>
                         <Divider />
                           <h2>🚀 Why Choose DevLink?</h2>
                      
                           <div className='benefits-container'>
                                <BenefitCard img={editIcon} title='🛠️ Edit Your Links Easily' paragraph='DevLink puts you in control. Easily edit and manage your linked profiles, keeping your audience up-to-date with your latest projects and achievements.' />
                                <BenefitCard img={shareIcon} title='🌟 Share Your DevLink' paragraph='Share your unique DevLink with the world! With just one link, you can effortlessly direct others to your personalized developer profile, showcasing your skills across multiple platforms.' />
                                <BenefitCard img={saveIcon} title='⏱️ Time-Saving Solution' paragraph='Let DevLink save you time! No need to update multiple links whenever your profiles change. Simply edit your DevLink, and all your connected platforms will be automatically updated.' />
                                <BenefitCard img={speedIcon} title='⚡ Lightning-Fast Setup' paragraph='Say goodbye to time-consuming setup processes! With DevLink, you can create your personalized developer profile in a matter of seconds. Simply input your information, connect your platforms, and youre ready to go.' />

                           </div>
                     </div>
                </main>
            </div>
        </>
    )
}
export default LandingPage;