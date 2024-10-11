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
import UserDashboard from './pages/User/UserDashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Explore from './pages/Explore';


function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/explore' element={<Explore />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<UserDashboard />}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />}></Route>
          <Route path='admin/create-category' element={<CreateCategory />}></Route>
          <Route path='admin/create-product' element={<CreateProduct />}></Route>
          <Route path='admin/users' element={<Users />}></Route>
          <Route path='admin/products' element={<Products />}></Route>
          <Route path='admin/product/:slug' element={<UpdateProduct />}></Route>
        </Route>

        <Route path='/forgotpassword' element={<Forgot />}></Route>
        <Route path='/resetpassword/:id/:token' element={<Reset />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>

      </Routes>
    </div >
  );
}

export default App;
