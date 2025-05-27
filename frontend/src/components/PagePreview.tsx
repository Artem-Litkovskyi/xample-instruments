import { type PropsWithChildren } from 'react';

import '../assets/styles/components/PagePreview.css';


function PagePreview(props: PropsWithChildren) {
    return (
        <div className='page-preview'>
            <h2>Preview</h2>
            {props.children}
        </div>
    )
}


export default PagePreview;