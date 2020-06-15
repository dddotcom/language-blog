import React, { useContext, useState, useEffect } from 'react';
import { TagalogContext } from '../contexts/TagalogContext';
import { VocabCard } from './VocabCard';
import { Button, Table, Row, Col, Form, Badge } from 'react-bootstrap'
import { MyListContext } from '../contexts/MyListContext';
import _ from 'lodash';
import './AnswerStats.css'

export const VocabList = (props) => {
    const { setMyList, myList } = useContext(MyListContext)
    const [myListSet, setMyListSet] = useState(new Set());
    const { adjectives, verbs } = useContext(TagalogContext)
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    const [cards, setCards] = useState([]);

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
        if (myListSet.size < cards.length) {
            console.log(cards.length);
            cards.forEach(card => {
                updateListSet.add(`${card.tagalog}=${card.english}`)
            });
        } 
        console.log(updateListSet)
        setMyListSet(updateListSet);
        addToList(updateListSet);
    }

    const updateCurrentCardIndex = () => {
        let index = currentCardIndex
        if (index === cards.length -1) {
            // loop back
            index = 0;
        } else {
            index++
        }
        setCurrentCardIndex(index)
    }
    useEffect(() => {
        if (adjectives.length) {
            
            let newCards = _.cloneDeep(adjectives);
            console.log(adjectives.length, newCards.length)
            setCards(newCards);
        }
    }, [adjectives]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        // if (myList.length) {
        //     console.log(myListSet.size, myList.length)
        //     const updateListSet = new Set();
        //     if (myListSet.size < myList.length) {
        //         myList.forEach(card => {
        //             updateListSet.add(`${card.tagalog}=${card.english}`)
        //         });
        //         console.log('set my list set', updateListSet)
        //         setMyListSet(updateListSet);
        //     } 
        // }
    }, [myList]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (currentCardIndex < 0) {
    //         if (cards.length) {
    //             setCurrentCardIndex(0);
    //         }
    //     }
    // }, [cards]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     setCurrentCard({...cards[currentCardIndex]});
    // }, [currentCardIndex]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        const searchTerm = form.elements.translation.value;
        console.log(searchTerm)

        if (!searchTerm || searchTerm === '') {
            resetCards();
            return;
        }

        const newCards = cards.filter(card => {
            return (card.tagalog.includes(searchTerm.toLowerCase()) || (card.english.includes(searchTerm.toLowerCase())));
        })

        setCards(newCards);
    }

    const resetCards = () => {
        let newCards = _.cloneDeep(adjectives);
        setCards(newCards);
    }

    return <div className="text-center mt-5">
        <h1>Vocab List</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="translation">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form.Control autoFocus type="text" placeholder="Search..." size="lg" className="text-center"/>
                </Col>
            </Form.Group>
        </Form>
        {cards.length ? (
        <div >
            <Row>
                <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th></th>
                        {/* {props.cardType === 'myList' ? (<th></th>) : (
                            <th className="add-button" style={{width: '18%'}} onClick={() => addAllToMyList()}>
                                <p>{cards.length} {myListSet.size}</p>
                                <span><Badge variant={myListSet.size === cards.length ? "danger" : "success"}>
                                    {myListSet.size === cards.length ? 'Remove All' : '+ Add All'}
                                </Badge></span>
                            </th>
                        )} */}
                        <th>Tagalog Word</th>
                        <th>English Word</th>
                    </tr>
                    </thead>
                    <tbody>

                        {cards.map((card, index) => {
                            return (
                                <tr key={`${card.tagalog} ${index}`}>
                                    <td></td>
                                    {/* <td className="add-button" onClick={() => addToMyList(`${card.tagalog}=${card.english}`)}>
                                        <span><Badge variant={myListSet.has(`${card.tagalog}=${card.english}`) ? "danger" : "success"}>
                                        {myListSet.has(`${card.tagalog}=${card.english}`) ? '- My List' : '+ My List'}
                                        </Badge></span>
                                    </td> */}
                                    <td>{card.tagalog}</td>
                                    <td>{card.english}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
        </div>
    ): (
        <div>
            <h1>Loading vocabulary list...</h1>
        </div>
    )}
    </div>
}