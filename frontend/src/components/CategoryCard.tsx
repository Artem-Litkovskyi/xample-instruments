import { Link } from 'react-router';

import '../assets/styles/components/Cards.css';


function CategoryCard(params: { title: string, href: string, image_url: string, alt: string }) {
    return (
        <div className='card category panel light'>
            <Link to={params.href}>
                <div className='image-container'>
                    <img src={params.image_url} alt={params.alt} />
                </div>
                <p>{params.title}</p>
            </Link>
        </div>
    )
}


export default CategoryCard;