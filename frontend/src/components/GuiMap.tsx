import type {PropsWithChildren} from "react";

import '../assets/styles/components/GuiMap.css';


interface GuiMapProps {
    image_url: string | undefined;
    onClick: () => void;
}


function GuiMap(props: PropsWithChildren<GuiMapProps>) {
    return (
        <div className='gui-map'>
            <img
                id='screenshot'
                 src={props.image_url}
                 alt='GUI screenshot'
                 onClick={props.onClick}
            />
            {props.children}
        </div>
    )
}


export default GuiMap;