import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select

function UpdateProduct() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
    const [id, setId] = useState('')

    const navigate = useNavigate()
    const params = useParams()

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

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            // productData.append("shipping", shipping)
            productData.append("category", category)

            const { data } = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)


            if (data?.success) {
                toast.error(data.message)
                console.log('going to else')
            }
            else {
                toast.success('Product updated successfully')
                navigate('/dashboard/admin/products')
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    //get single product
    const getSingleProduct = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
            setId(data.product._id)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleProduct()
        //eslint-disable-next-line
    }, [])

    //delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are you sure you want to delete this product? (Enter yes or no)')

            if (answer === 'yes' || answer === 'YES') {
                const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
                toast.success('Product deleted successfully')
                navigate('/dashboard/admin/products')
            }
            else if (answer === 'no' || answer === 'NO') {
                return;
            }
            else if (!answer) {
                return
            }
            else {
                toast.error('Enter yes or no')
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
                        <h2>Update Product</h2>
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
                                    onChange={(value) => { setCategory(value) }}
                                    value={category}
                                >

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
                                    value={shipping ? 'Yes' : 'No'}
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
                                {photo ? (
                                    <div className='text-center'>
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt='product'
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>

                                ) : (
                                    <div className='text-center'>
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                            alt='product'
                                            height={'200px'}
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='mt-3 text-center'>
                                <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>

                            </div>
                            <div className='mt-3 text-center'>

                                <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct