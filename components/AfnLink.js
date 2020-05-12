import React from 'react'
import { Link as ReactLink } from "react-router-dom";
import Link from 'next/link'

const isServer = typeof window === 'undefined';

const AfnLink = ({href, children}) => {
    if (isServer) console.log("Server link")
    return <>
        {isServer && <Link href={href}>
            <a>{children}</a>
        </Link>}
        {!isServer && <ReactLink to={href}>
            {children}
        </ReactLink>}
    </>
}

export default AfnLink
