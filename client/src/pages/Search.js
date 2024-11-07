import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {values?.results.length < 1 ? "No products found" : `Found ${values.results.length} products`}
                    </h6>
                </div>
                <div className='d-flex flex-wrap mt-4'>
                    {values?.results.map((p) => (
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
        </Layout>
    )
}

export default Search