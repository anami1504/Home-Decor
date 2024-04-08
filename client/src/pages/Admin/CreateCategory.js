import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'


function CreateCategory() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`Category ${name} is created`)
                getAllCategories()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <Layout>
            <div className={admindash.dashboard_page} style={{ paddingTop: "9vh" }}>
                <div className={admindash.dashboard}>
                    <div className={admindash.dashboard_menu}>
                        <AdminMenu />
                    </div>
                    <div style={{ width: '500px' }}>
                        <h2>Manage Category</h2>

                        <div style={{ margin: '40px 0' }}>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>

                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary m-1'>Edit</button>
                                                    <button className='btn btn-danger'>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCategory