import { React, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import user from './dashboard.module.css'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import UpdateUser from './UpdateUser'
// import update from './dashboard.module.css'


function UserDashboard() {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        // const { name, email, phone } = auth?.user;
        setName(auth?.user?.name)
        setEmail(auth?.user?.email)
        setPhone(auth?.user?.phone)
        // setName(name)
        // setEmail(email)
        // setPhone(phone)

    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/userdashboard`, { name, email, phone });

            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated Successfully")

            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

        console.log(name, email, phone)
    }

    return (
        <Layout>
            <div style={{ paddingTop: "9vh" }} className={user.container}>

                <div className={user.div1}>

                </div>
                <div className={user.div2}>
                    <div className={user.details_container}>
                        <h3 className={user.heading}>Hello {auth?.user?.name}!</h3>
                        <div className={user.details}>Name : {auth?.user?.name}</div>
                        <div className={user.details}>Email : {auth?.user?.email}</div>
                        <div className={user.details}>Phone : {auth?.user?.phone}</div>
                    </div>
                </div>



                <div className={user.div3}>
                    {/* <UpdateUser /> */}
                    <div className={user.main_div}>
                        <div className={user.sub_div}>
                            <h3 className={user.heading}>Edit Profile</h3>

                            <form onSubmit={handleSubmit}>
                                <label className={user.label}>Name</label><br />
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    className={user.text_box}
                                    style={{ marginBottom: "12px" }}
                                >

                                </input>
                                <br />

                                <label className={user.label}>Email</label><br />
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className={user.text_box}
                                    style={{ marginBottom: "12px" }}

                                >
                                </input>
                                <br />

                                <label className={user.label}>Phone</label><br />
                                <input
                                    type='phone'
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                    className={user.text_box}
                                    style={{ marginBottom: "12px" }}
                                >
                                </input>
                                <br />



                                <button type='submit' className={user.button}>Update</button>


                            </form>
                        </div>

                    </div>
                </div>

            </div>

        </Layout>

    )
}

export default UserDashboard