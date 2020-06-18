import React, { useState } from 'react';

import { useDispatch } from 'react-redux'

import { login } from 'redux/account/actions';
import { Link, useHistory } from 'react-router-dom';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { FormInput, FormInputTypes } from 'components/Form/FormBase';

export default function Login() {

    const [loginModel, setLoginModel] = useState({} as ILoginDTO)

    const dispatch = useDispatch()

    const history = useHistory()

    const onLogin = () => {
        dispatch(login({ email: "aleksi@ttu.ee", password: "Admin_123" }))
        history.replace("/")
    }

    return (
        <div className="text-center">
            <h1>Log in</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <section>
                        <form>
                            <hr />
                            <div className="text-danger validation-summary-valid" data-valmsg-summary="true">
                                <ul>
                                    <li>
                                    </li>
                                </ul>
                            </div>

                            <FormInput data={{
                                bindValue: loginModel.email,

                                name: "email",
                                id: "email",
                                type: "email",
                                class: "form-control",
                                label: "Email"

                            }} bindFunction={(value: any) => { setLoginModel({ ...loginModel, email: value }) }} />

                            <FormInput data={{
                                bindValue: loginModel.email,

                                name: "test",
                                id: "test",
                                type: "test",
                                label: "test"

                            }} inputType={FormInputTypes.Checkbox} />

                            <FormInput data={{
                                bindValue: loginModel.email,

                                name: "test",
                                id: "test",
                                type: "test",
                                label: "test"

                            }} inputType={FormInputTypes.Checkbox} />


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
                        </form>
                    </section>
                </div>
            </div>
        </div >
    )
}