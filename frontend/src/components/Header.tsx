import React from 'react';
import {Link} from "react-router-dom";

import NavBar from './NavBar';
import AccountWidget from './AccountWidget';
import logo from '../assets/vector/logo.svg';

import '../assets/styles/Header.css';


function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <Link to="/"> <img src={logo} alt="logo" /> </Link>
            </div>

            <NavBar
                navigation={[
                    {name: "Home", href: "/"},
                    {name: "Products", href: "/products"},
                    {name: "Support", href: "/support"},
                ]}
            />

            <AccountWidget />
        </div>
    )
}

export default Header;
