import React from 'react'


function Status({ code, children }) {
    return (
        <Route
            render={({ staticContext }) => {
                if (staticContext) staticContext.status = code;
                    return children;
            }}
        />
    );
}

const NotFound = () => {
    return (
        <div>
            Hello from 404
        </div>
    )
}

export default NotFound
