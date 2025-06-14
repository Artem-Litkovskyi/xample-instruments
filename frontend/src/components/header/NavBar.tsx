import { NavLink } from 'react-router';

import '../../assets/styles/components/NavBar.css';


interface NavBarItem {
    name: string;
    href: string;
}


function NavBar(props: { navigation: NavBarItem[] }) {
    return (
        <nav>
            <ul>
                {props.navigation.map((item: NavBarItem) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.href}
                            className={({isActive}) => isActive ? 'active' : undefined}
                        >
                            {item.name}
                            <span />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default NavBar;
export type {NavBarItem};
