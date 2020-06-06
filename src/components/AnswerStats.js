import React, { useContext, useState } from 'react';
import { Table, Col, Row, Button, Badge } from 'react-bootstrap'
import { MyListContext } from '../contexts/MyListContext';
import './AnswerStats.css'

export const AnswerStats = (props) => {
    const { setMyList } = useContext(MyListContext)
    const [myListSet, setMyListSet] = useState(new Set());

    const addToList = (updateListSet) => {
        const newMyList = Array.from(updateListSet).map(word => ({type: 'myList', english: word.split('=')[1], tagalog: word.split('=')[0]}))
        setMyList(newMyList)
    }

    const addToMyList = (word) => {
        const updateListSet = new Set(myListSet);
        if (updateListSet.has(word)) {
            updateListSet.delete(word)
        } else {
            updateListSet.add(word)
        }
        setMyListSet(updateListSet)
        addToList(updateListSet);
    }

    const addAllToMyList = () => {
        const updateListSet = new Set();
        if (myListSet.size < Object.keys(props.answerStats).length) {
            Object.keys(props.answerStats).forEach(word => updateListSet.add(word));
        } 
        setMyListSet(updateListSet);
        addToList(updateListSet);
    }

    return (
        <div>
            <h3>Answer Stats</h3>
            <Row>
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            {props.cardType === 'myList' ? (<th></th>) : (
                                <th className="add-button" style={{width: '18%'}} onClick={() => addAllToMyList()}>
                                    <span><Badge variant={myListSet.size === Object.keys(props.answerStats).length ? "danger" : "success"}>
                                        {myListSet.size === Object.keys(props.answerStats).length ? 'Remove All' : '+ Add All'}
                                    </Badge></span>
                                </th>
                            )}
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
                                            {props.cardType === 'myList' ? (<td></td>) : (
                                                <td className="add-button" onClick={() => addToMyList(word)}>
                                                    <span><Badge variant={myListSet.has(word) ? "danger" : "success"}>
                                                    {myListSet.has(word) ? '- My List' : '+ My List'}
                                                    </Badge></span>
                                                </td>
                                            )}
                                            <td>{word.split('=')[0]}</td>
                                            <td>{word.split('=')[1]}</td>
                                            <td>{props.answerStats[word]}</td>
                                        </tr>
                                    ) : (undefined) 
                                )
                            ) : (
                                <tr>
                                    <td colSpan="4">All correct! Galing!</td>
                                </tr>
                            )}

                        </tbody>
                    </Table>
                    {/* {props.cardType === 'myList' ? (undefined) : (<Button className="mb-1" onClick={addToList}>Add to My List</Button>)} */}
                </Col>
            </Row>
        </div>
    )
}