import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import NewVictim from '../components/NewVictim';
import NewCriminal from '../components/NewCriminal';

import api from '../services/api';

export default function Create() {

    //Select field
    const [typeOfCrimes, setTypeOfCrimes] = useState();
    const [typeOfWeapons, setTypeOfWeapons] = useState();

    const [date, setDate] = useState();

    const [newVictim, setNewVictim] = useState(); 
    const [newCriminal, setNewCriminal] = useState();
    
    async function handleCreate(e) {
        e.preventDefault();
        console.log("creating...");

        await api.post(`/crime`, {
            "victim_list": [
                { "victim_id": 1 }
            ],
            "weapon_list": [
                { "weapon_id": 1 }
            ],
            "criminal_list": [
                { "criminal_id": 1, "id_crime_type": 1 }
            ],
            "country": "Japan",
            "crime_date": "2019-12-11"
        } );
        
    }

    function handleAddCriminal(e) {
        e.preventDefault();
        console.log("new criminal...");
        setNewCriminal(<NewCriminal />)
    }

    function handleAddVictim(e) {
        e.preventDefault();
        console.log("new victim...");
        setNewVictim(<NewVictim />)
    }


    // On loading, get crime types and weapons types
    useEffect(() => {

        async function getTypeOfCrimes() {
            const typesOfCrimes = await api.get(`/crime_types`);
            setTypeOfCrimes(typesOfCrimes.data.data.crime_types);
        }
    
        async function getTypeOfWeapons() {
            const typesOfWeapons = await api.get(`/weapon_types`);
            setTypeOfWeapons(typesOfWeapons.data.data.weapon_type);
        }

        getTypeOfCrimes();
        getTypeOfWeapons();

    }, []);


    return (

        <>
           <Header back title="New crime" />

            <Container className="main-container" >
               <Row>
                   <Col>
                        <h1>New <span className="letter">C</span>rime</h1>
                   </Col>
               </Row>

                <Row className="mb-5">
                    <Col>

                        <Form>

                            <Row>
                                <Col sm={6}>
                                    <Form.Group controlId="formTypeOfCrimes">
                                        <Form.Label>Type of crime</Form.Label>
                                        <Form.Control as="select">

                                            <option> Select an option... </option>
                                        
                                            {
                                            typeOfCrimes &&
                                            
                                            typeOfCrimes.map((option) => (

                                                <option
                                                    key={option.id_crime_type}
                                                    value={option.id_crime_type}>
                                                    {option.tx_type}
                                                </option>
                                            ))} 

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={3}>
                                    <Form.Group controlId="formDate" className="mb-5 input-date">
                                        <Form.Label> Date</Form.Label>
                                        <div className="d-flex align-items-center justify-content-between">

                                            <DatePicker
                                                placeholderText="YYYY/MM/DD - HH:MM:SS"
                                                className="form-control"
                                                dateFormat="yyyy/MM/dd"
                                                selected={date}
                                                onChange={date => setDate(date)}

                                            />
                                            <i className="fa fa-calendar"></i>
                                        </div>
                                    </Form.Group>

                                </Col>
                            </Row>

                            
                            
                            <Row className="d-flex flex-direction-row many-items">

                                <NewCriminal />

                                {newCriminal && <NewCriminal />}

                            </Row>
                                                        
                            <Row className="mb-5">
                                <Col sm={3}>
                                    <Button
                                        variant="link"
                                        className="btn btn-light"
                                        onClick={(e) => handleAddCriminal(e)} >
                                        <i className="fa fa-plus-square-o"></i> Add criminal
                                    </Button>
                                
                                </Col>
                                <Col sm={3}>
                                    <Link to="/weapon"
                                        variant="link"
                                        className="btn btn-light"
                                    >
                                        <i className="fa fa-plus-square-o"></i> Register new weapon
                                    </Link>
                                
                                </Col>
                            </Row>


                            <Row className="d-flex flex-direction-row many-items">
                                <NewVictim />

                                { newVictim && 
                                    <NewVictim />
                                }

                            </Row>

                            <Row>
                                <Col sm={3}>
                                
                                    <Button
                                        variant="link"
                                        className="btn btn-light"
                                        onClick={(e) => handleAddVictim(e)} >
                                        <i className="fa fa-plus-square-o"></i> Add victim
                                    </Button>

                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col sm={6} className="d-none d-sm-block">

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

           <Footer 
                footerButton="Save new crime" 
                handleFooterButton={handleCreate} />
        </>
    )
}
