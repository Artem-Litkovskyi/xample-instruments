import HeaderAndFooter from "./HeaderAndFooter";
import {centsToString} from "../utils/utils";


function ProductPage() {
    const productInfo = {
        title: 'Liquid Plant',
        subtitle: 'Advanced Hybrid Synthesizer',
        price: 24900,
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a erat dolor. Vivamus facilisis, mi eget tincidunt aliquet, ex eros feugiat lorem, sed porta tellus tortor id massa. Curabitur iaculis in diam ut lacinia. Vestibulum eget ornare felis, cursus lobortis nisi. Curabitur elementum arcu vel neque sodales, sit amet euismod massa mattis. Vivamus aliquet ipsum quam, venenatis congue eros efficitur non. Pellentesque ut ante eu augue consectetur fermentum. Duis nec justo odio.',
        audio: [
            {title: 'Demo 1', url: '1.wav'},
            {title: 'Demo 2', url: '2.wav'},
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
                coords: '34,44,270,350'
            },
            {
                title: 'GUI Element 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a erat dolor. Vivamus facilisis, mi eget tincidunt aliquet, ex eros feugiat lorem, sed porta tellus tortor id massa. Curabitur iaculis in diam ut lacinia. Vestibulum eget ornare felis, cursus lobortis nisi. Curabitur elementum arcu vel neque sodales, sit amet euismod massa mattis. Vivamus aliquet ipsum quam, venenatis congue eros efficitur non. Pellentesque ut ante eu augue consectetur fermentum. Duis nec justo odio.',
                coords: '290,172,333,250'
            }
        ],
    }

    return (
        <HeaderAndFooter>
            <div className="content">
                <div className="content-grid">
                    <div id="product-title-panel" className="panel light">
                        <h1>{productInfo.title}</h1>
                        <p>{productInfo.subtitle}</p>
                        <button className='dark'>Buy Now ${centsToString(productInfo.price)}USD</button>
                    </div>

                    <div id="about-panel" className="panel dark padded">
                        <h2>About</h2>
                        <p>{productInfo.about}</p>

                        <h2>Audio Demos</h2>
                        <p>player</p>
                        <p>player</p>

                        <h2>System Requirements</h2>
                        <ul>
                            {productInfo.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div id="gui-panel" className="panel dark">
                        <img src={productInfo.image_url} alt='GUI screenshot' />

                        <h2>Fjkldfd</h2>
                        <p>fjldkkfjdlkfjdfjlkdjfdlfjdj fkld jfdk jdfl jdjl fjdldjflekjer lfj  fjkd kjwlj</p>
                    </div>

                    <div id="demo-panel" className="panel dark padded">
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