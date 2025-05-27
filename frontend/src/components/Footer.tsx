import { FaFacebookF, FaTwitter, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';

import '../assets/styles/components/Footer.css';


function Footer() {
    return (
        <div className='footer'>
            <span>2025 Xample Instruments</span>
            <div>
                <a href='https://www.facebook.com/'><FaFacebookF /></a>
                <a href='https://x.com/'><FaTwitter /></a>
                <a href='https://www.youtube.com/'><FaYoutube /></a>
                <a href='https://www.instagram.com/'><RiInstagramFill /></a>
                <a href='https://soundcloud.com/'><FaSoundcloud /></a>
            </div>
        </div>
    )
}


export default Footer;