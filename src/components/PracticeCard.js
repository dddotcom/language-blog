import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import './PracticeCard.css'

export const PracticeCard = (props) => {
    const [cardColor, setCardColor] = useState("dark")

    const resetCard = (form) => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000)
        }).then(() => {
            form.reset();
            setCardColor("dark");
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const userTranslation = form.elements.translation.value;
        if (userTranslation.toLowerCase() === props.translation) {
            setCardColor("success");
            await resetCard(form);
            props.updateCurrentCardIndex();
        } else {
            setCardColor("danger");
            await resetCard(form);
        }
    }

    return (
        <div className="mt-3 mb-3">
            <Card className="m-auto" bg={cardColor}
            text="white" border="warning"
            style={{ width: '36rem', height: '24rem' }}>
                <Card.Header>{props.type}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.word}</Card.Title>
                    <Card.Text>{props.sentence}</Card.Text>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="translation">
                            <Form.Control type="text" placeholder="Enter translation" />
                        </Form.Group>
                        </Form>
                    <div className="hint-text">
                    <p><span className="give-up">Give up?</span> 
                    <span className="the-answer">The answer is: {props.translation}</span></p></div>
                </Card.Body>
            </Card>
        </div>
    )
}

