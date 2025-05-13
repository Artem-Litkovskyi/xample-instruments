import React from 'react';

import NavBar from './NavBar';

import '../assets/styles/HeaderProducts.css';


function HeaderProducts() {
    return (
        <div className="header-products">
            <NavBar
                navigation={[
                    {name: "All plug-ins", href: "/products/all"},
                    {name: "Instruments", href: "/products/instruments"},
                    {name: "Audio effects", href: "/products/effects"},
                ]}
            />
        </div>
    )
}


export default HeaderProducts;
