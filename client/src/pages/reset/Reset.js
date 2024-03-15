import React from 'react'
import { Link } from 'react-router-dom'
import reset from './reset.module.css'
import Layout from '../../components/Layout'

function Reset() {
    return (
        <Layout>
            <div className={reset.main_div}>
                <div className={reset.sub_dov}>
                    <h1 className={reset.heading}>Reset password</h1>
                    <form>
                        <label className={reset.label}>New password</label><br />
                        <input type='email' className={reset.text_box} style={{ marginBottom: "12px" }}></input>
                        <br />

                        <label className={reset.label}>Confirm password</label><br />
                        <input type='password' className={reset.text_box}></input>
                        <br />



                        <Link to='/login'>
                            <button type='submit' className={reset.button}>Reset password</button>
                        </Link>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Reset