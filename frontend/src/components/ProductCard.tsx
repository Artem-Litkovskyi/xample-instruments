import React from 'react';
import { Link } from "react-router-dom";

import '../assets/styles/ProductCard.css';


function ProductCard(params: {
    title: string,
    subtitle: string,
    price: number,
    href: string,
    buy_href: string,
    image_url: string
}) {
    return (
        <div className="product-card">
            <Link to={params.href}>
                <img src={params.image_url} alt='category' />
                <h2>{params.title}</h2>
                <p>{params.subtitle}</p>
                <div>
                    <span>${Math.floor(params.price/100)}.{("0" + String(params.price%100)).slice(-2)}</span>
                    <Link to={params.buy_href}>
                        <button>Buy</button>
                    </Link>
                </div>
            </Link>
        </div>
    )
}


export default ProductCard;