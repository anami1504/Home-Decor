import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Forgot from './pages/reset/Forgot';
import Reset from './pages/reset/Reset';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import UserDashboard from './pages/Dashboard/UserDashboard';


function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/userdash' element={<UserDashboard />}></Route>
        <Route path='/forgotpassword' element={<Forgot />}></Route>
        <Route path='/resetpassword/:id/:token' element={<Reset />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>

      </Routes>
    </div >
  );
}

export default App;
