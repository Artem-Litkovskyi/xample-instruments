import React from 'react';
import { NavLink } from "react-router-dom";

import '../assets/styles/NavBar.css';


interface NavBarItem {
    name: string;
    href: string;
}


function NavBar(props: { navigation: NavBarItem[] }) {
    return (
        <nav>
            <ul>
                {props.navigation.map((item: NavBarItem) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.href}
                            className={({isActive}) => isActive ? "active" : undefined}
                        >
                            {item.name}
                            <span />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default NavBar;
