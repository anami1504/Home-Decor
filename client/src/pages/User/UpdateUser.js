
import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import update from './dashboard.module.css'
import { useAuth } from '../../context/auth';

function UpdateUser() {
    const [auth, setAuth] = useAuth()


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const { name, email, phone } = auth?.user;
        setName(name)
        setEmail(email)
        setPhone(phone)
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, phone });
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

        console.log(name, email, phone)
    }

    return (
        <div>
            <div className={update.main_div}>
                <div className={update.sub_div}>
                    <h3 className={update.heading}>Edit Profile</h3>
                    <form onSubmit={handleSubmit}>
                        <label className={update.label}>Name</label><br />
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className={update.text_box}
                            style={{ marginBottom: "12px" }}
                            required>

                        </input>
                        <br />

                        <label className={update.label}>Email</label><br />
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className={update.text_box}
                            style={{ marginBottom: "12px" }}
                            required>
                        </input>
                        <br />

                        <label className={update.label}>Phone</label><br />
                        <input
                            type='phone'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            className={update.text_box}
                            style={{ marginBottom: "12px" }}
                            required>
                        </input>
                        <br />



                        <button type='submit' className={update.button}>Update</button>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateUser