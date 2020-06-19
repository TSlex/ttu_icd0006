import React, { useState } from 'react';

import { useDispatch } from 'react-redux'

import { login } from 'redux/account/actions';
import { Link, useHistory } from 'react-router-dom';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { FormInput, FormInputTypes } from 'components/Form/FormBase';
import { AlertBox, AlertTypes } from 'components/Shared/Alert';

export default function Login() {

    const [loginModel, setLoginModel] = useState({} as ILoginDTO)

    const dispatch = useDispatch()

    const history = useHistory()

    const onLogin = () => {

        console.log(loginModel)
        // dispatch(login({ email: "aleksi@ttu.ee", password: "Admin_123" }))
        // history.replace("/")
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

                        <AlertBox alertData={{ message: "test", type: AlertTypes.Success, dismissable: true }} />
                        <AlertBox alertData={{ message: "test", type: AlertTypes.Success, dismissable: true }} />
                        <AlertBox alertData={{ message: "test", type: AlertTypes.Success, dismissable: true }} />
                        <AlertBox alertData={{ message: "test", type: AlertTypes.Success, dismissable: true }} />
                        <AlertBox alertData={{ message: "test", type: AlertTypes.Success, dismissable: true }} />

                        <FormInput data={{
                            bindValue: loginModel.email,

                            name: "email",
                            id: "email",
                            type: "email",
                            class: "form-control",
                            label: "Email"

                        }} bindFunction={(value: any) => {
                            setLoginModel({ ...loginModel, email: value })
                        }} />

                        <FormInput data={{
                            bindValue: loginModel.password,

                            name: "password",
                            id: "password",
                            type: "password",
                            class: "form-control",
                            label: "Password"

                        }} bindFunction={(value: any) => {
                            setLoginModel({ ...loginModel, password: value })
                        }} />

                        <FormInput
                            data={{
                                bindValue: '1',
                                options: [{ value: "1", displayValue: "one", }, { value: "2", displayValue: "two", }]
                            }}

                            inputType={FormInputTypes.Select}

                            bindFunction={(value: any) => {
                                console.log(value)
                                setLoginModel({ ...loginModel, password: value })
                            }}
                        />

                        <FormInput
                            data={{
                                bindValue: [{ value: false, label: "one", }, { value: false, label: "two", }]
                            }}

                            inputType={FormInputTypes.Radio}

                            bindFunction={(value: any) => {
                                console.log(value)
                                setLoginModel({ ...loginModel, password: value })
                            }}
                        />

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