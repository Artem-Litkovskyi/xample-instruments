import React from 'react';
import { Link } from "react-router-dom";

import '../assets/styles/ProductCard.css';


function ProductCard(params: {
    title: string,
    subtitle: string,
    price: number,
    href: string,
    buy_href: string,
    image_url: string,
    purchased: boolean,
}) {
    return (
        <Link to={params.href}>
            <div className="product-card panel dark">
                <img src={params.image_url} alt='category' />
                <div>
                    <h2>{params.title}</h2>
                    <p>{params.subtitle}</p>
                    <div id="price-and-buy">
                        <span>${Math.floor(params.price/100)}.{("0" + String(params.price%100)).slice(-2)}</span>
                        {params.purchased ? (
                            <p>Purchased</p>
                        ) : (
                            <Link to={params.buy_href} className="button light">Buy</Link>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}


export default ProductCard;