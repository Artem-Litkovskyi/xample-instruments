import HeaderAndFooter from './HeaderAndFooter';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';


function HomePage() {
    return (
        <HeaderAndFooter>
            <Hero
                title='Very Long New Plugin Name'
                subtitle='A new plugin with a very long name'
                href='/product/0'
                image_url='/logo512.png'
            />

            <div className='content'>
                <div className='content-grid'>
                    <CategoryCard
                        title='Discover instruments'
                        href='/products/instruments'
                        image_url='logo512.png'
                    />
                    <CategoryCard
                        title='Discover audio effects'
                        href='/products/effects'
                        image_url='/logo512.png'
                    />
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default HomePage;