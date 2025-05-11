import React from 'react';
import '../assets/styles/CategoryCard.css';


function CategoryCard(params: { title: string, href: string, image_url: string }) {
    return (
        <div className="category-card">
            <a href={params.href}>
                <img src={params.image_url} alt='category image' />
                <p>{params.title}</p>
            </a>
        </div>
    )
}


export default CategoryCard;