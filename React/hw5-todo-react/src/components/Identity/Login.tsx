import React, { useEffect } from 'react';

export default function Login() {

    return (
        <div className="text-center">
            <h1>Log in</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <section>
                        <form id="account" method="post">
                            <hr />
                            <div className="text-danger validation-summary-valid" data-valmsg-summary="true">
                                <ul>
                                    <li>
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
                                <button type="submit" className="btn btn-primary">Log in</button>
                            </div>

                            <div className="form-group">
                                <p>
                                    <a route-href="route: account-register">Do not have an account yet? Register</a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div >
    )
}