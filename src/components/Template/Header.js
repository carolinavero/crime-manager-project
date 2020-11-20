import React from 'react';
import logo from '../../assets/images/logo.png';

import { Link } from 'react-router-dom';

export default function Header({ back, title }) {

    return (
        <>
            <header>
                {
                    back ?

                    <div className="d-flex">

                        <Link to="/" className="btn btn-primary btn-back d-flex justify-content-center align-items-center">
                            <i className="fa fa-arrow-left"></i>
                        </Link>

                        <div className="d-md-none">
                            <h3>{title}</h3>
                        </div>

                    </div>

                    : <img src={logo} alt="Crime Manager"/>   
                }
            </header>
        </>
    )
}