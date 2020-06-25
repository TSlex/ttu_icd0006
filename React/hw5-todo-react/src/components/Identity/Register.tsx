import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderErrors } from 'components/Shared/Alert';
import { IRegisterDTO } from 'types/Identity/IRegisterDTO';
import { useDispatch } from 'react-redux';
import { register } from 'redux/account/actions';
import { FormInput } from 'components/Form/FormInput';
import { setErrors, clearNotifications } from 'redux/notification/actions';
import { setGlobalLoaded } from 'redux/loading-system/actions';

export default function Register() {

    const [registerModel, setRegisterModel] = useState({} as IRegisterDTO)

    const [formValid, setFormValid] = useState({ email: true, password: true, conf_password: true })

    const [confPass, setConfPass] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setGlobalLoaded(true));
        return () => { dispatch(setGlobalLoaded(false)) };
    }, [])

    const onSubmit = () => {

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

        else if (!(registerModel.password && confPass && registerModel.password === confPass)) {
            validationErrors.push("The Passwords must match.");
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
                    {renderErrors()}
                </div>
                <div className="col-md-4">
                    <FormInput data={{
                        name: "email", id: "email", type: "email", label: "Email",
                        isValid: formValid.email


                    }} bindFunction={(value: any) => {
                        setRegisterModel({ ...registerModel, email: value })
                    }} />

                    <FormInput data={{
                        name: "password", id: "password", type: "password",
                        label: "Password", autoComplete: "new-password", isValid: formValid.password


                    }} bindFunction={(value: any) => {
                        setRegisterModel({ ...registerModel, password: value })
                    }} />

                    <FormInput data={{
                        name: "conf_password", id: "conf_password",
                        type: "password", label: "Confirm password", autoComplete: "new-password",
                        isValid: formValid.conf_password

                    }} bindFunction={(value: any) => {
                        setConfPass(value)
                    }} />

                    <button type="submit" className="btn btn-primary" onClick={onSubmit}>Register</button>

                    <p className="mt-3">
                        <Link replace to="/account/login">Already have an account? Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
