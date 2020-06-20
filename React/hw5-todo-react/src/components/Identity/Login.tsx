import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { FormInput } from 'components/Form/FormBase';
import { renderErrors } from 'components/Shared/Alert';
import { AppState } from 'redux/types';
import { login } from 'redux/account/actions';
import { setRedirecting } from 'redux/loading-system/actions';

export default function Login() {

    const [loginModel, setLoginModel] = useState({} as ILoginDTO)

    const errors = useSelector((store: AppState) => store.notification.errors);

    const dispatch = useDispatch()

    const onLogin = () => {
        dispatch(login(loginModel));
    }

    return (
        <div className="text-center">
            <h1>Log in</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <section>
                        <hr />

                        {renderErrors(errors)}

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