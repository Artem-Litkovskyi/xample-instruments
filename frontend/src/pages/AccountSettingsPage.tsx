import { useState } from 'react';

import LabeledInput from '../components/LabeledInput.tsx';
import { validateUsername, validateEmail, validatePassword } from '../utils/validators.ts';
import ResponseNotOkError from '../errors/ResponseNotOkError.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { account_update } from '../services/UserService.ts';


function AccountSettingsPage() {
    const { username, email } = useAuth();
    
    const [fields, setFields] = useState({
        username:username,
        email:email,
        oldPassword:'',
        newPassword:'',
        repeatPassword:'',
    });

    const [errors, setErrors] = useState({
        username: '',
        email:'',
        oldPassword:'',
        newPassword:'',
        repeatPassword:'',
    });

    const validators = {
        username:validateUsername,
        email:validateEmail,
        oldPassword:() => '',
        newPassword:validatePassword,
        repeatPassword:(value: string) => value === fields.newPassword ? '' : 'Passwords do not match',
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

        if (name === 'newPassword') {
            if (fields.oldPassword === '') {
                setErrors(prev => ({...prev, oldPassword: 'Password is required for this action'}))
            }

            if (fields.repeatPassword === '') {
                setErrors(prev => ({...prev, repeatPassword: 'Please repeat your new password'}))
            }
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        try {
            await account_update(fields.username, fields.email, fields.oldPassword, fields.newPassword);
            alert('Account updated successfully.');
        } catch (error) {
            if (error instanceof ResponseNotOkError) {
                setErrors(prev => ({
                    ...prev,
                    // @ts-ignore
                    username: error.detail?.username || '',
                    // @ts-ignore
                    email: error.detail?.email || '',
                    // @ts-ignore
                    oldPassword: error.detail?.old_password || '',
                    // @ts-ignore
                    newPassword: error.detail?.new_password || '',
                }));

                return;
            }

            setFetchError('Oops, something went wrong...');
            throw error;
        }
    }

    function isDisabled() {
        if (errors.username !== '' || errors.email !== '') {
            return true;
        }

        if (fields.newPassword !== '' || fields.repeatPassword !== '') {
            if (errors.oldPassword !== '' || errors.newPassword !== '' || errors.repeatPassword !== '') {
                return true;
            }
        }

        return false;
    }


    return (
        <div className='panel dark padded'>
            <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >
                <h2>Personal information</h2>

                <LabeledInput
                    label='Username:' type='text' id='username' value={fields.username}
                    onChange={handleChange} onBlur={handleBlur}
                    errorMessage={errors.username}
                />

                <LabeledInput
                    label='Email:' type='text' id='email' value={fields.email}
                    onChange={handleChange} onBlur={handleBlur}
                    errorMessage={errors.email}
                />

                <hr />

                <h2>Change password</h2>

                <LabeledInput
                    label='Current password:' type='password' id='oldPassword' value={fields.oldPassword}
                    onChange={handleChange} onBlur={handleBlur}
                    errorMessage={errors.oldPassword}
                />

                <LabeledInput
                    label='New password:' type='password' id='newPassword' value={fields.newPassword}
                    onChange={handleChange} onBlur={handleBlur}
                    ruleMessage='Use at least 8 characters with a mix of uppercase, lowercase and numbers'
                    errorMessage={errors.newPassword}
                />

                <LabeledInput
                    label='Repeat the new password:' type='password' id='repeatPassword' value={fields.repeatPassword}
                    onChange={handleChange} onBlur={handleBlur}
                    errorMessage={errors.repeatPassword}
                />

                <div>
                    <p className='invalid'>{fetchError}</p>
                    <button
                        type='submit'
                        className='button gray'
                        disabled={isDisabled()}
                    >
                        Save all
                    </button>
                </div>
            </form>
        </div>
    )
}


export default AccountSettingsPage;