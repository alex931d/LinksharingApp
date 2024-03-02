import { Cropper,CircleStencil, CropperRef,Coordinates  } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import '../compunets/ImgEditor.css';
import { useEffect, useState,useRef } from 'react';
function ImgEditor({file,profile,isOpen,onClose,update}){
    const cropperRef = useRef(null);
    const [coordinates, setCoordinates] = useState(null); 
    const handleProfileChange = (key,data) =>{
      const updatedProfile = {
          ...profile,
          [key]: data,
        };
        update(updatedProfile);
    }
    const onCrop = () => {       
      if (cropperRef.current) {          
          const canvas = cropperRef.current.getCanvas();
          const coordinates = cropperRef.current.getCoordinates();
          
          canvas.toBlob(async (blob) => {
              if (blob) {
    
                  setCoordinates(coordinates);
                  handleProfileChange('profile_picture',URL.createObjectURL(blob));
                  handleProfileChange('profileBlob', blob);
                  onClose();
              }
          });
      }  
  };
       if (!isOpen) {
        return null;
      }
    console.log(file)
    return(
        
         <div className="overlay">
          <div className="modal">
          <div className='modal-menu'>
          <button className='btn' onClick={onCrop}>save image</button>
          </div>
          <Cropper        
             stencilComponent={CircleStencil}
               ref={cropperRef}       
                src={file}
                 />
          </div>
        </div>
    )
}
export default ImgEditor;

