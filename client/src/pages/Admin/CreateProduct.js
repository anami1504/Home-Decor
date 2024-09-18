import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select

function CreateProduct() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
    const navigate = useNavigate()

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

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            // productData.append("shipping", shipping)
            productData.append("category", category)

            const { data } = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)


            if (data?.success) {
                toast.error(data.message)
                console.log('going to else')
            }
            else {
                toast.success('Product created successfully')
                navigate('/dashboard/admin/products')
            }

        } catch (error) {
            console.log(error)
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
                    <div style={{ width: '600px' }}>
                        <h2>Create Product</h2>
                        <div>


                            <div className='mt-3'>
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='Product name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='mt-3'>
                                <textarea
                                    type='text'
                                    value={description}
                                    placeholder='Product description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='mt-3'>
                                <input
                                    type='number'
                                    value={price}
                                    placeholder='Product price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className='mt-3'>
                                <input
                                    type='number'
                                    value={quantity}
                                    placeholder='Product quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='mt-3'>
                                <Select bordered={false}
                                    placeholder='Select a category'
                                    size='large'
                                    showSearch
                                    className='form-select'
                                    onChange={(value) => { setCategory(value) }}>

                                    {categories.map(c => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}

                                </Select>
                            </div>

                            {/* <div className='mt-3'>
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping"
                                    size="large"
                                    showSearch
                                    className='form-select'
                                    onChange={(value) => { setShipping(value) }}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div> */}

                            <div className='mt-3' >
                                <label className='btn btn-outline-secondary ' style={{ width: '600px' }}>
                                    {photo ? photo.name : 'Upload photo'}
                                    <input
                                        type='file'
                                        name="photo"
                                        accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>

                            <div className='mt-3'>
                                {photo && (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='product'
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='mt-3 text-center'>
                                <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct