import { useState } from 'react';
import { Link, useParams } from 'react-router';
import HeaderAndFooter from './HeaderAndFooter';
import AudioPlayer from '../components/AudioPlayer.tsx';
import { centsToString } from '../utils/utils';

import '../assets/styles/pages/ProductPage.css';
import GuiMap from '../components/GuiMap.tsx';
import GuiMapArea from '../components/GuiMapArea.tsx';


function ProductPage() {
    const params = useParams();

    const productInfo = {
        title: 'Liquid Plant',
        subtitle: 'Advanced Hybrid Synthesizer',
        price: 24900,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a erat dolor. Vivamus facilisis, mi eget tincidunt aliquet, ex eros feugiat lorem, sed porta tellus tortor id massa. Curabitur iaculis in diam ut lacinia. Vestibulum eget ornare felis, cursus lobortis nisi. Curabitur elementum arcu vel neque sodales, sit amet euismod massa mattis. Vivamus aliquet ipsum quam, venenatis congue eros efficitur non. Pellentesque ut ante eu augue consectetur fermentum. Duis nec justo odio.',
        audio: [
            {title: 'Demo 1', url: '/1.wav'},
        ],
        requirements: [
            'Macintosh: macOS 10.11 or later',
            'Windows: Windows 7 SP1 or later',
            'VST or AudioUnit compatible host',
        ],
        image_url: 'https://www.w3schools.com/html/workplace.jpg',
        gui_elements: [
            {
                title: 'GUI Element 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a erat dolor. Vivamus facilisis, mi eget tincidunt aliquet, ex eros feugiat lorem, sed porta tellus tortor id massa. Curabitur iaculis in diam ut lacinia. Vestibulum eget ornare felis, cursus lobortis nisi. Curabitur elementum arcu vel neque sodales, sit amet euismod massa mattis. Vivamus aliquet ipsum quam, venenatis congue eros efficitur non. Pellentesque ut ante eu augue consectetur fermentum. Duis nec justo odio.',
                coords: [8, 10, 60, 82]
            },
            {
                title: 'GUI Element 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a erat dolor. Vivamus facilisis, mi eget tincidunt aliquet, ex eros feugiat lorem, sed porta tellus tortor id massa. Curabitur iaculis in diam ut lacinia. Vestibulum eget ornare felis, cursus lobortis nisi. Curabitur elementum arcu vel neque sodales, sit amet euismod massa mattis. Vivamus aliquet ipsum quam, venenatis congue eros efficitur non. Pellentesque ut ante eu augue consectetur fermentum. Duis nec justo odio.',
                coords: [75, 70, 20, 20]
            }
        ],
    }
    
    const [activeGuiArea, setActiveGuiArea] = useState(-1);

    return (
        <HeaderAndFooter>
            <div className='content'>
                <div className='content-grid product'>
                    <div id='product-title-panel' className='panel light padded'>
                        <div>
                            <h1>{productInfo.title}</h1>
                            <p>{productInfo.subtitle}</p>
                        </div>
                        <Link className='button dark' to={`/buy/${params.id}`}>Buy Now ${centsToString(productInfo.price)}USD</Link>
                    </div>

                    <div id='about-panel' className='panel dark padded'>
                        <h2>About</h2>
                        <p>{productInfo.about}</p>

                        <h2>Audio Demos</h2>
                        {productInfo.audio.map((item, i) => (
                            <AudioPlayer src={item.url} title={item.title} key={i} />
                        ))}

                        <h2>System Requirements</h2>
                        <ul>
                            {productInfo.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div id='gui-panel' className='panel dark'>
                        <GuiMap
                            image_url={productInfo.image_url}
                            onClick={() => setActiveGuiArea(-1)}
                        >
                            {productInfo.gui_elements.map((item, i) => (
                                <GuiMapArea
                                    position_x={item.coords[0]}
                                    position_y={item.coords[1]}
                                    width={item.coords[2]}
                                    height={item.coords[3]}
                                    onClick={() => setActiveGuiArea(i)}
                                    key={i}
                                    active={activeGuiArea === i}
                                />
                            ))}
                        </GuiMap>

                        <div className='padded'>
                            {activeGuiArea >= 0 && (
                                <h2>{productInfo.gui_elements[activeGuiArea].title}</h2>
                            )}

                            {activeGuiArea < 0 ? (
                                <p>Click an image area to learn more</p>
                            ) : (
                                <p>{productInfo.gui_elements[activeGuiArea].description}</p>
                            )}
                        </div>
                    </div>

                    <div id='demo-panel' className='panel dark padded'>
                        <h2>Try it out!</h2>
                        <p>The {productInfo.title} demo is free but is limited to 20 minutes (per operation), and only includes minimal content. Saving is disabled in the demo.</p>
                        <button className='light'>Download demo</button>
                    </div>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductPage;