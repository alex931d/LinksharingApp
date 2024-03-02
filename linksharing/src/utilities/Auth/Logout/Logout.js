import { Axios } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSignOut } from 'react-auth-kit'

function Logout() {
  const navigate = useNavigate();
  const signOut = useSignOut()
  const logoutProfile = async () => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post('/api/logout', { method: 'POST' });
        if (response.status === 200) {
          resolve();
        } else if (response.status === 500) {
          resolve();
        }
        else {
          reject(new Error('Server error!'));
          navigate('/login');
        }
      } catch (error) {
        reject(error);
        navigate('/login');
      }
    });
    promise.then(() => {
      signOut();
      navigate('/login');
    })
  }
  useEffect(() => {
    logoutProfile();
  }, [])
  return (
    <>
      <p>logging out</p>
    </>
  )
}
export default Logout;