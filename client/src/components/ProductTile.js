import React from 'react'
import producttile from './producttile.module.css'

function ProductTile({ image, title }) {
    return (
        <div className={producttile.container}>
            <img src={image} alt='product-img' className={producttile.image}></img>
            <div className={producttile.title}>{title}</div>
            <button className={producttile.btn}>Add to cart</button>
        </div>
    )
}

export default ProductTile