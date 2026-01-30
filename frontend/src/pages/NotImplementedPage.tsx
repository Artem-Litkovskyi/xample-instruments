import HeaderAndFooter from '../components/header/HeaderAndFooter.tsx';
import ErrorBox from '../components/ErrorBox.tsx';


function NotImplementedPage() {
    return (
        <HeaderAndFooter>
            <div className='content narrow'>
                <ErrorBox message='This page is not implemented yet!'/>
            </div>
        </HeaderAndFooter>
    )
}


export default NotImplementedPage;