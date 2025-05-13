import React from 'react';
import { Link } from "react-router-dom";

import '../assets/styles/NavBar.css';


function NavLink(props: { text: string, href: string, active?: boolean }) {
    return (
        <li>
            <Link to={props.href}>{props.text}</Link>
            <span className={props.active ? "active" : undefined}></span>
        </li>
    )
}


export default NavLink;
