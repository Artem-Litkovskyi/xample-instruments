import HeaderAndFooter from '../components/HeaderAndFooter.tsx';
import NotFound from '../components/NotFound';


function HomePage() {
    return (
        <HeaderAndFooter>
            <div className='content'>
                <NotFound />
            </div>
        </HeaderAndFooter>
    )
}


export default HomePage;