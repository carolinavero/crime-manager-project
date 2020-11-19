import React from 'react';

import Header from './Template/Header';
import Footer from './Template/Footer';

import { Container, Row, Col } from 'react-bootstrap';
import Search from './Template/Search';
import Card from './Template/Card';

export default function List(){

    return (

        <>
            <Header />

            <Container className="mt-5">
                <Row>
                    <Col sm={8}>
                        <h1>Crime List</h1>
                    </Col>
                    <Col sm={4}>
                        <a href="/" className="btn btn-primary">
                            <i className="fa  fa-plus-square-o"></i> Add New Crime
                        </a>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    
                        <Search />
                    </Col>
                </Row>

                <Row>
                    <Col sm={3}>
                        <Card />
                    </Col>
                    <Col sm={3}>
                        <Card />
                    </Col>
                    <Col sm={3}>
                        <Card />
                    </Col>
                    <Col sm={3}>
                        <Card />
                    </Col>
                </Row>

            </Container>

            <Footer />

        </>
    )
}

