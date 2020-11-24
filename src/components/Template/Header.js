import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import logo from '../../assets/images/logo.png';
import logo2x from '../../assets/images/logo@2x.png';

export default function Header({ back, close, title }) {

    return (
        <>
            <header>
                
                <Container fluid>
                    <Row >
                        <Col>

                            {

                                back ?

                                    <div className="header__back">

                                        <Link to="/"
                                            className="btn btn-primary btn-back ">
                                            <i className="fa fa-arrow-left"></i>
                                        </Link>

                                        <div className="d-md-none">
                                            <h3>{title}</h3>
                                        </div>
                                       
                                    </div>

                                    : close ?

                                        <div className="header__close">

                                            <Link to="/"
                                                className="btn btn-primary btn-back "
                                                onClick={close}>
                                                <i className="fa fa-arrow-left"></i>
                                            </Link>

                                            <div className="d-md-none">
                                                <h3>{title}</h3>
                                            </div>
                                          

                                        </div>

                                        :

                                        <img src={logo} srcSet={logo2x} alt="Crime Manager" />

                            }
                        
                        
                        </Col>

                    
                   
                    </Row>
                </Container>

            </header>
        </>
    )
}