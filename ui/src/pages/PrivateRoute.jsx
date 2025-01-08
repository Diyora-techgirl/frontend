import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function PrivateRoute({ children }) {
  const {authState} = useAuth(); 

  if (!authState.token) {
   
    return <Navigate to="/login" replace />;
  }

  return children; 
}

export default PrivateRoute;
