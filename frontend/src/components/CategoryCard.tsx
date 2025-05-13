import React from 'react';
import { Link } from "react-router-dom";

import '../assets/styles/CategoryCard.css';


function CategoryCard(params: { title: string, href: string, image_url: string }) {
    return (
        <div className="category-card">
            <Link to={params.href}>
                <img src={params.image_url} alt='category' />
                <p>{params.title}</p>
            </Link>
        </div>
    )
}


export default CategoryCard;