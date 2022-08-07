
import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import SignUP from './components/Register/SignUP';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Notfound from './components/Notfound/Notfound';


function App() {
  return (
    <>
    <Navbar/>
    <div className=' container'>
      <Routes>
    <Route path='/' element={<SignUP/>}/>
    <Route path='signup' element={<SignUP/>}/>
    <Route path='signin' element={<Login/>}/>
    <Route path ='home' element={<Home/>}/>
    <Route path='*' element={<Notfound/>}/>
    </Routes>
   
    </div>
    </>
  );
}

export default App;
