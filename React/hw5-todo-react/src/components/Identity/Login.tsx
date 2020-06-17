import React from 'react';

import { useDispatch } from 'react-redux'

import { login } from 'redux/account/actions';
import { Link } from 'react-router-dom';

export default function Login() {

    const dispatch = useDispatch()

    const onLogin = () => {
        dispatch(login({ email: "aleksi@ttu.ee", password: "Admin_123" }))
    }

    return (
        <div className="text-center">
            <h1>Log in</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <section>
                        <hr />
                        <div className="text-danger validation-summary-valid" data-valmsg-summary="true">
                            <ul>
                                <li>
                                </li>
                            </ul>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" id="email" name="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={onLogin}>
                                Log in
                            </button>
                        </div>

                        <div className="form-group">
                            <p>
                                <Link replace to="/account/register">Do not have an account yet? Register</Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}