import React from 'react';
import logo from '../assets/vector/logo.svg';
import NavLink from './NavLink';
import AccountWidget from './AccountWidget';
import '../assets/styles/Header.css';


function Header() {
    return (
        <div className="header">
            <div className="logo-container">
                <a href="/"> <img src={logo} className="logo" alt="logo" /> </a>
            </div>

            <ul className="nav-bar">
                <NavLink text="Home" href="/" active/>
                <NavLink text="Products" href="/products"/>
                <NavLink text="Support" href="/support"/>
            </ul>

            <AccountWidget />
        </div>
    )
}

export default Header;
