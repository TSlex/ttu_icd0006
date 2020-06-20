import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { FormInput } from 'components/Form/FormBase';
import { renderErrors } from 'components/Shared/Alert';
import { AppState } from 'redux/types';
import { login } from 'redux/account/actions';
import { clearNotifications, setErrors } from 'redux/notification/actions';

export default function Login() {

    const [loginModel, setLoginModel] = useState({} as ILoginDTO)
    const [formValid, setFormValid] = useState({ email: true, password: true })

    const [isLoaded, setLoaded] = useState(false)

    const errors = useSelector((store: AppState) => store.notification.errors);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearNotifications());
        setLoaded(true)
    }, [isLoaded === false])

    const onLogin = () => {

        dispatch(clearNotifications())

        let validationErrors: string[] = []
        let validation = { email: true, password: true, conf_password: true }

        setFormValid({ ...formValid, ...validation })

        if (loginModel.email?.indexOf("@") < 0 || !(loginModel.email?.length > 0)) {
            validationErrors.push("The Email field is required.");
            validation.email = false;
        }

        if (!(loginModel.password?.length > 0)) {
            validationErrors.push("The Password field is required.");
            validation.password = false;
        }

        else if (!(loginModel.password?.length >= 6)) {
            validationErrors.push("The field Password must be a string or array type with a minimum length of '6'.");
            validation.password = false;
        }

        if (validationErrors.length > 0) {
            dispatch(setErrors(validationErrors))
            setFormValid({ ...formValid, ...validation })
        } else {
            dispatch(login(loginModel));
        }
    }

    return (
        <div className="text-center">
            <h1>Log in</h1>

            <div className="row align-items-center d-flex flex-column">
                <div className="col-md-6">
                    <hr />

                    {renderErrors(errors)}
                </div>
                <div className="col-md-4">
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
                </div>
            </div>
        </div >
    )
}