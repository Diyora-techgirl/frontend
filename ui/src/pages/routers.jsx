import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Home from './Home/Home.jsx';
import Category from './Category.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import { AuthProvider } from '../context/AuthContext.jsx';
import AuthLayout from '../components/AuthLayout.jsx';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider> <App /> </AuthProvider>,
    children: [
      {
        path: 'home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: 'category',
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
      {
        path: 'about',
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
    ],
  },
  
  {
    path: '/',
    element: <AuthProvider> <AuthLayout/> </AuthProvider>, 
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
