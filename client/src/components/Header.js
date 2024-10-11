import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { GiHummingbird } from "react-icons/gi";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

function Header() {

    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successful")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to='/' className="navbar-brand" >
                            <span className='navbar-logo'>
                                <GiHummingbird style={{ paddingBottom: "6px", fontSize: "40px", marginRight: "-5px" }} />
                                <span className='navbar-logo-name'>Nest</span>
                            </span>
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' style={{ paddingRight: "2rem" }} className="nav-link" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/cat' style={{ paddingRight: "2rem" }} className="nav-link">
                                    Categories
                                </NavLink>
                            </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to='/login' style={{ paddingRight: "2rem" }} className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/signup' style={{ paddingRight: "2rem" }} className="nav-link">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                                ) : (
                                    <>
                                        {<li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                to=''
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{ paddingRight: "2rem" }}
                                            >
                                                Account
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item " to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}  >
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to='/login' onClick={handleLogout}  >
                                                        Logout
                                                    </Link>
                                                </li>

                                            </ul>
                                        </li>}



                                    </>
                                )
                            }

                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link">
                                    Cart(0)
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav >


        </>
    )
}

export default Header