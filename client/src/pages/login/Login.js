import React from 'react'
import { Link } from 'react-router-dom'
import login from './login.module.css'
import Layout from '../../components/Layout'

function Login() {
    return (

        <Layout>
            <div className={login.main_div}>
                <div className={login.sub_div}>
                    <h1 className={login.heading}>Login</h1>
                    <form>
                        <label className={login.label}>Email</label><br />
                        <input type='email' className={login.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={login.label}>Password</label><br />
                        <input type='password' className={login.text_box}></input>
                        <br />

                        <div className={login.links_div} >
                            <div className={login.link_div}>New user? <Link to='/signup' className={`${login.link} ${login.first_link}`}>Sign up</Link></div>
                            <Link to='/reset' className={login.link}>Forgot password</Link>
                        </div>

                        <Link to='/home'>
                            <button type='submit' className={login.button}>Login</button>
                        </Link>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Login