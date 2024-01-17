import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {
  const navigate = useNavigate();
  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    unsetUser();
    setUser({
      id: null,
      isAdmin: null,
    });
    
    navigate('/');  // Redirect back to home page after logout
  }, [navigate, unsetUser, setUser]);

  return null;  // No need for a return statement if there's no component to render
}
