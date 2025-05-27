import {useEffect, useState} from 'react';

import HeaderAndFooter from './HeaderAndFooter';
import LoaderContainer from '../components/LoaderContainer.tsx';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import { type HomePageInfo, get_home_page } from '../services/HomePageService.ts';


function HomePage() {
    const [homePage, setHomePage] = useState<HomePageInfo>({
        hero_title: '',
        hero_subtitle: '',
        hero_link: '',
        hero_image_url: '',  // URL
        category_instruments_image_url: '',  // URL
        category_effects_image_url: '',  // URL
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get_home_page()
            .then((data) => setHomePage(data))
            .finally(() => setLoading(false));
        return () => {setLoading(true)}
    }, []);

    return (
        <HeaderAndFooter>
            <LoaderContainer loading={loading}>
                <Hero
                    title={homePage.hero_title}
                    subtitle={homePage.hero_subtitle}
                    href={homePage.hero_link}
                    image_url={homePage.hero_image_url}
                />

                <div className='content'>
                    <div className='content-grid small'>
                        <CategoryCard
                            title='Discover instruments'
                            href='/products/instrument'
                            image_url={homePage.category_instruments_image_url}
                            alt='instruments'
                        />
                        <CategoryCard
                            title='Discover audio effects'
                            href='/products/effect'
                            image_url={homePage.category_effects_image_url}
                            alt='effects'
                        />
                    </div>
                </div>
            </LoaderContainer>
        </HeaderAndFooter>
    )
}


export default HomePage;