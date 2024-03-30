import { React, useState } from 'react'
import reset from './reset.module.css'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function Reset() {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { id, token } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/resetpassword/${id}/${token}`, { password });
            if (res && res.data.success) {
                toast.success(res.data.message)
                // setAuth({
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token
                // })
                // localStorage.setItem('auth', JSON.stringify(res.data))
                navigate('/login')
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
                    <h1 className={reset.heading}>Reset password</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={reset.label}>New password</label><br />
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className={reset.text_box}
                            style={{ marginBottom: "12px" }}>

                        </input>
                        <br />






                        <button type='submit' className={reset.button}>Update password</button>

                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Reset