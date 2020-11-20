import React, { useState, useEffect } from 'react';
import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import api from '../services/api';

export default function NewWeapon() {

    const [typeOfWeapons, setTypeOfWeapons] = useState([]);  
    
    const [selectedWeapon, setSelectedWeapon] = useState();
    const [weapon, setWeapon] = useState();

    const history = useHistory();

    async function handleCreate(e) {
        e.preventDefault();
        console.log("create new weapon;...");
        
        try {

            const response = await api.post('weapons', { weapon })
            localStorage.setItem('@crime-manager/new', response.data);
            history.push('/');

        } catch (error) {
            alert('Falha ao salvar nova arma')

        }


    }

    // On loading, get weapon types
    useEffect(() => {

        async function getTypeOfWeapons() {
            const typesOfWeapons = await api.get(`/weapon_types`);
            setTypeOfWeapons(typesOfWeapons.data.data.weapon_type);
        }
        getTypeOfWeapons();

    }, []);


    return (
        <>
            <Header back title="New weapon" />

            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1>New <span className="letter">W</span>eapon</h1>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>

                        <Form>
                            <Form.Group as={Col} sm={6} controlId="formTypeOfWeapon">
                                <Form.Label>Weapon type</Form.Label>
                                <Form.Control as="select" 
                                    onChange={e => setSelectedWeapon(e.target.value)} >

                                    <option> Select an option... </option>
                                    
                                    {
                                    typeOfWeapons && 
                                    
                                    typeOfWeapons.map((option) => (

                                        <option
                                            key={option.id_weapon_type}
                                            value={option.id_weapon_type}>
                                            {option.tx_weapon_type}
                                        </option>
                                    ))} 

                                </Form.Control>
                            </Form.Group>
                           
                            <Form.Group as={Col} sm={6} controlId="formWeapon">
                                <Form.Label> Weapon</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Type the name of the weapon..."
                                    onChange={e => setWeapon(e.target.value)}
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
