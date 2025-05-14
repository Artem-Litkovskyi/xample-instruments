import React, {useState} from "react";
import {Link} from "react-router-dom";

import HeaderAndFooter from "./HeaderAndFooter";
import ValidatedInput, {ValidatedInputState} from "../components/ValidatedInput";


function SignInPage() {
    const [fields, setFields] = useState({email:"", password:""});
    const [formState, setFormState] = useState(ValidatedInputState.Initial);

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFields(fields => ({...fields, [name]: value}));
        setFormState(ValidatedInputState.Initial);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setFormState(ValidatedInputState.Invalid);
        alert(fields);
        // TODO: send to server
    }

    return (
        <HeaderAndFooter>
            <div className="content narrow">
                <div className="panel dark">
                    <div>
                        <h2>Sign in</h2>

                        <form
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        >
                            <ValidatedInput
                                label="Email:" type="text" id="email" value={fields.email}
                                onChange={handleChange}
                                ruleMessage="Wrong email or password"
                                alwaysShowRule={false}
                                state={formState}
                            />

                            <ValidatedInput
                                label="Password:" type="password" id="password" value={fields.password}
                                onChange={handleChange}
                                ruleMessage="Wrong email or password"
                                alwaysShowRule={false}
                                state={formState}
                            />

                            <div>
                                <p></p>
                                <button type="submit" className="button gray">Sign in</button>
                            </div>

                            <hr />

                            <div>
                                <p>Don't have an account?</p>
                                <Link to="/signup" className="button gray">Sign up</Link>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
</HeaderAndFooter>
    )
}


export default SignInPage;