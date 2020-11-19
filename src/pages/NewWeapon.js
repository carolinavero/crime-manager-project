import React, { useState, useEffect } from 'react';
import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

import api from '../services/api';

export default function NewWeapon() {

    const [typeOfWeapons, setTypeOfWeapons] = useState();    
    const [weapon, setWeapon] = useState();

    function handleCreate(e) {
        e.preventDefault();
        console.log("creating...");
    }

    // On loading, get weapon types
   /*  useEffect(() => {

        async function getTypeOfWeapons() {
            const typesOfWeapons = await api.get(`/weapon_types`);
            setTypeOfWeapons(typesOfWeapons.data.data.weapon_types);
        }
        getTypeOfWeapons();

    }, [weapon]); */


    return (
        <>
            <Header back />

            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1>New <span className="letter">W</span>eapon</h1>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>

                        <Form>
                            <Form.Group as={Col} sm={6} controlId="formTypeOfCrimes">
                                <Form.Label>Type of weapon</Form.Label>
                                <Form.Control as="select">

                                    <option> Select an option... </option>
                                    {/* 
                                    {typeOfWeapons.map((option) => (

                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.tx_type}
                                        </option>
                                    ))} */}

                                </Form.Control>
                            </Form.Group>
                           
                            <Form.Group as={Col} sm={6} controlId="formWeapon">
                                <Form.Label> Weapon</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type the name of the weapon..."
                                    onChange={text => setWeapon(text)}
                                />
                            </Form.Group>
                           
                            <Row className="mt-5">
                                <Col sm={6}>

                                    <Button
                                        variant="primary"
                                        onClick={(e) => handleCreate(e)} >
                                        <i className="fa fa-plus-square-o"></i> Save new weapon
                                    </Button>
                                </Col>
                            </Row>

                        </Form>

                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}
