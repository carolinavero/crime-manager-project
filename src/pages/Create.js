import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';

import api from '../services/api';

export default function Create() {

    //Select fields
    const [typeOfCrimes, setTypeOfCrimes] = useState();
    const [listOfWeapons, setListOfWeapons] = useState();
    const [listOfCriminals, setListOfCriminals] = useState();
    const [listOfVictims, setListOfVictims] = useState();

    const [date, setDate] = useState();

    const [victims, setVictims] = useState(['']); 
    const [criminals, setCriminals] = useState([{
        criminal: '',
        weapon: ''
    }]);
    const [types, setTypes] = useState(['']);
    

    async function handleCreate(e) {
        e.preventDefault();

        const victimList = [];
        victims.forEach(item => {
            victimList.push({ "victim_id": item} )
        });

        const weaponList = [];
        const criminalList = [];
        criminals.forEach(item => {
            console.log(item)
            weaponList.push({ "weapon_id": item.weapon});
            criminalList.push({ "criminal_id": item.criminal, "id_crime_type": 1});
        })

        const newCrime = {
            "victim_list": victimList,
            "weapon_list": weaponList,
            "criminal_list": criminalList,
            "country": "Brasil",
            "crime_date": moment(date).format('YYYY/MM/DD')
        };

        console.log(newCrime);

        //await api.post(`/crime`, crime);
        
    }

    function handleAddCriminal(e) {
        e.preventDefault();
        setCriminals([...criminals, {
            criminal: '', 
            weapon: ''
        }]);
    }

    function handleAddVictim(e) {
        e.preventDefault();
        setVictims([...victims, '']);
    }

    function changeCriminal(value, index){
        const criminal2 = criminals.map((item, i) => {
            if (i === index) {
                item.criminal = value;
            }
            return item;
        })
        setCriminals(criminal2);
    }

    function changeWeapon(value, index) {
        const weapon2 = criminals.map((item, i) => {
            if (i === index) {
                item.weapon = value;
            }
            return item;
        })
        setCriminals(weapon2);
    }

    function changeVictim(value, index) {
        const victim2 = victims.map((item, i) => {
            if(i === index) {
                item = value;
            }
            return item;
        })
        console.log("victim2", victim2);
        setVictims(victim2);
    }


    // On loading, get crime types and weapons types
    useEffect(() => {

        async function getTypeOfCrimes() {
            const typesOfCrimes = await api.get(`/crime_types`);
            setTypeOfCrimes(typesOfCrimes.data.data.crime_types);
        }
        async function getListOfWeapons() {
            const weapons = await api.get(`/weapons`);
            setListOfWeapons(weapons.data.data);
        }
        async function getListOfCriminals() {
            const criminals = await api.get(`/criminals`);
            setListOfCriminals(criminals.data.data);
        }
        async function getListOfVictims() {
            const victims = await api.get(`/victims`);
            setListOfVictims(victims.data.data);
        }

        getTypeOfCrimes();
        getListOfWeapons();
        getListOfCriminals();
        getListOfVictims();

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
                                        <Form.Control as="select" 
                                            selected={types} 
                                            onChange={(types) => setTypes(types)}>

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

                            {   criminals &&
                                criminals.map((item, index) => (

                                <Col sm={6} key={index}>

                                    <Form.Group className="w-100" controlId="formCriminal">
                                        <Form.Label> Criminal</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={item.criminal}
                                            onChange={e => changeCriminal(e.target.value, index)}
                                        >
                                            <option> Select an option... </option>
                                            {listOfCriminals &&

                                                listOfCriminals.map((option) => (

                                                    <option
                                                        key={option.id_criminal}
                                                        value={option.id_criminal}
                                                    >
                                                        {option.tx_name}
                                                    </option>
                                                ))}
                                        </Form.Control>

                                    </Form.Group>

                                    <Form.Group controlId="formWeapon">
                                        <Form.Label> Weapon (optional)</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            value={item.weapon}
                                            onChange={e => changeWeapon(e.target.value, index)}
                                        >
                                            <option> Select an option... </option>

                                            {listOfWeapons &&

                                                listOfWeapons.map((option) => (

                                                    <option
                                                        key={option.id_weapon}
                                                        value={option.id_weapon}
                                                        
                                                    >
                                                        {option.tx_model}
                                                    </option>
                                            ))}

                                        </Form.Control>

                                    </Form.Group>
                                </Col>

                                ))
                            }

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
                                {
                                    victims.map((victim, index) => (
                                        <Col sm={6} key={index}>

                                            <Form.Group className="w-100" controlId="formVictim">
                                                <Form.Label> Victim (optional) </Form.Label>
                                               
                                                <Form.Control
                                                    as="select"
                                                    value={victim}
                                                    onChange={e => changeVictim(e.target.value, index)}
                                                >
                                                    <option> Select an option... </option>

                                                    {listOfVictims &&

                                                        listOfVictims.map((option) => (

                                                            <option
                                                                key={option.id_victim}
                                                                value={option.id_victim}

                                                            >
                                                                {option.tx_name}
                                                            </option>
                                                        ))}

                                                </Form.Control>

                                            </Form.Group>

                                        </Col>
                                    ))
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
