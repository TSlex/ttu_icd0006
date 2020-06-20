import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderErrors } from 'components/Shared/Alert';
import { IRegisterDTO } from 'types/Identity/IRegisterDTO';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'redux/types';
import { register } from 'redux/account/actions';
import { FormInput } from 'components/Form/FormBase';
import { setErrors, clearNotifications } from 'redux/notification/actions';
import { randomBytes } from 'crypto';

export default function Register() {

    const [registerModel, setRegisterModel] = useState({} as IRegisterDTO)
    const [formValid, setFormValid] = useState({ email: true, password: true, conf_password: true })

    const [isLoaded, setLoaded] = useState(false)

    const [confPass, setConfPass] = useState()

    const errors = useSelector((store: AppState) => store.notification.errors);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearNotifications());
        setLoaded(true)
    }, [isLoaded === false])

    const onRegister = () => {

        dispatch(clearNotifications())

        let validationErrors: string[] = []
        let validation = { email: true, password: true, conf_password: true }

        setFormValid({ ...formValid, ...validation })

        if (registerModel.email?.indexOf("@") < 0 || !(registerModel.email?.length > 0)) {
            validationErrors.push("The Email field is required.");
            validation.email = false;
        }

        if (!(registerModel.password?.length > 0)) {
            validationErrors.push("The Password field is required.");
            validation.password = false;
        }

        else if (!(registerModel.password?.length >= 6)) {
            validationErrors.push("The field Password must be a string or array type with a minimum length of '6'.");
            validation.password = false;
        }

        if (!(registerModel.password && confPass && registerModel.password === confPass)) {
            validationErrors.push("The Password must match.");
            validation.password = false;
            validation.conf_password = false;
        }

        if (validationErrors.length > 0) {
            dispatch(setErrors(validationErrors))
            setFormValid({ ...formValid, ...validation })
        } else {
            dispatch(register(registerModel));
        }
    }

    return (
        <div className="text-center">
            <h1>Create a new account</h1>

            <div className="row align-items-center d-flex flex-column">
                <div className="col-md-6">
                    <hr />

                    {renderErrors(errors)}

                </div>
                <div className="col-md-4">
                    <FormInput data={{
                        bindValue: registerModel.email,

                        name: "email",
                        id: "email",
                        type: "email",
                        class: "form-control",
                        label: "Email",
                        required: true,
                        isValid: formValid.email,


                    }} bindFunction={(value: any) => {
                        setRegisterModel({ ...registerModel, email: value })
                    }} />

                    <FormInput data={{
                        bindValue: registerModel.password,

                        name: "password",
                        id: "password",
                        type: "password",
                        class: "form-control",
                        label: "Password",
                        required: true,
                        autoComplete: "new-password",
                        isValid: formValid.password,


                    }} bindFunction={(value: any) => {
                        setRegisterModel({ ...registerModel, password: value })
                    }} />

                    <FormInput data={{
                        bindValue: confPass!,

                        name: "conf_password",
                        id: "conf_password",
                        type: "password",
                        class: "form-control",
                        label: "Confirm password",
                        required: true,
                        autoComplete: "new-password",
                        isValid: formValid.conf_password,

                    }} bindFunction={(value: any) => {
                        setConfPass(value)
                    }} />

                    <button type="submit" className="btn btn-primary" onClick={onRegister}>Register</button>

                    <p className="mt-3">
                        <Link replace to="/account/login">Already have an account? Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
