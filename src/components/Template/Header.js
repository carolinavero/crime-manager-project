import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import logo from '../../assets/images/logo.png';

export default function Header({ back, title }) {

    return (
        <>
            <header>
                
                   <Container>
                       <Row >

                        {  back ?

                        <div className="d-flex align-items-center justify-content-center">


                           <Col xs={3}>

                                <Link to="/" 
                                    className="btn btn-primary btn-back d-flex justify-content-center align-items-center">
                                    <i className="fa fa-arrow-left"></i>
                                </Link>

                           </Col>
                           <Col xs={9}>

                                <div className="d-md-none">
                                    <h3>{title}</h3>
                                </div>
                           </Col>

                        </div>


                           : <img src={logo} alt="Crime Manager"/>   
                        }

                       </Row>
                   </Container>

                    
            </header>
        </>
    )
}