import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import HeaderAndFooter from '../components/header/HeaderAndFooter.tsx';
import AudioPlayer from '../components/product/AudioPlayer.tsx';
import ImageMap from '../components/product/ImageMap.tsx';
import ImageMapArea from '../components/product/ImageMapArea.tsx';
import LoaderContainer from '../components/LoaderContainer.tsx';

import { downloadProductDemo, downloadProductFull, getProduct, type ProductFullInfo } from '../services/ProductService';
import { centsToString } from '../utils/utils';

import '../assets/styles/pages/ProductPage.css';


function ProductPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState<ProductFullInfo>();
    const [loading, setLoading] = useState(true);
    const [activeGuiArea, setActiveGuiArea] = useState(-1);

    useEffect(() => {
        getProduct(params.id)
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
            await downloadProductDemo(Number(params.id));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDownload() {
        try {
            await downloadProductFull(Number(params.id));
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
                                <button className='yellow' onClick={handleDownload}>Download</button>
                            ) : (
                                <Link className='button green' to={`/buy_product/${params.id}`}>
                                    Buy Now ${product ? centsToString(product?.price) : ''}USD
                                </Link>
                            )}
                        </div>

                        <div id='about-panel' className='panel dark padded'>
                            <h2>About</h2>
                            <p>{product?.description}</p>

                            <h2>Audio Demos</h2>
                            {product?.audio_demos.map((item, i) => (
                                <AudioPlayer src={item.file_url} title={item.title} key={i} />
                            ))}

                            <h2>System Requirements</h2>
                            <ul>
                                {product?.sys_req.split('\r\n').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div id='gui-panel' className='panel dark'>
                            <div className='gui-panel-image'>
                                <ImageMap
                                    image_url={product?.screenshot_url}
                                    alt='screenshot'
                                    onClick={() => setActiveGuiArea(-1)}
                                >
                                    {product?.screenshot_areas.map((item, i) => (
                                        <ImageMapArea
                                            position_x={item.x}
                                            position_y={item.y}
                                            width={item.width}
                                            height={item.height}
                                            onClick={() => setActiveGuiArea(i)}
                                            key={i}
                                            active={activeGuiArea === i}
                                        />
                                    ))}
                                </ImageMap>
                            </div>

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
                            <button className='blue' onClick={handleDownloadDemo}>Download demo</button>
                        </div>
                    </div>
                </LoaderContainer>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductPage;