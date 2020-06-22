import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loadUser, logout } from "redux/account/actions";
import { AppState } from "redux/types";

export default function () {
    const dispatch = useDispatch()

    const username = useSelector((store: AppState) => store.account.username);
    const isAuthenticated = useSelector((store: AppState) => store.account.isAuthenticated);

    useEffect(() => { dispatch(loadUser()) }, []);

    const history = useHistory()

    const onLogout = () => {
        dispatch(logout());
        history.replace("/")
    }

    const getNavs = () => {
        if (isAuthenticated) {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link text-dark">Hello, {username}</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link text-dark" onClick={onLogout}>Logout</span>
                    </li>

                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link replace to="/account/register" className="nav-link text-dark">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link replace to="/account/login" className="nav-link text-dark">Login</Link>
                    </li>
                </ul>
            )
        }
    }

    return (
        <>
            {getNavs()}
        </>
    )
}