import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'

function CreateProduct() {
    return (
        <Layout>
            <div className={admindash.dashboard_page} style={{ paddingTop: "9vh" }}>
                <div className={admindash.dashboard}>
                    <div className={admindash.dashboard_menu}>
                        <AdminMenu />
                    </div>
                    <div>
                        <h2>Create Product</h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct