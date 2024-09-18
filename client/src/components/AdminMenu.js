import React from 'react'
import { Link } from 'react-router-dom'

function AdminMenu() {
    return (
        <div>
            <div className="list-group text-center">
                <Link to="/dashboard/admin" className="list-group-item list-group-item-action active" >
                    Admin
                </Link>

                <Link to='/dashboard/admin/users' className="list-group-item list-group-item-action">
                    Users
                </Link>
                <Link
                    to='/dashboard/admin/create-category'
                    className="list-group-item list-group-item-action "
                >
                    Create Category
                </Link>
                <Link to='/dashboard/admin/create-product' className="list-group-item list-group-item-action">
                    Create Product
                </Link>
                <Link to='/dashboard/admin/products' className="list-group-item list-group-item-action">
                    Products
                </Link>

            </div>

        </div>
    )
}

export default AdminMenu