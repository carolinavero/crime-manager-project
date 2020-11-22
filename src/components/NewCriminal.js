import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

export default function NewVictim({ typeOfWeapons }) {

    const [criminal, setCriminal] = useState();

    return (

        <>

            <Col sm={6}>

                <Form.Group className="w-100" controlId="formCriminal">
                    <Form.Label> Criminal</Form.Label>
                    <Form.Control
                        type="text"
                        value={criminal}
                        placeholder="Type the name of the criminal..."
                        onChange={e => setCriminal(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formWeapon">
                    <Form.Label> Weapon (optional)</Form.Label>

                    <Form.Control as="select">

                        <option> Select an option... </option>

                        {typeOfWeapons &&

                            typeOfWeapons.map((option) => (

                                <option
                                    key={option.id_weapon_type}
                                    value={option.id_weapon_type}>
                                    {option.tx_weapon_type}

                                </option>
                            ))}

                    </Form.Control>


                </Form.Group>
            </Col>

        </>
    )


}