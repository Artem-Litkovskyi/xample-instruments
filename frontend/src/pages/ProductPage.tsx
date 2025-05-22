import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import AudioPlayer from '../components/AudioPlayer.tsx';
import GuiMap from '../components/GuiMap.tsx';
import GuiMapArea from '../components/GuiMapArea.tsx';
import { centsToString } from '../utils/utils';
import { get_product } from '../services/ProductService';

import '../assets/styles/pages/ProductPage.css';


export interface ProductFullInfo {
    title: string;
    subtitle: string;
    description: string;
    sys_req: string;
    price: number;
    file: string; // URL
    file_demo: string; // URL
    screenshot: string; // URL
    audio_demos: AudioDemo[];
    screenshot_areas: ScreenshotArea[];
}

export interface AudioDemo {
    title: string;
    file: string; // URL
}

export interface ScreenshotArea {
    title: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
}


function ProductPage() {
    const params = useParams();

    const [product, setProduct] = useState<ProductFullInfo>();

    useEffect(() => {
        get_product(params.id)
            .then((data) => setProduct(data))
    }, []);
    
    const [activeGuiArea, setActiveGuiArea] = useState(-1);

    if (!product) {
        return (<p>Loading...</p>)  // TODO: loader
    }

    return (
        <HeaderAndFooter>
            <div className='content'>
                <div className='content-grid product'>
                    <div id='product-title-panel' className='panel light padded'>
                        <div>
                            <h1>{product.title}</h1>
                            <p>{product.subtitle}</p>
                        </div>
                        <Link className='button dark' to={`/buy/${params.id}`}>Buy Now ${centsToString(product.price)}USD</Link>
                    </div>

                    <div id='about-panel' className='panel dark padded'>
                        <h2>About</h2>
                        <p>{product.description}</p>

                        <h2>Audio Demos</h2>
                        {product.audio_demos.map((item, i) => (
                            <AudioPlayer src={item.file} title={item.title} key={i} />
                        ))}

                        <h2>System Requirements</h2>
                        <ul>
                            {product.sys_req.split('\r\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div id='gui-panel' className='panel dark'>
                        <GuiMap
                            image_url={product.screenshot}
                            onClick={() => setActiveGuiArea(-1)}
                        >
                            {product.screenshot_areas.map((item, i) => (
                                <GuiMapArea
                                    position_x={item.x}
                                    position_y={item.y}
                                    width={item.width}
                                    height={item.height}
                                    onClick={() => setActiveGuiArea(i)}
                                    key={i}
                                    active={activeGuiArea === i}
                                />
                            ))}
                        </GuiMap>

                        <div className='padded'>
                            {activeGuiArea >= 0 && (
                                <h2>{product.screenshot_areas[activeGuiArea].title}</h2>
                            )}

                            {activeGuiArea < 0 ? (
                                <p>Click an image area to learn more</p>
                            ) : (
                                <p>{product.screenshot_areas[activeGuiArea].description}</p>
                            )}
                        </div>
                    </div>

                    <div id='demo-panel' className='panel dark padded'>
                        <h2>Try it out!</h2>
                        <p>The {product.title} demo is free but is limited to 20 minutes (per operation), and only includes minimal content. Saving is disabled in the demo.</p>
                        <button className='light'>Download demo</button>
                    </div>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductPage;