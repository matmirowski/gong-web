import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface JwtPayload {
  exp: number;
  role: string;
  userId: number;
}

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('Token:', token);

    if (token && token.split('.').length === 3) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        console.log('Decoded Token:', decoded);

        const isExpired: boolean = Date.now() >= decoded.exp * 1000;
        console.log('Is Token Expired:', isExpired);

        if (!isExpired) {
          setIsLoggedIn(true);
          setUserRole(decoded.role);
          setUserId(decoded.userId);
          setToken(token);
        } else {
          console.log('Token expired. Redirecting to login.');
          localStorage.removeItem('jwtToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('jwtToken');
        navigate('/login');
      }
    } else {
      console.log('No valid token found. Redirecting to login.');
      navigate('/login');
    }

    setLoading(false);
  }, [navigate]);

  return { isLoggedIn, userRole, userId, token, loading };
};

export default useAuth;
