import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import login from './login.module.css'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/')
            }
            else {
                toast.error(res.data.message)
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (

        <Layout>
            <div className={login.main_div}>
                <div className={login.sub_div}>
                    <h1 className={login.heading}>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={login.label}>Email</label><br />
                        <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className={login.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={login.label}>Password</label><br />
                        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className={login.text_box}></input>
                        <br />

                        <div className={login.links_div} >
                            <div className={login.link_div}>New user? <Link to='/signup' className={`${login.link} ${login.first_link}`}>Sign up</Link></div>
                            <Link to='/forgotpassword' className={login.link}>Forgot password</Link>
                        </div>


                        <button type='submit' className={login.button}>Login</button>

                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Login