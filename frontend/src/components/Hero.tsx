import React from 'react';
import '../assets/styles/Hero.css';


function Hero(props: { title: string, subtitle: string, href: string, image_url: string }) {
    return (
        <div className="hero">
            <img src={props.image_url} alt="hero" />
            <div>
                <h1>{props.title}</h1>
                <p>{props.subtitle}</p>
                <button>Learn more</button>
            </div>
        </div>
    )
}


export default Hero;