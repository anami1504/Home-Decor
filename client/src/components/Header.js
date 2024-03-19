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
                                <NavLink to='/' style={{ paddingRight: "1rem" }} className="nav-link" >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/cat' style={{ paddingRight: "1rem" }} className="nav-link">
                                    Categories
                                </NavLink>
                            </li>

                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to='/login' style={{ paddingRight: "1rem" }} className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/signup' style={{ paddingRight: "1rem" }} className="nav-link">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to='/login' onClick={handleLogout} style={{ paddingRight: "1rem" }} className="nav-link">
                                                Logout
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }

                            <li className="nav-item">
                                <NavLink to='/cart' className="nav-link">
                                    Cart(0)
                                </NavLink>
                            </li>

                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form> */}
                    </div>
                </div>
            </nav >


        </>
    )
}

export default Header