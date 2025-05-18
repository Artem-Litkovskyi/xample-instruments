import { Link } from 'react-router';

import '../assets/styles/Hero.css';


function Hero(props: { title: string, subtitle: string, href: string, image_url: string }) {
    return (
        <div className='hero'>
            <img src={props.image_url} alt='hero' />
            <div>
                <h1>{props.title}</h1>
                <p>{props.subtitle}</p>
                <Link to={props.href} className='button dark'>Learn more</Link>
            </div>
        </div>
    )
}


export default Hero;