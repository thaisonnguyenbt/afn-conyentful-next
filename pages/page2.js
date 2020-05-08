import React from 'react'
import Link from 'next/link'


function page2() {
    return (
        <div>
            Hello from Page 2
            <br/>
            <Link href="/">
                <a>Home</a>
            </Link>
        </div>
        
    )
}

export default page2
