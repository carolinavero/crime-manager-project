import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

export default function NewVictim () {

    const [victim, setVictim] = useState();

    return (

        <>
            <Col sm={6}>

                <Form.Group className="w-100" controlId="formVictim">
                    <Form.Label> Victim (optional) </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type the name of the victim..."
                        value={victim}
                        onChange={e => setVictim(e.target.value)}
                    />
                </Form.Group>

            </Col>

        </>
    )


}