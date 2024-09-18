import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import admindash from './admindashboard.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Products() {
    const [products, setProducts] = useState([])

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout >
            <div className={admindash.dashboard_page}>
                <div className={admindash.dashboard}>
                    <div className={admindash.dashboard_menu}>
                        <AdminMenu />
                    </div>
                    <div>
                        <h1>products</h1>

                        <div className='products'>
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className={admindash.product_link}>

                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-card-image" alt="photo" />
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{p.name}</h5>
                                            <p className="card-text text-center">
                                                {p.description}
                                            </p>

                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Products