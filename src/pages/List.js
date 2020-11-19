import React from 'react';

import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';

import { Container, Row, Col } from 'react-bootstrap';
import Search from '../components/Template/Search';
import Card from '../components/Template/Card';

export default function List(){

    return (

        <>
            <Header />

            <Container className="mt-5">
                <Row>
                    <Col sm={8}>
                        <h1>Crime List</h1>
                    </Col>
                    <Col sm={4} className="d-flex justify-content-end">
                        
                        <a href="/" className="btn btn-primary">
                            <i className="fa fa-plus-square-o"></i> Add New Crime
                        </a>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <Search />
                    </Col>
                </Row>

                <Row className="pr-0">
                    <Col sm={3}>
                        <Card />
                    </Col>
                
                </Row>

            </Container>

            <Footer />

        </>
    )
}

