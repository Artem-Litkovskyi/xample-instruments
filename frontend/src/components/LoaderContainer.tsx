import type {PropsWithChildren} from 'react';

import logo from '../assets/react.svg';

import '../assets/styles/components/LoaderContainer.css';


interface LoaderContainer {
    loading: boolean;
    hide?: boolean;
}


function LoaderContainer(props: PropsWithChildren<LoaderContainer>) {
    if (props.loading) {
        return (
            <div className='loader'>
                {props.hide ? (<p></p>) : (<img src={logo} alt='logo' />)}
            </div>
        )
    }

    return (
        <>{props.children}</>
    );
}


export default LoaderContainer;
