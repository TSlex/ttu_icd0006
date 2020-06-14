import React from "react";

export default function () {
    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <a className="navbar-brand fas fa-clipboard-list" route-href="route: home"> Todo</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-dark" route-href="route: account-manage">Hello,</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark">Logout</a>
                            </li>

                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link text-dark" route-href="route: account-register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" route-href="route: account-login">Login</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav flex-grow-1">

                            <li className="nav-item ${nav.isActive ? 'active' : ''}">
                                <a className="nav-link text-dark"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}