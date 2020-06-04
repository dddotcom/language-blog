import React, { useState } from 'react';
import { Card } from 'react-bootstrap'

export const VocabCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div className="mt-3 mb-3">
            <Card className="m-auto" bg={isFlipped ? "dark": "dark"}
            text={isFlipped ? "white" :"white"} border="warning"
            style={{ width: '18rem' }}
            onClick={() => { setIsFlipped(!isFlipped)}}>
                <Card.Header>{props.type}</Card.Header>
                <Card.Body>
                    <Card.Title>
                        {isFlipped ? props.english : props.tagalog}
                    </Card.Title>
                    <Card.Text>{isFlipped ? props.englishSentence : props.tagalogSentence}</Card.Text>
                </Card.Body>
            </Card>





        </div>
    )
}

