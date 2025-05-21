import HeaderAndFooter from './HeaderAndFooter';
import AuthRequired from "./AuthRequired.tsx";


function BuyPage() {
    return (
        <AuthRequired>
            <HeaderAndFooter>
                <div className='content narrow'>
                    Buy Page
                </div>
            </HeaderAndFooter>
        </AuthRequired>
    )
}


export default BuyPage;