import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';

import HeaderAndFooter from '../components/header/HeaderAndFooter.tsx';
import LabeledInput from '../components/inputs/LabeledInput.tsx';
import { useAuth } from '../contexts/AuthContext';
import ResponseNotOkError from '../errors/ResponseNotOkError.tsx';


function SignInPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [fields, setFields] = useState({ email:'', password:'' });
    const [error, setError] = useState('');
    const [fetchMessage, setFetchMessage] = useState('');


    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(prev => ({...prev, [name]: value}));
        setError('');
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            await login(fields.email, fields.password);
        } catch (error) {
            if (error instanceof ResponseNotOkError) {
                setError('Wrong email or password');
                return;
            }

            setFetchMessage('Oops, something went wrong...');
            setTimeout(() => setFetchMessage(''), 2000);
            throw error;
        }

        const returnToUrl = location?.state?.returnToUrl;
        navigate(returnToUrl ? returnToUrl : '/home');
    }

    return (
        <HeaderAndFooter>
            <div className='content narrow'>
                <div className='panel dark padded'>
                    <h2>Sign in</h2>

                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >
                        <LabeledInput
                            label='Email:' type='text' id='email' value={fields.email}
                            onChange={handleChange}
                            errorMessage={error}
                        />

                        <LabeledInput
                            label='Password:' type='password' id='password' value={fields.password}
                            onChange={handleChange}
                            errorMessage={error}
                        />

                        <div>
                            <p className='invalid'>{fetchMessage}</p>
                            <button type='submit' className='button gray'>Sign in</button>
                        </div>

                        <hr />

                        <div>
                            <p>Don't have an account?</p>
                            <Link
                                to='/signup'
                                className='button gray'
                                state={{ returnToUrl: location?.state?.returnToUrl }}
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default SignInPage;