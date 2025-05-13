import React from "react";

import NavBar from "./NavBar";

import '../assets/styles/NotFound.css';


function NotFound() {
    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <NavBar
                navigation={[
                    {name: "Home", href: "/"},
                    {name: "Products", href: "/products"},
                    {name: "Support", href: "/support"},
                ]}
            />
        </div>
    )
}


export default NotFound;