import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'


function CreateCategory() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')

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
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null);
                setUpdatedName('')
                setVisible(false)
                getAllCategories()
            }

        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    //delete category
    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`);
            if (data.success) {
                toast.success('Category is deleted')
                getAllCategories()
            }

        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout>
            <div className={admindash.dashboard_page}>
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
                                                    <button className='btn btn-primary m-1' onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c)
                                                    }
                                                    }>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                    }
                                </tbody>
                            </table>

                        </div>

                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCategory