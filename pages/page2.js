import React from 'react'
import Link from 'next/link'
import Layout from '../components/structure/Layout'
import PageList from '../components/PagesList';

function page2() {
    return <Layout>
        <div>
            <h1>Hello from Page 2</h1>
            <Link href="/">
                <a>Home</a>
            </Link>
            <PageList />
        </div>  
    </Layout>;
}

export default page2
