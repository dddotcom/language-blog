import React from 'react';
import { Table, Col, Row } from 'react-bootstrap'

export const AnswerStats = (props) => {
    return (
        <div>
            <h3>Answer Stats</h3>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>Tagalog Word</th>
                            <th>English Word</th>
                            <th>Incorrect Guesses</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Object.keys(props.answerStats).length ? (
                                Object.keys(props.answerStats).map(word => 
                                    props.answerStats[word] ? (
                                        <tr key={word}>
                                            <td>{word.split('=')[0]}</td>
                                            <td>{word.split('=')[1]}</td>
                                            <td>{props.answerStats[word]}</td>
                                        </tr>
                                    ) : (undefined) 
                                )
                            ) : (
                                <tr>
                                    <td colSpan="3">All correct! Galing!</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}