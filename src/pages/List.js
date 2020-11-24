import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

import Image from 'react-random-image';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Header from '../components/Template/Header';
import Footer from '../components/Template/Footer';
import api from '../services/api';

export default function List(){

    // Filters
    const [textFilter, setTextFilter] = useState();
    const [typeOfCrimes, setTypeOfCrimes] = useState([]);
    
    // Selected
    const [orderBy, setOrderBy] = useState('Date');

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const [newFromDate, setNewFromDate] = useState(null);
    const [newToDate, setNewToDate] = useState(null);
    const [selectedType, setSelectedType] = useState();

    const [searchResults, setSearchResults]  = useState();

    const [modalCrime, setModalCrime] = useState({});
    
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e, crime) => {
        e.preventDefault();
        setModalCrime(crime);
        setShow(true);
    }

    // Search
    async function handleSearch(e) {

        e.preventDefault();

        if(fromDate !== undefined) {
            setNewFromDate(moment(fromDate).format('YYYY/MM/DD - HH:mm:ss'));
        } 
        if(toDate !== undefined) {
            setNewToDate(moment(toDate).format('YYYY/MM/DD - HH:mm:ss'));
        }
    
        const results = await api.get('/crimes', {
            params: {
                crime_type: selectedType,
                order_by: orderBy,
                initial_datetime: newFromDate,
                final_datetime: newToDate,
            }
        });

        setSearchResults(results.data.data.crimes);
    }

    // Delete Crime
    async function handleDelete(e, id_crime) {
        e.preventDefault();
  
        await api.delete('/crime', {
            params: {
                crime_id: id_crime,
            } 
        });
        setShow(false);

        // Reload crimes
        const notDeleted = searchResults.filter(crime => crime.id_crime !== id_crime);
        setSearchResults(notDeleted);

    }
    
    // On loading, get all values
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

            <Container className="main-container">

                <Row className="d-flex justify-content-between">
                    <Col xs={12} sm={8}>
                        <h1>Crime <span className="letter">L</span>ist</h1>
                    </Col>

                    <Col sm={3} className="d-flex">
                        <Link to="/add" 
                            className="btn btn-primary d-none d-sm-inline-block"
                        >
                            <i className="fa fa-plus-square-o"></i> Add New Crime
                        </Link>
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} xs={12} sm={12} md={12} lg={6}  controlId="formTextFilter">
                                    <Form.Label>Text filter</Form.Label>
                                    <Form.Control  
                                        type="text" 
                                        value={textFilter}
                                        placeholder="Search for..."
                                        onChange={e => setTextFilter(e.target.value)} 
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>

                                <Form.Group as={Col} xs={6} sm={6} controlId="formTypeOfCrimes">
                                    <Form.Label><i className="fa fa-folder-open"></i> Type of crime</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        value={selectedType}
                                        onChange={e => setSelectedType(e.target.value)}
                                    >
                                        <option value="">
                                            All crimes
                                        </option>

                                        {typeOfCrimes.map((option, i) => (
                                            
                                            <option 
                                                key={option.id_crime_type} 
                                                value={option.id_crime_type}> 
                                                    {option.tx_type} 
                                            </option>
                                        ))}                    
                                        
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} xs={6} sm={3} controlId="formDateFrom" className="d-none d-lg-inline-block">
                                    <Form.Label><i className="fa fa-calendar"></i> Date - From</Form.Label>
                                    <div>

                                        <DatePicker
                                            placeholderText="YYYY/MM/DD - HH:MM:SS"
                                            className="form-control"
                                            dateFormat={'yyyy/MM/dd'}
                                            selected={fromDate}
                                            onChange={date => setFromDate(date)}
                                            selectsStart
                                            starDate={fromDate}
                                            endDate={toDate}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} sm={3} controlId="formDateTo" className="d-none d-sm-none d-lg-inline-block">
                                    <Form.Label><i className="fa fa-calendar"></i> Date - To</Form.Label>
                                    <div>
                                        <DatePicker
                                            placeholderText="YYYY/MM/DD - HH:MM:SS"
                                            className="form-control"
                                            dateFormat={'yyyy/MM/dd'}
                                            selected={toDate}
                                            
                                            onChange={date => setToDate(date)}
                                            selectsEnd
                                            endDate={toDate}
                                            minDate={fromDate}
                                        />

                                    </div>
                                </Form.Group>

                                {/* === Mobile === */}
                                
                                <Form.Group as={Col} xs={6} controlId="formDateFrom" className="d-lg-none">
                                    <Form.Label><i className="fa fa-calendar"></i> Date</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={() => {}}
                                    >
                                        <option value="">
                                            All dates
                                        </option>

                                    </Form.Control>
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
                                        onChange={e => setOrderBy(e.target.value)}
                                    >
                                        <option value="Date">Date</option>
                                        <option value="Weapon">Weapon</option>
                                        <option value="Criminal">Criminal</option>
                                        <option value="Victim">Victim</option>
                                        <option value="Country">Country</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Row>
                                <Col sm={3}>
                                    <Button 
                                        variant="secondary"
                                        onClick={handleSearch} >
                                        <i className="fa fa-search"></i> 
                                        <span className="d-none d-sm-inline">Search</span>
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>

                <Row>

                {
                    searchResults && 
                    searchResults.length !== 0 &&

                    searchResults.map((crime) =>
                        
                        <Col className="d-flex mb-3" sm={3} key={crime.id_crime} >
                        <div className="card crime" >
                            <div className="crime__title">
                                {crime.criminal_crime_types.map((types) => types.crime_type)}
                            </div>
                            <div className="crime__small mb-3">Crime type</div>
                                
                                <div className="crime__date"> {moment(crime.crime_date).format('YYYY/MM/DD - HH:mm:ss')}</div>
                            <div className="crime__small">{crime.country}</div>

                            <div className="crime__zoom-button">
                                <a href="/" className="zoom-button" onClick={(e) => handleShow(e, crime)}>
                                    <i className="fa fa-search-plus"></i>
                                </a>
                            </div>

                        </div>
                    </Col>
                        
                    ) 
                }
                </Row>
                                 
            </Container>

            <Footer footerLink="Add new crime" footerLinkTo="/add" />


            {
                modalCrime && 

                <Modal
                    show={show}
                    className="crime__modal"
                    onHide={handleClose}
                >
                    
                    <Header  title="Crime details" close={handleClose} />

                    <Modal.Body className="modal-content-details">

                        <h4 className="d-flex d-sm-none">Crime</h4>

                        <div className="modal-card">
                       
                        <div className="mb-3 ">

                            <div className="justify-content-between d-none d-sm-flex">
                                <h4>Crime</h4> 
                                <a href="/"
                                    onClick={(e) => handleDelete(e, modalCrime.id_crime)}>
                                    <i className="fa fa-trash"></i>
                                </a>

                            </div>

                            {modalCrime.criminal_crime_types &&

                                modalCrime.criminal_crime_types.map((types) => (

                                    <div key={types.id_crime} className="d-flex justify-content-between align-items-flex-start">

                                        <div className="crime__title">
                                            {types.crime_type}
                                            <div className="crime__small mb-3">Crime type</div>
                                        </div>

                                        <a href="/" className="d-sm-none d-flex"
                                            onClick={(e) => handleDelete(e, modalCrime.id_crime)}>
                                            <i className="fa fa-trash"></i>
                                        </a>

                                    </div>
                                ))
                            } 

                            <div className="crime__date"> {moment(modalCrime.crime_date).format('YYYY/MM/DD - HH:mm:ss')}</div>
                            <div className="crime__small mb-4">{modalCrime.country}</div>

                            { modalCrime.criminal_crime_types &&
                            
                                modalCrime.criminal_crime_types.map((types) => (
                                    
                                    <div key={types.id_crime}>

                                        <h4>Criminal</h4>
                                        <div className="d-flex criminal-block">
                                            <div className="img-rounded img-avatar">
                                                <Image alt={types.criminal} width={100} height={100} />
                                            </div>
                                            <div>
                                                {types.criminal}
                                                <p className="crime__small">Criminal</p>
                          
                                                {       
                                                    modalCrime.weapons_crime.map((weapon) => (
                                                        <div key={weapon.id_crime}>
                                                            {weapon.weapon}
                                                            <p className="crime__small">{weapon.weapon_type}</p>
                                                        </div>
                                                    ))                                                        
                                                }
                                                
                                            </div>

                                        </div>

                                    </div>                           
                                ))
                            } 

                        </div>

                        <div>
                            
                            <h4>Victim</h4>

                               { 

                                    modalCrime.victims_crime &&
                                    modalCrime.victims_crime.length > 0 ?
                                    
                                    modalCrime.victims_crime.map((victim) => (

                                        <div key={victim.id_crime} className="victim-block d-flex mb-4 align-items-center">
                                            <div className="crime__title">
                                                <div className="img-rounded img-avatar">
                                                    <Image  alt={victim.victim} height={100} width={100}  />
                                                </div>
                                            </div>
                                            <div>
                                                {victim.victim}
                                                <div className="crime__small">Victim</div>
                                            </div>

                                        </div>
                                    ))

                                    :  

                                    <div className="d-flex mb-4 align-items-center">
                                        <div className="crime__title">
                                            <div className="img-rounded">
                                                <div className="img-no-victim">No Victim</div>
                                            </div>
                                        </div>
                                        <div>
                                            Sem vítimas
                                            <div className="crime__small">Victim</div>
                                        </div>

                                    </div>

                                }  

                        </div>


                        </div>

                        

                    </Modal.Body>

                </Modal>

            }

        </>
    )
}

