import React, { useState, useEffect } from 'react';
import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import api from '../services/api';

export default function Create() {

    const [typeOfCrimes, setTypeOfCrimes] = useState();
    const [date, setDate] = useState();
    const [criminal, setCriminal] = useState();
    const [weapon, setWeapon] = useState();
    const [victim, setVictim] = useState();

    function handleCreate(e) {
        e.preventDefault();
        console.log("creating...");
    }

    // On loading, get crime types

    useEffect(() => {

        async function getTypeOfCrimes() {
            const typesOfCrimes = await api.get(`/crime_types`);
            setTypeOfCrimes(typesOfCrimes.data.data.crime_types);
        }
        getTypeOfCrimes();

    }, []);


    return (
        <>
           <Header />

            <Container className="mt-5">
               <Row>
                   <Col>
                        <h1>New Crime</h1>
                   </Col>
               </Row>

                <Row className="mb-5">
                    <Col>

                        <Form>
                            <Form.Group as={Col} sm={6} controlId="formTypeOfCrimes">
                                <Form.Label>Type of crime</Form.Label>
                                <Form.Control as="select">

                                    <option> Select an option... </option>
                                    {/* 
                                    {typeOfCrimes.map((option) => (

                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.tx_type}
                                        </option>
                                    ))} */}

                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={3} controlId="formDate" className="mb-5">
                                <Form.Label> Date</Form.Label>
                                <div>

                                    <DatePicker
                                        placeholderText="YYYY/MM/DD - HH:MM:SS"
                                        className="form-control"
                                        dateFormat="yyyy/MM/dd"
                                        onChange={date => setDate(date)}
                                    
                                    />
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} sm={6} controlId="formCriminal">
                                <Form.Label> Criminal</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type the name of the criminal..."
                                    onChange={text => setCriminal(text)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} sm={6} controlId="formWeapon">
                                <Form.Label> Weapon (optional)</Form.Label>

                                <Form.Control as="select">

                                    <option> Select an option... </option>
                                    {/* 
                                    {weapon.map((option) => (

                                        <option
                                            key={option.value}
                                            value={option.value}>
                                            {option.tx_type}
                                        </option>
                                    ))} */}
                                    </Form.Control>

                               
                            </Form.Group>

                            <Row className="mb-5">
                                <Col sm={3}>
                                    <Button
                                        variant="link"
                                        className="btn btn-light"
                                        onClick={(e) => handleCreate(e)} >
                                        <i className="fa fa-plus-square-o"></i> Add criminal
                                    </Button>
                                
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        variant="link"
                                        className="btn btn-light"
                                        onClick={(e) => handleCreate(e)} >
                                        <i className="fa fa-plus-square-o"></i> Register new weapon
                                    </Button>
                                
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>


                                    <Form.Group  controlId="formVictim">
                                        <Form.Label> Victim (optional) </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Type the name of the victim..."
                                            onChange={text => setVictim(text)}
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={3}>
                                
                                    <Button
                                        variant="link"
                                        className="btn btn-light"
                                        onClick={(e) => handleCreate(e)} >
                                        <i className="fa fa-plus-square-o"></i> Add victim
                                    </Button>

                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col sm={6}>

                                    <Button
                                        variant="primary"
                                        onClick={(e) => handleCreate(e)} >
                                        <i className="fa fa-plus-square-o"></i> Save new crime
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
