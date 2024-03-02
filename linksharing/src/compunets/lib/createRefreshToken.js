import { Axios } from '../../config/config';
import {createRefresh} from 'react-auth-kit';

export const refreshToken = createRefresh({
    interval: 10,
    refreshApiCallback: async (param) => {
      try {
        const response = await Axios.post("/api/refresh", param, {
          token: param.authToken,
        })
        console.log("Refreshing")
        return {
          isSuccess: true,
          newAuthToken: response.data.token,
          newAuthTokenExpireIn: 10,
          newRefreshTokenExpiresIn: 60
        }
      }
      catch(error){
        console.error(error)
        return {
          isSuccess: false
        } 
      }
    }
  })
  
