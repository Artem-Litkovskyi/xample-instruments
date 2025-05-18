import {Link} from 'react-router';

import NavBar from './NavBar';
import AccountWidget from './AccountWidget';
import logo from '../assets/react.svg';

import '../assets/styles/components/Header.css';


function Header() {
    return (
        <div className='header'>
            <div className='logo-container'>
                <Link to='/'> <img src={logo} alt='logo' /> </Link>
            </div>

            <NavBar
                navigation={[
                    {name: 'Home', href: '/'},
                    {name: 'Products', href: '/products'},
                    {name: 'Support', href: '/support'},
                ]}
            />

            <AccountWidget loggedIn={true} />
        </div>
    )
}

export default Header;
