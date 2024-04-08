import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'

function Users() {
    return (
        <Layout>
            <div className={admindash.dashboard_page} style={{ paddingTop: "9vh" }}>
                <div className={admindash.dashboard}>
                    <div className={admindash.dashboard_menu}>
                        <AdminMenu />
                    </div>
                    <div>
                        <h2>Users</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users