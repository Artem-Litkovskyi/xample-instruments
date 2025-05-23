import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import AudioPlayer from '../components/AudioPlayer.tsx';
import GuiMap from '../components/GuiMap.tsx';
import GuiMapArea from '../components/GuiMapArea.tsx';
import LoaderContainer from '../components/LoaderContainer.tsx';

import { download_product_demo, download_product, get_product, type ProductFullInfo } from '../services/ProductService';
import { centsToString } from '../utils/utils';

import '../assets/styles/pages/ProductPage.css';


function ProductPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState<ProductFullInfo>();
    const [loading, setLoading] = useState(true);
    const [activeGuiArea, setActiveGuiArea] = useState(-1);

    useEffect(() => {
        get_product(params.id)
            .then((data) => {
                setProduct(data);
            })
            .catch(() => {
                navigate('/404');
            })
            .finally(() => setLoading(false));
        return () => {setLoading(true)}
    }, []);

    async function handleDownloadDemo() {
        try {
            await download_product_demo(Number(params.id));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDownload() {
        try {
            await download_product(Number(params.id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <HeaderAndFooter>
            <div className='content'>
                <LoaderContainer loading={loading} hide>
                    <div className='content-grid product'>
                        <div id='product-title-panel' className='panel light padded'>
                            <div>
                                <h1>{product?.title}</h1>
                                <p>{product?.subtitle}</p>
                            </div>
                            {product?.purchased ? (
                                <button className='dark' onClick={handleDownload}>Download</button>
                            ) : (
                                <Link className='button dark' to={`/buy/${params.id}`}>
                                    Buy Now ${product ? centsToString(product?.price) : ''}USD
                                </Link>
                            )}
                        </div>

                        <div id='about-panel' className='panel dark padded'>
                            <h2>About</h2>
                            <p>{product?.description}</p>

                            <h2>Audio Demos</h2>
                            {product?.audio_demos.map((item, i) => (
                                <AudioPlayer src={item.file} title={item.title} key={i} />
                            ))}

                            <h2>System Requirements</h2>
                            <ul>
                                {product?.sys_req.split('\r\n').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div id='gui-panel' className='panel dark'>
                            <GuiMap
                                image_url={product?.screenshot}
                                onClick={() => setActiveGuiArea(-1)}
                            >
                                {product?.screenshot_areas.map((item, i) => (
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
                                    <h2>{product?.screenshot_areas[activeGuiArea].title}</h2>
                                )}

                                {activeGuiArea < 0 ? (
                                    <p>Click an image area to learn more</p>
                                ) : (
                                    <p>{product?.screenshot_areas[activeGuiArea].description}</p>
                                )}
                            </div>
                        </div>

                        <div id='demo-panel' className='panel dark padded'>
                            <h2>Try it out!</h2>
                            <p>The {product?.title} demo is free but is limited to 20 minutes (per operation), and only includes minimal content. Saving is disabled in the demo.</p>
                            <button className='light' onClick={handleDownloadDemo}>Download demo</button>
                        </div>
                    </div>
                </LoaderContainer>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductPage;