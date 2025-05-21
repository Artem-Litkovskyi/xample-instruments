import { Link } from 'react-router';

import {centsToString} from '../utils/utils';

import '../assets/styles/components/ProductCard.css';


function ProductCard(params: {
    product_id: number;
    title: string,
    subtitle: string,
    price: number,
    image_url: string,
    purchased: boolean,
}) {
    return (
        <div className='product-card panel dark'>
            <Link to={`/product/${params.product_id}`}>
                <img src={params.image_url} alt='category' />
            </Link>

            <Link to={`/product/${params.product_id}`}>
                <h2>{params.title}</h2>
                <p>{params.subtitle}</p>
            </Link>

            <div id='price-and-buy'>
                <span>${centsToString(params.price)}</span>
                {params.purchased ? (
                    <p>Purchased</p>
                ) : (
                    <Link to={`/buy/${params.product_id}`} className='button light'>Buy</Link>
                )}
            </div>
        </div>
    )
}


export default ProductCard;