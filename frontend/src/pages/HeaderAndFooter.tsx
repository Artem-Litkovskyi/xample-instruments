import { type PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router';

import Header from '../components/Header';
import Footer from '../components/Footer';


interface HeaderAndFooterProps {
    additionalHeader?: any;
}


function HeaderAndFooter(props: PropsWithChildren<HeaderAndFooterProps>) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            <div className='dock-top'>
                <Header />
                {props.additionalHeader}
            </div>

            {props.children}

            <Footer />
        </div>
    )
}


export default HeaderAndFooter;