import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'

const Explore = () => {
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    // filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    }

    // get products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProduct(data.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
    }, [checked, radio])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])

    // get category
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])



    // get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
            setProduct(data?.products)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Layout>
            <div className='row mt-3'>
                <div className='col-md-3 px-5'>
                    <h4 className='text-center'>Filter by category</h4>
                    <div className='d-flex flex-column'>
                        {
                            categories.map((c) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} >
                                    {c.name}
                                </Checkbox>
                            ))
                        }
                    </div>

                    <h4 className='text-center'>Filter by price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {
                                Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>
                                            {p.name}
                                        </Radio>
                                    </div>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <button
                            className='btn btn-danger'
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTER
                        </button>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All products</h1>
                    <p>Products</p>
                    <div className='d-flex flex-wrap'>
                        {product?.map((p) => (
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-card-image" alt="product" />
                                <div className="card-body">
                                    <h5 className="card-title ">{p.name}</h5>
                                    <p className="card-text ">
                                        {p.description}
                                    </p>
                                    <p className="card-text ">
                                        {p.price}
                                    </p>
                                    <button className='btn btn-primary mx-1'>More details</button>
                                    <button className='btn btn-secondary px-4'>Add to cart</button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Explore