import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ValidatedInput from '../components/ValidatedInput';
import { useAuth } from '../contexts/AuthContext';
import ValidationError from '../errors/ValidationError.tsx';


function SignInPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [fields, setFields] = useState({ email:'', password:'' });
    const [error, setError] = useState('');
    const [fetchError, setFetchError] = useState('');


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
            if (error instanceof ValidationError) {
                setError('Wrong email or password');
                return;
            }

            setFetchError('Oops, something went wrong...');
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
                        <ValidatedInput
                            label='Email:' type='text' id='email' value={fields.email}
                            onChange={handleChange}
                            errorMessage={error}
                        />

                        <ValidatedInput
                            label='Password:' type='password' id='password' value={fields.password}
                            onChange={handleChange}
                            errorMessage={error}
                        />

                        <div>
                            <p className='invalid'>{fetchError}</p>
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