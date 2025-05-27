import NavBar, { type NavBarItem } from './NavBar.tsx';

import '../../assets/styles/components/HeaderAdditional.css';


function HeaderAdditional(props: { navigation: NavBarItem[] }) {
    return (
        <div className='header-additional'>
            <NavBar navigation={props.navigation} />
        </div>
    )
}


export default HeaderAdditional;