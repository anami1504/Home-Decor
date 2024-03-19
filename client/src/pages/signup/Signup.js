import { React, useState } from 'react'
import signup from "./signup.module.css"
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Signin() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone });
            if (res && res.data.success) {

                toast.success(res.data.message)

                navigate("/login")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

        console.log(name, email, phone, password)
    }

    return (

        <Layout>
            <div className={signup.main_div}>
                <div className={signup.sub_div}>
                    <h1 className={signup.heading}>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label className={signup.label}>Name</label><br />
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className={signup.text_box}
                            style={{ marginBottom: "12px" }}
                            required>

                        </input>
                        <br />

                        <label className={signup.label}>Email</label><br />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className={signup.text_box}
                            style={{ marginBottom: "12px" }}
                            required>
                        </input>
                        <br />

                        <label className={signup.label}>Phone</label><br />
                        <input
                            type='phone'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            className={signup.text_box}
                            style={{ marginBottom: "12px" }}
                            required>
                        </input>
                        <br />

                        <label className={signup.label}>Password</label><br />
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className={signup.text_box}
                            style={{ marginBottom: "12px" }} required>
                        </input>
                        <br />


                        <div className={signup.links_div} >
                            <div className={signup.link_text}>Already a member ?<Link to='/login' className={signup.link}> Login </Link></div>

                        </div>
                        <button type='submit' className={signup.button}>Sign up</button>


                    </form>
                </div>

            </div>

        </Layout>
    );
}

export default Signin