import React from "react";
import { Link } from "react-router-dom";

import IdentityNav from "./IdentityNav"

export default function () {

    return (
        <header>
            <nav className="navbar fixed-top navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <Link to="/" className="navbar-brand fas fa-clipboard-list"> Todo</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">

                        <IdentityNav />

                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to="/tasks" className="nav-link text-dark">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/categories" className="nav-link text-dark">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/priorities" className="nav-link text-dark">Priorities</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}