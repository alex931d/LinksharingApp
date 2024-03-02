import { useEffect } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';

const IsAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/editor/links');
      toast.warning('cannot enter login or signup page when logged in!');
    }
  }, [isAuthenticated, navigate]);
};

export default IsAuth;