import React from 'react'
import Layout from '../../components/Layout'
import image1 from '../../images/Lamp.webp'
import image2 from '../../images/livingrooms.jpg'
import home from './home.module.css'
import ProductTile from '../../components/ProductTile'

// import { useAuth } from '../../context/auth'

function Home() {
    // const [auth, setAuth] = useAuth()

    const products = [
        {
            id: 1,
            image: image2,
            title: "White Sofa Set"
        },
        {
            id: 2,
            image: image1,
            title: "Glass Dinner Set"
        },
        {
            id: 3,
            image: image2,
            title: "Bedroom Set in grey theme"
        },
        {
            id: 4,
            image: image1,
            title: "Bronze hanging light"
        },
        {
            id: 5,
            image: image1,
            title: "White aesthetic Sofa Set"
        },
        {
            id: 6,
            image: image2,
            title: "Sofa Set"
        },
        {
            id: 7,
            image: image1,
            title: "Sofa Set for living room"
        },
    ]

    return (
        <div>
            <Layout>

                {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}


                <div className={home.first_div}>
                    <h1 className={home.heading}>We make your Home Elegant</h1>
                    <button className={home.first_btn}>Explore</button>
                </div>

                <div className={home.row}>
                    {
                        products.map(product => {
                            return (
                                <ProductTile key={product.id} image={product.image} title={product.title} />
                            )
                        })
                    }


                </div>

                {/* 
                <div
                    id="carouselExampleInterval"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval={100000}>
                            <h1 className={home.heading}>We make your Home Elegant</h1>
                            <img src={image1} className="d-block w-100" alt="..." />

                        </div>
                        <div className="carousel-item" data-bs-interval={2000}>
                            <h1 className={home.heading}>hlo</h1>
                            <img src={image2} className="d-block w-100" alt="..." />

                        </div>
                        <div className="carousel-item">
                            <h1 className={home.heading}>ehatt</h1>
                            <img src={image1} className="d-block w-100" alt="..." />

                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div> */}


            </Layout>

        </div>
    )

}

export default Home