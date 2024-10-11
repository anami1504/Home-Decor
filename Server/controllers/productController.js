const productModel = require('../models/productModel')
const fs = require('fs')
const slugify = require('slugify')


//create product
const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.staus(500).send({ error: 'Name is required' });
            case !description:
                return res.staus(500).send({ error: 'Description is required' });
            case !price:
                return res.staus(500).send({ error: 'Price is required' });
            case !category:
                return res.staus(500).send({ error: 'Category is required' });
            case !quantity:
                return res.staus(500).send({ error: 'Quantity is required' });
            case photo && photo.size > 1000000:
                return res.staus(500).send({ error: 'Photo is required and should be less than 1mb' });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
    }
}

//get products
const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: 'All products',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error
        })
    }
}

//get single product
const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'Single product fetched',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error
        })
    }
}

//get photo
const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error while getting photo',
            error
        })
    }
}

//delete product
const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error
        })
    }
}

//update product
const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name:
                return res.staus(500).send({ error: 'Name is required' });
            case !description:
                return res.staus(500).send({ error: 'Description is required' });
            case !price:
                return res.staus(500).send({ error: 'Price is required' });
            case !category:
                return res.staus(500).send({ error: 'Category is required' });
            case !quantity:
                return res.staus(500).send({ error: 'Quantity is required' });
            case photo && photo.size > 1000000:
                return res.staus(500).send({ error: 'Photo is required and should be less than 1mb' });
        }

        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating product',
            error
        })
    }
}

const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) {
            args.category = checked;
        }
        if (radio.length) {
            args.price = { $gte: radio[0], $lte: radio[1] }
        }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error
        });
    }
}

module.exports = { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController };