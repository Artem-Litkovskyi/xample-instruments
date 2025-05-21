import { useState } from 'react';
import { Link, redirect } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ValidatedInput from '../components/ValidatedInput';
import { validateUsername, validateEmail, validatePassword } from '../services/UserService';
import ValidationError from "../errors/ValidationError.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";



function SignUpPage() {
    const { signup } = useAuth();

    const [fields, setFields] = useState({
        username:'',
        email:'',
        password:'',
        repeatPassword:''
    });

    const [errors, setErrors] = useState({
        username:'',
        email:'',
        password:'',
        repeatPassword:''
    });

    const validators = {
        username:validateUsername,
        email:validateEmail,
        password:validatePassword,
        repeatPassword:(value: string) => value === fields.password ? '' : 'Passwords do not match',
    };

    const [fetchError, setFetchError] = useState('');


    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(prev => ({...prev, [name]: value}));
    }

    const handleBlur = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        const validationResult = validators[name as keyof typeof validators](value);
        setErrors(prev => ({...prev, [name]: validationResult}))
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            await signup(fields.username, fields.email, fields.password);
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrors(prev => ({
                    ...prev,
                    // @ts-ignore
                    username: error.detail?.username || '',
                    // @ts-ignore
                    email: error.detail?.email || '',
                    // @ts-ignore
                    password: error.detail?.password || '',
                }));

                return;
            }

            setFetchError('Oops, something went wrong...');
            throw error;
        }

        redirect('/signin');
    }


    return (
        <HeaderAndFooter>
            <div className='content narrow'>
                <div className='panel dark padded'>
                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >
                        <h2>Sign up</h2>

                        <ValidatedInput
                            label='Username:' type='text' id='username' value={fields.username}
                            onChange={handleChange} onBlur={handleBlur}
                            errorMessage={errors.username}
                        />

                        <ValidatedInput
                            label='Email:' type='text' id='email' value={fields.email}
                            onChange={handleChange} onBlur={handleBlur}
                            errorMessage={errors.email}
                        />

                        <ValidatedInput
                            label='Password:' type='password' id='password' value={fields.password}
                            onChange={handleChange} onBlur={handleBlur}
                            ruleMessage='Use at least 8 characters with a mix of uppercase, lowercase and numbers'
                            errorMessage={errors.password}
                        />

                        <ValidatedInput
                            label='Repeat password:' type='password' id='repeatPassword' value={fields.repeatPassword}
                            onChange={handleChange} onBlur={handleBlur}
                            errorMessage={errors.repeatPassword}
                        />

                        <div>
                            <p className='invalid'>{fetchError}</p>
                            <button
                                type='submit'
                                className='button gray'
                                disabled={!Object.values(errors).every((value) => value === '')}
                            >
                                Sign up
                            </button>
                        </div>

                        <hr />

                        <div>
                            <p>Already have an account?</p>
                            <Link to='/signin' className='button gray'>Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default SignUpPage;