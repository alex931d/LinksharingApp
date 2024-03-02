import smallIcon from '../images/logo-devlinks-small.svg';
const LoadingPromise = () =>{

    return(
        <>
         <div className="loading-container">
                <div className="loading-container-inner">
                       <div className="promise-container">
                            <span>loading</span>
                               <img alt="" src={smallIcon} className='spinner'></img>
                       </div>
                </div>
         </div>
        </>
    )
}
export default LoadingPromise;