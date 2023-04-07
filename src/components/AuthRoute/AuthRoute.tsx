import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

interface Props {
  children: React.ReactNode;
}

export const AuthRoute: React.FC<Props> = ({ children }) => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const AuthCheck = onAuthStateChanged(auth, (user) => { 
    if (user) {
      setLoading(false);
    } else {
      console.log('unauthorized');
      navigate('/login');
    }
  });

  useEffect(() => {
    AuthCheck();
  }, [AuthCheck]);

  

  if (loading) return <p>loading ...</p>

  return <>{children}</>;
};