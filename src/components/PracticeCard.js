import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap'
import './PracticeCard.css'
import Puto from '../origputo.png'
import UbePuto from '../ubeputo.png'
import PandanPuto from '../pandanputo.png'

export const PracticeCard = (props) => {
    const [cardColor, setCardColor] = useState("dark")
    const [putoFlavor, setPutoFlavor] = useState("Puto");

    const flavors = ["Puto", "PandanPuto", "UbePuto"]

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
            randomPuto();
            props.updateCurrentCardIndex(true);
        } else {
            setCardColor("danger");
            // TODO: show the correct answer? 
            await resetCard(form);
            randomPuto();
            props.updateCurrentCardIndex(false);
        }
    }

    useEffect(() => {
        randomPuto();
    }, [])

    const randomPuto = () => {
        // change puto color
        const newFlavor = flavors[Math.floor(Math.random() * Math.floor(3))]
        setPutoFlavor(newFlavor);
    }

    return (
        <div className="mt-3 mb-3">
            <Card className="m-auto" bg={cardColor}
            text="white" border="warning"
            style={{ width: '36rem', height: '24rem' }}>
                <Card.Header>{props.type}</Card.Header>
                <Card.Body>
                    { putoFlavor === 'Puto' ? (<span><small>Original!</small><br/><img className="puto-card" src={Puto} alt="masarap na puto original" title="masarap na puto original"/></span>): null }
                    { putoFlavor === 'UbePuto' ? (<span><small>Ube my favorite!</small><br/><img className="puto-card" alt="masarap na putong ube" src={UbePuto} title="masarap na putong ube"/></span>): null }
                    { putoFlavor === 'PandanPuto' ? (<span><small>Pandan, how fresh!</small><br/><img className="puto-card" alt="masarap na puto pandan" src={PandanPuto} title="masarap na puto pandan"/></span>): null }
                    <Card.Title>
                        <h1>{props.word}</h1>
                    </Card.Title>
                    {/* <Card.Text>{props.sentence}</Card.Text> */}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="translation">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form.Control autoFocus type="text" placeholder="Enter translation" size="lg" className="text-center"/>
                        </Col>
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

