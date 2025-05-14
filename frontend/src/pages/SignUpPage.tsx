import React, {useState} from "react";
import {Link} from "react-router-dom";

import HeaderAndFooter from "./HeaderAndFooter";
import ValidatedInput, {ValidatedInputState} from "../components/ValidatedInput";
import {validateEmail, validatePassword, validateUsername} from "../services/UserService";


function SignUpPage() {
    const [fields, setFields] = useState({username:"", email:"", password:"", repeatPassword:""});
    const [states, setStates] = useState({username:ValidatedInputState.Initial, email:ValidatedInputState.Initial, password:ValidatedInputState.Initial, repeatPassword:ValidatedInputState.Initial});

    const validateRepeatPassword = (value: string) => value === fields.password;
    const validators = {username:validateUsername, email:validateEmail, password:validatePassword, repeatPassword:validateRepeatPassword};

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(fields => ({...fields, [name]: value}));

        if (name !== "password") return;

        const isValid = validators[name as keyof typeof validators](value);

        if (!isValid && states[name as keyof typeof states] === ValidatedInputState.Initial) return;

        setStates(states => (
            {...states, [name]: isValid ? ValidatedInputState.Valid : ValidatedInputState.Invalid}));
    }

    const handleBlur = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        const isValid = validators[name as keyof typeof validators](value);
        setStates(states => (
            {...states, [name]: isValid ? ValidatedInputState.Valid : ValidatedInputState.Invalid}));
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        alert(fields);
    }

    return (
        <HeaderAndFooter>
            <div className="content narrow">
                <div className="panel dark">
                    <div>
                        <h2>Sign up</h2>

                        <form
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        >
                            <ValidatedInput
                                label="Username:" type="text" id="username" value={fields.username}
                                onChange={handleChange} onBlur={handleBlur}
                                ruleMessage="This name is already taken"
                                alwaysShowRule={false}
                                state={states.username}
                            />

                            <ValidatedInput
                                label="Email:" type="text" id="email" value={fields.email}
                                onChange={handleChange} onBlur={handleBlur}
                                ruleMessage="Incorrect email address"
                                alwaysShowRule={false}
                                state={states.email}
                            />

                            <ValidatedInput
                                label="Password:" type="password" id="password" value={fields.password}
                                onChange={handleChange} onBlur={handleBlur}
                                ruleMessage="Use at least 8 characters with a mix of uppercase, lowercase, numbers and special symbols (!@#$%^&*)"
                                alwaysShowRule={true}
                                state={states.password}
                            />

                            <ValidatedInput
                                label="Repeat password:" type="password" id="repeatPassword" value={fields.repeatPassword}
                                onChange={handleChange} onBlur={handleBlur}
                                ruleMessage="Passwords do not match"
                                alwaysShowRule={false}
                                state={states.repeatPassword}
                            />

                            <div>
                                <p aria-hidden={true}></p>
                                <button className="button gray">Sign up</button>
                            </div>

                            <hr />

                            <div>
                                <p>Already have an account?</p>
                                <Link to="/signin" className="button gray">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default SignUpPage;