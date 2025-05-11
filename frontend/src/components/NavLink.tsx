import React from 'react';
import '../assets/styles/NavBar.css';


function NavLink(props: { text: string, href: string, active?: boolean }) {
    return (
        <li>
            <a href={props.href}>{props.text}</a>
            <span className={props.active ? "active" : undefined}></span>
        </li>
    )
}


export default NavLink;
