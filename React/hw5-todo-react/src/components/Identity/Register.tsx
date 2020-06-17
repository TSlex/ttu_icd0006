import React, { useEffect } from 'react';

export default function Register() {

    return (
        <div className="text-center">
            <h1>Create a new account</h1>

            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form method="post" >
                        <hr />

                        <div className="text-danger validation-summary-valid" data-valmsg-summary="true">
                            <ul>
                                <li >

                                </li>
                            </ul>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" id="email" name="email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="conf_password">Confirm password</label>
                            <input className="form-control" type="password" id="conf_password" name="conf_password" />
                        </div>

                        <button type="submit" className="btn btn-primary">Register</button>

                        <p className="mt-3">
                            <a route-href="route: account-login">Already have an account? Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
