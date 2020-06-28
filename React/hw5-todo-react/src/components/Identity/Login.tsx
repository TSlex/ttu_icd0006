import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

import { ILoginDTO } from 'types/Identity/ILoginDTO';
import { FormInput } from 'components/Form/FormInput';
import { login } from 'redux/account/actions';
import { clearNotifications, setErrors } from 'redux/notification/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';
import Errors from 'components/Shared/Errors';

export default function Login() {

    const [loginModel, setLoginModel] = useState({} as ILoginDTO)
    const [formValid, setFormValid] = useState({ email: true, password: true })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => { dispatch(setGlobalLoaded(false)) };
    }, [])

    const onSubmit = () => {

        dispatch(clearNotifications())

        console.log(loginModel.email)

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
                    <Errors />
                </div>
                <div className="col-md-4">
                    <FormInput
                        data={{

                            name: "email",
                            id: "email",
                            type: "email",
                            label: "Email",

                            isValid: formValid.email
                        }}

                        validationControl={(value: boolean) => setFormValid({ ...formValid, email: value })}

                        bindFunction={(value: any) => {
                            setLoginModel({ ...loginModel, email: value })
                        }}
                    />

                    <FormInput data={{
                        initialValue: loginModel.password,

                        name: "password",
                        id: "password",
                        type: "password",
                        label: "Password",

                        isValid: formValid.password
                    }}

                        validationControl={(value: boolean) => setFormValid({ ...formValid, password: value })}

                        bindFunction={(value: any) => {
                            setLoginModel({ ...loginModel, password: value })
                        }} />


                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
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