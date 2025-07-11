import NavBar from './header/NavBar.tsx';

import '../assets/styles/components/NotFound.css';


function NotFound() {
    return (
        <div className='not-found panel light'>
            <h1>404 Not Found</h1>
            <NavBar
                navigation={[
                    {name: 'Home', href: '/'},
                    {name: 'Products', href: '/products'},
                    {name: 'Support', href: '/support'},
                ]}
            />
        </div>
    )
}


export default NotFound;