import React from 'react';
import { Link } from "react-router-dom";

import {centsToString} from "../utils/utils";

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
        <div className="product-card panel dark">
            <Link to={params.href}>
                <img src={params.image_url} alt='category' />
            </Link>

            <div>
                <Link to={params.href}>
                    <h2>{params.title}</h2>
                    <p>{params.subtitle}</p>
                </Link>

                <div id="price-and-buy">
                    <span>${centsToString(params.price)}</span>
                    {params.purchased ? (
                        <p>Purchased</p>
                    ) : (
                        <Link to={params.buy_href} className="button light">Buy</Link>
                    )}
                </div>
            </div>
        </div>
    )
}


export default ProductCard;