import { useState } from 'react';
import { Link } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ValidatedInput from '../components/ValidatedInput';
import { useAuth } from '../contexts/AuthContext';
import ValidationError from '../errors/ValidationError.tsx';


function SignInPage() {
    const { login } = useAuth();

    const [fields, setFields] = useState({ email:'', password:'' });
    const [formState, setFormState] = useState('initial');
    const [fetchError, setFetchError] = useState('');


    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(prev => ({...prev, [name]: value}));
        setFormState('initial');
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            await login(fields.email, fields.password);
        } catch (error) {
            if (error instanceof ValidationError) {
                setFormState('invalid');
                return;
            }

            setFetchError('Oops, something went wrong...');
            throw error;
        }
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
                            ruleMessage='Wrong email or password'
                            alwaysShowRule={false}
                            state={formState}
                        />

                        <ValidatedInput
                            label='Password:' type='password' id='password' value={fields.password}
                            onChange={handleChange}
                            ruleMessage='Wrong email or password'
                            alwaysShowRule={false}
                            state={formState}
                        />

                        <div>
                            <p className='invalid'>{fetchError}</p>
                            <button type='submit' className='button gray'>Sign in</button>
                        </div>

                        <hr />

                        <div>
                            <p>Don't have an account?</p>
                            <Link to='/signup' className='button gray'>Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default SignInPage;