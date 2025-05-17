import React, {useState} from "react";
import {Link} from "react-router-dom";

import HeaderAndFooter from "./HeaderAndFooter";
import ValidatedInput, {ValidatedInputState} from "../components/ValidatedInput";
import {validateUsername, validateEmail, validatePassword} from "../services/UserService";


function AccountSettingsPage() {
    const [fields, setFields] = useState({
        username:"",
        email:"",
        newPassword:"",
        repeatPassword:"",
        password:"",
    });

    const [states, setStates] = useState({
        username:ValidatedInputState.Initial,
        email:ValidatedInputState.Initial,
        newPassword:ValidatedInputState.Initial,
        repeatPassword:ValidatedInputState.Initial,
        password:ValidatedInputState.Initial,
    });

    const validators = {
        username:validateUsername,
        email:validateEmail,
        newPassword:validatePassword,
        repeatPassword:(value: string) => value === fields.newPassword ? 0 : -1,
        password:() => 0,  // Quick fix
    };

    const [emailErrorMessage, setEmailErrorMessage] = useState('');


    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(fields => ({...fields, [name]: value}));

        if (name !== "newPassword") return;

        const validationResult = validators[name as keyof typeof states](value);
        if (validationResult !== 0 && states[name as keyof typeof states] === ValidatedInputState.Initial) return;
        setStates(states => (
            {...states, [name]: validationResult === 0 ? ValidatedInputState.Valid : ValidatedInputState.Invalid}));
    }

    const handleBlur = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "newPassword") return;

        const validationResult = validators[name as keyof typeof states](value);
        setStates(states => (
            {...states, [name]: validationResult === 0 ? ValidatedInputState.Valid : ValidatedInputState.Invalid}))

        if (name === "email") {
            if (validationResult === -1) setEmailErrorMessage('Incorrect email address')
            else if (validationResult === -2) setEmailErrorMessage('This email is used by another user')
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setStates(states => (
            {...states, password: ValidatedInputState.Invalid}));
        alert(fields);
        // TODO: send to server
    }


    return (
        <div className="panel dark">
            <div>
                <form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                    <h2>Personal information</h2>

                    <ValidatedInput
                        label="Username:" type="text" id="username" value={fields.username}
                        onChange={handleChange} onBlur={handleBlur}
                        ruleMessage="Username can't be empty"
                        alwaysShowRule={false}
                        state={states.username}
                    />

                    <ValidatedInput
                        label="Email:" type="text" id="email" value={fields.email}
                        onChange={handleChange} onBlur={handleBlur}
                        ruleMessage={emailErrorMessage}
                        alwaysShowRule={false}
                        state={states.email}
                    />

                    <h2>Change password</h2>

                    <ValidatedInput
                        label="New password:" type="password" id="newPassword" value={fields.newPassword}
                        onChange={handleChange} onBlur={handleBlur}
                        ruleMessage="Use at least 8 characters with a mix of uppercase, lowercase, numbers and special symbols (!@#$%^&*)"
                        alwaysShowRule={true}
                        state={states.newPassword}
                    />

                    <ValidatedInput
                        label="Repeat password:" type="password" id="repeatPassword" value={fields.repeatPassword}
                        onChange={handleChange} onBlur={handleBlur}
                        ruleMessage="Passwords do not match"
                        alwaysShowRule={false}
                        state={states.repeatPassword}
                    />

                    <hr />

                    <h2>Confirm changes</h2>

                    <ValidatedInput
                        label="Current password:" type="password" id="password" value={fields.password}
                        onChange={handleChange}
                        ruleMessage='Wrong password'
                        alwaysShowRule={false}
                        state={states.password}
                    />

                    <div>
                        <p aria-hidden={true}></p>
                        <button type="submit" className="button gray">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default AccountSettingsPage;