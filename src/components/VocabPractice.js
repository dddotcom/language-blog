import React, { useContext, useState, useEffect } from 'react';
import { TagalogContext } from '../contexts/TagalogContext';
import { VocabCard } from './VocabCard';
import { PracticeCard } from './PracticeCard';
import { Button } from 'react-bootstrap'
import _ from 'lodash';

export const VocabPractice = (props) => {
    const { adjectives, verbs } = useContext(TagalogContext)
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    const [cards, setCards] = useState([]);
    const [viewTagalog, setViewTagalog] = useState(true);

    const updateCurrentCardIndex = () => {
        console.log('update current card index');
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
            let newCards = [...cards];
            newCards = newCards.concat(adjectives);
            setCards(newCards);
        }
    }, [adjectives])
    
    useEffect(() => {
        if (verbs.length) {
            let newCards = [...cards];
            newCards = newCards.concat(verbs);
            setCards(newCards);
        }
    }, [verbs])

    useEffect(() => {
        if (currentCardIndex < 0) {
            if (cards.length) {
                setCurrentCardIndex(0);
            }
        }
    }, [cards])

    useEffect(() => {
        setCurrentCard({...cards[currentCardIndex]});
    }, [currentCardIndex])

    return cards.length ? (
        <div className="text-center mt-5">
            <h1>Vocab Practice</h1>
            <PracticeCard  word={viewTagalog ? currentCard.tagalog : currentCard.english} 
            translation={viewTagalog ? currentCard.english : currentCard.tagalog}
                sentence={viewTagalog ? currentCard.tagalogSentence : currentCard.englishSentence} 
                updateCurrentCardIndex = {updateCurrentCardIndex}
                type={_.startCase(currentCard.type)}/>
            {/* <VocabCard  tagalog={currentCard.tagalog} english={currentCard.english}
                tagalogSentence={currentCard.tagalogSentence} englishSentence={currentCard.englishSentence}
                type={_.startCase(currentCard.type)}/> */}
            <Button variant="primary" onClick={() => {
                let index = currentCardIndex
                if (index === cards.length -1) {
                    // loop back
                    index = 0;
                } else {
                    index++
                }
                setCurrentCardIndex(index)
            }}>Next</Button>
            <hr />
            <p> Showing {currentCardIndex+1} / {cards.length} </p>
        </div>
    ) : (
        <div className="text-center mt-5">
            <h1>Loading vocabulary...</h1>
        </div>
        )
}