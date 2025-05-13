import React from 'react';
import {Link} from "react-router-dom";

import NavLink from './NavLink';
import AccountWidget from './AccountWidget';
import logo from '../assets/vector/logo.svg';

import '../assets/styles/Header.css';


function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/"> <img src={logo} alt="logo" /> </Link>
            </div>

            <nav>
                <ul>
                    <NavLink text="Home" href="/" active/>
                    <NavLink text="Products" href="/products"/>
                    <NavLink text="Support" href="/support"/>
                </ul>
            </nav>

            <AccountWidget />
        </div>
    )
}

export default Header;
