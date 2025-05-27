import type { PropsWithChildren } from 'react';

import { BiLoaderAlt } from 'react-icons/bi';

import '../assets/styles/components/LoaderContainer.css';


interface LoaderContainer {
    loading: boolean;
    hide?: boolean;
}


function LoaderContainer(props: PropsWithChildren<LoaderContainer>) {
    if (props.loading) {
        return (
            <div className='loader'>
                {props.hide ? (<p></p>) : (<BiLoaderAlt className='spinner' />)}
            </div>
        )
    }

    return (
        <>{props.children}</>
    );
}


export default LoaderContainer;
