import React from 'react'
import Layout from '../../components/Layout'
import pnf from '../PageNotFound/pagenotfound.module.css'

function PageNotFound() {
    return (
        <div>
            <Layout>
                <div className={pnf.main}>
                    <h1>Page not found</h1>
                </div>

            </Layout>

        </div>
    )
}

export default PageNotFound