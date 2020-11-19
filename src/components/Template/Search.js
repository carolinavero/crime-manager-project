import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default function Search() {

    return (
        <>
            <Form>

                <Form.Row>
                    <Form.Group as={Col} sm={6} controlId="formTextFilter">
                        <Form.Label>Text filter</Form.Label>
                        <Form.Control type="text" placeholder="Search for..." />
                    </Form.Group>
                </Form.Row>


                <Form.Row>

                    <Form.Group as={Col} sm={6} controlId="formTypeOfCrimes">
                        <Form.Label><i className="fa fa-folder-open"></i> Type of crime</Form.Label>
                        <Form.Control as="select" defaultValue="All crimes">
                            <option>All crimes</option>
                            <option>Firearm</option>
                            <option>Melee</option>
                            <option>Psychological</option>
                        </Form.Control>
                    </Form.Group>


                    {/* Opcionais:  */}
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label><i className="fa fa-calendar"></i> Date - From</Form.Label>
                        <Form.Control placeholder="YYYY/MM/DD - HH:MM:SS" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress2">
                        <Form.Label><i className="fa fa-calendar"></i> Date - To</Form.Label>
                        <Form.Control placeholder="YYYY/MM/DD - HH:MM:SS" />
                    </Form.Group>


                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} sm={6} controlId="formTextFilter">
                        <Form.Label>
                            <i className="fa fa-sort-amount-asc"></i> Order by
                        </Form.Label>
                        <Form.Control as="select" defaultValue="Date">

                            {/* Opções da API */}
                            <option>Date</option>
                            <option>Weapon</option>
                            <option>Criminal</option>
                            <option>Victim</option>
                            <option>Country</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="secondary" type="submit">
                    <i className="fa fa-search"></i> Buscar
                </Button>
            </Form>

        </>
    )
}
