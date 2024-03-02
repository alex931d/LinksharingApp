import { Axios } from "../../config/config";
import { toast } from "react-toastify";

export const updateProfile = (devLinkId,profile,file) =>{
const promise = new Promise(async (resolve,reject)=>{
    try {
      const formData = new FormData();
      formData.append('id', devLinkId);
      formData.append('profile', JSON.stringify(profile)); 
      if (file) {
      formData.append('profileBlob', file);
      }
      const response = await Axios.post('/api/updateProfile', formData,{      
          headers: {
            'Content-Type': 'multipart/form-data',
          }
      });
        if (response.status === 200) {
            resolve();
        } 
         else if (response.status === 500) {
            reject(new Error('bad request!'));
          }
          else {
            reject(new Error('Server error!'));
          }
    } catch (error) {
        reject(error);
    }
})
toast.promise(promise, {
    pending: 'updating links...',
    success: 'Successfully submitted!',
    error: (error) => `Error: ${error.message}`,
  });

  promise.then(() => {

  });
}