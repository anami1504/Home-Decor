import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import { useAuth } from '../../context/auth'
function AdminDashboard() {
    const [auth] = useAuth()
    return (
        <Layout>
            <div className={admindash.dashboard_page} style={{ paddingTop: "9vh" }}>
                <div className={admindash.dashboard}>
                    <div className={admindash.dashboard_menu}>
                        <AdminMenu />
                    </div>
                    <div className={admindash.dashboard_content}>
                        <div>
                            <h3>Hello {auth?.user?.name}!</h3>
                            <div className={admindash.details}>Name : {auth?.user?.name}</div>
                            <div className={admindash.details}>Email : {auth?.user?.email}</div>
                            <div className={admindash.details}>Phone number :{auth?.user?.phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard