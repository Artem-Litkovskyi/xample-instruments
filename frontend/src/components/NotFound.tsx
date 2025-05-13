import React from "react";

import NavLink from "./NavLink";

import '../assets/styles/NotFound.css';


function NotFound() {
    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <nav>
                <ul>
                    <NavLink text="Home" href="/"/>
                    <NavLink text="Products" href="/products"/>
                    <NavLink text="Support" href="/support"/>
                </ul>
            </nav>
        </div>
    )
}


export default NotFound;