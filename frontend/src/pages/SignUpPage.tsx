import {useState} from 'react';
import {Link} from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ValidatedInput from '../components/ValidatedInput';
import {validateUsername, validateEmail, validatePassword} from '../services/UserService';


function SignUpPage() {
    const [fields, setFields] = useState({
        username:'',
        email:'',
        password:'',
        repeatPassword:''
    });

    const [states, setStates] = useState({
        username:'initial',
        email:'initial',
        password:'initial',
        repeatPassword:'initial'
    });

    const validators = {
        username:validateUsername,
        email:validateEmail,
        password:validatePassword,
        repeatPassword:(value: string) => value === fields.password ? 0 : -1,
    };

    const [emailErrorMessage, setEmailErrorMessage] = useState('');


    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(fields => ({...fields, [name]: value}));

        if (name !== 'password') return;

        const validationResult = validators[name as keyof typeof states](value);
        if (validationResult !== 0 && states[name as keyof typeof states] === 'initial') return;
        setStates(states => (
            {...states, [name]: validationResult === 0 ? 'valid' : 'invalid'}));
    }

    const handleBlur = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'password') return;

        const validationResult = validators[name as keyof typeof states](value);
        setStates(states => (
            {...states, [name]: validationResult === 0 ? 'valid' : 'invalid'}))

        if (name === 'email') {
            if (validationResult === -1) setEmailErrorMessage('Incorrect email address')
            else if (validationResult === -2) setEmailErrorMessage('This email is used by another user')
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(fields);
        // TODO: send to server
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
                            ruleMessage="Username can't be empty"
                            alwaysShowRule={false}
                            state={states.username}
                        />

                        <ValidatedInput
                            label='Email:' type='text' id='email' value={fields.email}
                            onChange={handleChange} onBlur={handleBlur}
                            ruleMessage={emailErrorMessage}
                            alwaysShowRule={false}
                            state={states.email}
                        />

                        <ValidatedInput
                            label='Password:' type='password' id='password' value={fields.password}
                            onChange={handleChange} onBlur={handleBlur}
                            ruleMessage='Use at least 8 characters with a mix of uppercase, lowercase, numbers and special symbols (!@#$%^&*)'
                            alwaysShowRule={true}
                            state={states.password}
                        />

                        <ValidatedInput
                            label='Repeat password:' type='password' id='repeatPassword' value={fields.repeatPassword}
                            onChange={handleChange} onBlur={handleBlur}
                            ruleMessage='Passwords do not match'
                            alwaysShowRule={false}
                            state={states.repeatPassword}
                        />

                        <div>
                            <p aria-hidden={true}></p>
                            <button type='submit' className='button gray'>Sign up</button>
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