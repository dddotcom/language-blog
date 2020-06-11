import React from 'react';
import { Card } from 'react-bootstrap'

export const VerbConjugationCard = (props) => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

    }

    return (
        <div className="mt-3 mb-3">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="translation">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Control autoFocus type="text" placeholder="Enter translation" size="lg" className="text-center"/>
                    </Col>
                </Form.Group>                     
            </Form>  
        </div>
    )
}