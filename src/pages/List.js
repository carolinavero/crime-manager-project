import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import api from '../services/api';

export default function List(){

    // Filters
    const [textFilter, setTextFilter] = useState('');

    const [typeOfCrimes, setTypeOfCrimes] = useState([]);

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const [selectedDates, setSelectedDates] = useState();
    const [orderBy, setOrderBy] = useState('');

    const [crimes, setCrimes] = useState({});

    const [loaded, setLoaded] = useState(false);
    

    // Add new crime 
    async function handleAddNewCrime() {

    }

    // Search 
    async function handleSearch (e) {

        e.preventDefault();
        console.log("buscando...");

        const info = await api.get(`/crimes`);
        console.log("crimes: ", info.data.data.crimes);

        setCrimes(info.data.data.crimes);
        
    }
    
    // On loading, get all values
    useEffect(() => {
        
        async function getTypeOfCrimes() {
            const typesOfCrimes = await api.get(`/crime_types`);
            setTypeOfCrimes(typesOfCrimes.data.data.crime_types);
        }
        getTypeOfCrimes();
        //setLoaded(true);
        
    }, [loaded]);


    return (

        <>
            <Header />

            <Container className="mt-5">
                <Row>
                    <Col sm={8}>
                        <h1>Crime <span className="letter">L</span>ist</h1>
                    </Col>
                    <Col sm={4} className="d-flex justify-content-end">
                        
                        <Link to="/add" 
                            className="btn btn-primary"
                            onClick={handleAddNewCrime}
                        >
                            <i className="fa fa-plus-square-o"></i> Add New Crime
                        </Link>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>

                        <Form>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formTextFilter">
                                    <Form.Label>Text filter</Form.Label>
                                    <Form.Control  
                                        type="text" 
                                        placeholder="Search for..."
                                        onChange={text => setTextFilter(text)} 
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} sm={6} controlId="formTypeOfCrimes">
                                    <Form.Label><i className="fa fa-folder-open"></i> Type of crime</Form.Label>
                                    <Form.Control as="select" defaultValue="All crimes">

                                        <option
                                            value="All crimes">
                                            All crimes
                                        </option>

                                        {typeOfCrimes.map((option) => (
                                            
                                            <option 
                                                key={option.value} 
                                                value={option.value}> 
                                                    {option.tx_type} 
                                            </option>
                                        ))}                    
                                        
                                    </Form.Control>
                                </Form.Group>


                                {/* Opcionais:  */}
                                <Form.Group as={Col} sm={3} controlId="formDateFrom">
                                    <Form.Label><i className="fa fa-calendar"></i> Date - From</Form.Label>
                                    <div>

                                        <DatePicker
                                            placeholderText="YYYY/MM/DD - HH:MM:SS"
                                            className="form-control"
                                            dateFormat="yyyy/MM/dd"
                                            selected={fromDate}
                                            onChange={date => setFromDate(date)}
                                            selectsStart
                                            starDate={fromDate}
                                            endDate={toDate}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} sm={3} controlId="formDateTo">
                                    <Form.Label><i className="fa fa-calendar"></i> Date - To</Form.Label>
                                    <div>
                                        <DatePicker
                                            placeholderText="YYYY/MM/DD - HH:MM:SS"
                                            className="form-control"
                                            dateFormat="yyyy/MM/dd"
                                            selected={toDate}
                                            onChange={date => setToDate(date)}
                                            selectsEnd
                                            endDate={toDate}
                                            minDate={fromDate}
                                        />

                                    </div>
                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} sm={6} controlId="formTextFilter">
                                    <Form.Label>
                                        <i className="fa fa-sort-amount-asc"></i> Order by
                                    </Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        defaultValue="Date" 
                                        onChange={order => setOrderBy(order)}
                                    >
                                        <option value="Date">Date</option>
                                        <option value="Weapon">Weapon</option>
                                        <option value="Criminal">Criminal</option>
                                        <option value="Victim">Victim</option>
                                        <option value="Country">Country</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Button 
                                variant="secondary"
                                onClick={handleSearch} >
                                <i className="fa fa-search"></i> Buscar
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <Row>

                    <Col>
                    
                        {
                            loaded ?

                                crimes.map((crime, index) =>
                                    <div key={index}>
                                        <div className="card crime">
                                            <div className="crime__title">
                                                {crime.criminal_crime_types.map((types, index) => types.crime_type)}
                                            </div>
                                            <div className="crime__type mb-3">Crime type</div>
                                            <div className="crime__date"> {crime.crime_date}</div>
                                            <div className="crime__country">{crime.country}</div>

                                            <div className="crime__zoom-button">
                                                <a href="/" className="zoom-button">
                                                    <i className="fa fa-search-plus"></i>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                )

                                : ''
                        }

                    </Col>
                </Row>

                                 

            </Container>

            <Footer />

        </>
    )
}

