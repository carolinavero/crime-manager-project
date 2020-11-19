import React from 'react';
import logo from '../../assets/images/logo.png';

import { Link } from 'react-router-dom';

export default function Header({ back }) {

    return (
        <>
            <header>
                {
                    back ?

                    <Link to="/" className="btn btn-primary btn-back d-flex justify-content-center align-items-center">
                        <i className="fa fa-arrow-left"></i>
                    </Link>

                    : <img src={logo} alt="Crime Manager"/>   
                }
            </header>
        </>
    )
}