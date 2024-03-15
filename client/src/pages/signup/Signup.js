import React from 'react'
import signup from "./signup.module.css"
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout';


function Signin() {
    return (

        <Layout>
            <div className={signup.main_div}>
                <div className={signup.sub_div}>
                    <h1 className={signup.heading}>Sign Up</h1>
                    <form>
                        <label className={signup.label}>Name</label><br />
                        <input type='text' className={signup.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={signup.label}>Email</label><br />
                        <input type='email' className={signup.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={signup.label}>Phone</label><br />
                        <input type='phone' className={signup.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={signup.label}>Password</label><br />
                        <input type='password' className={signup.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />


                        <div className={signup.links_div} >
                            <div className={signup.link_text}>Already a member ?<Link to='/login' className={signup.link}> Login </Link></div>

                        </div>
                        <Link to='/login'> <button type='submit' className={signup.button}>Sign up</button></Link>


                    </form>
                </div>

            </div>

        </Layout>
    );
}

export default Signin