import { Link } from 'react-router';

import { centsToString } from '../utils/utils';

import '../assets/styles/components/Cards.css';


function ProductCard(params: {
    product_id: number;
    title: string,
    subtitle: string,
    price: number,
    image_url: string,
    purchased: boolean,
}) {
    return (
        <div className='card product panel dark'>
            <Link to={`/product/${params.product_id}`}>
                <div className='image-container'>
                    <img src={params.image_url} alt={params.title} />
                </div>
            </Link>

            <Link to={`/product/${params.product_id}`}>
                <div className='text-container'>
                    <h2>{params.title}</h2>
                    <p>{params.subtitle}</p>
                </div>
            </Link>

            <div id='price-and-buy'>
                <span>${centsToString(params.price)}</span>
                {params.purchased ? (
                    <p>Purchased</p>
                ) : (
                    <Link to={`/buy_product/${params.product_id}`} className='button light'>Buy</Link>
                )}
            </div>
        </div>
    )
}


export default ProductCard;