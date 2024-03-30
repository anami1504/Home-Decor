import React from 'react'
import Layout from '../../components/Layout'
import user from './dashboard.module.css'


function UserDashboard() {
    return (
        <Layout>
            <div style={{ paddingTop: "9vh" }} className={user.container}>

                <div className={user.div1}>

                </div>
                <div className={user.div2}></div>
                <div className={user.div3}></div>

            </div>

        </Layout>

    )
}

export default UserDashboard