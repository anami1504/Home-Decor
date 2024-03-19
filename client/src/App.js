import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Reset from './pages/reset/Reset';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/reset' element={<Reset />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>

      </Routes>
    </div >
  );
}

export default App;
