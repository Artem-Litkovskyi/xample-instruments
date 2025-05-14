import React from "react";
import {Link} from "react-router-dom";

import HeaderAndFooter from "./HeaderAndFooter";


function SignInPage() {
    return (
        <HeaderAndFooter>
            <div className="content narrow">
                <div className="panel dark">
                    <div>
                        <h2>Sign in</h2>

                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="email" name="email"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password"/>
                            </div>

                            <div>
                                <p></p>
                                <button className="button gray">Sign in</button>
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