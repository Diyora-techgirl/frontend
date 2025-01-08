import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">  
      <Header />
      <main className="flex-grow container mx-auto p-4"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
