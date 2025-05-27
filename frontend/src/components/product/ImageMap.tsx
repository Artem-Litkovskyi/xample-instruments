import type { PropsWithChildren } from 'react';

import '../../assets/styles/components/ImageMap.css';


interface ImageMapProps {
    image_url: string | undefined;
    alt: string;
    onClick: () => void;
}


function ImageMap(props: PropsWithChildren<ImageMapProps>) {
    return (
        <div className='image-map'>
            <img src={props.image_url} alt={props.alt} onClick={props.onClick} />
            {props.children}
        </div>
    )
}


export default ImageMap;