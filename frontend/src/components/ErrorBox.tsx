import NavBar from './header/NavBar.tsx';

import '../assets/styles/components/ErrorBox.css';


function ErrorBox(props: { message?: string }) {
    return (
        <div className='error-box panel light'>
            <h1>{props.message ?? '404 Page Not Found'}</h1>
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


export default ErrorBox;