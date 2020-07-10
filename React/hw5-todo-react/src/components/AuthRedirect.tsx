import { Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrors } from "redux/notification/actions";

export default function AuthRedirect() {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setErrors(["You need to be logged in!"]))
        }
    })

    return (
        <Redirect to="/account/login" />
    )
}