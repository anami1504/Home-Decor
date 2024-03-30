import { React, useState } from 'react'
import reset from './reset.module.css'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';

function Forgot() {
    const [email, setEmail] = useState("")
    // const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotpassword`, { email });
            if (res && res.data.success) {
                toast.success(res.data.message)
                // setAuth({
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token
                // })
                // localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/forgotpassword')
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <div className={reset.main_div}>
                <div className={reset.sub_dov}>
                    <h1 className={reset.heading}>Forgot password</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={reset.label}>Email</label><br />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className={reset.text_box}
                            style={{ marginBottom: "12px" }}>

                        </input>
                        <br />

                        {/* <label className={reset.label}>Confirm password</label><br />
                        <input type='password' className={reset.text_box}></input>
                        <br /> */}




                        <button type='submit' className={reset.button}>Send Link</button>

                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Forgot