import React, { useContext, useState, useEffect } from 'react';
import { TagalogContext } from '../contexts/TagalogContext';
import { PracticeCard } from './PracticeCard';
import { Button, Breadcrumb} from 'react-bootstrap'
import _ from 'lodash';

export const VocabPractice = (props) => {
    const { adjectives, verbs } = useContext(TagalogContext)
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    const [cards, setCards] = useState([]);
    const [viewTagalog, setViewTagalog] = useState(true);
    const [cardType, setCardType] = useState('');

    const updateCurrentCardIndex = () => {
        let index = currentCardIndex
        if (index === cards.length -1) {
            // loop back
            index = 0;
        } else {
            index++
        }
        setCurrentCardIndex(index)
        setCurrentCard(cards[index]);
    }
    useEffect(() => {
        setCardTypeToView('adjective')
    }, [adjectives])

    const setCardTypeToView = (cardType) => {
        let newCards = [];
        setCardType(cardType)
        switch (cardType) {
            case 'verb': 
                if (verbs.length) {
                    newCards = newCards.concat(verbs);
                }
                setCards(newCards);
                setCurrentCardIndex(0);
                setCurrentCard(newCards[0]);
                break;
            case 'adjective': 
                if (adjectives.length) {
                    newCards = newCards.concat(adjectives);
                }
                setCards(newCards);
                setCurrentCardIndex(0);
                setCurrentCard(newCards[0]);
                break;
            default:
                // show all
                newCards = _.cloneDeep(adjectives);
                newCards = newCards.concat(_.cloneDeep(verbs))
                setCards(newCards);
                setCurrentCardIndex(0);
                setCurrentCard(newCards[0]);
        } 
    }

    return cards.length && currentCard ? 
    (<div className="text-center mt-5">
        <h1>Vocab Practice</h1>
        <div className="text-center practice-menu">
            <p className="mt-3 mb-3 ml-auto mr-auto p-3 toggle-language" onClick={() => setViewTagalog(!viewTagalog)}>
                {viewTagalog ? 'Tagalog -> English' : 'English -> Tagalog'}</p>
            <Breadcrumb className="breadcrumb-style m-auto">
                <Breadcrumb.Item  active={cardType==='verb'} onClick={() => setCardTypeToView('verb')}>Verbs</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <PracticeCard  word={viewTagalog ? currentCard.tagalog : currentCard.english} 
        translation={viewTagalog ? currentCard.english : currentCard.tagalog}
            sentence={viewTagalog ? currentCard.tagalogSentence : currentCard.englishSentence} 
            updateCurrentCardIndex = {updateCurrentCardIndex}
            type={_.startCase(currentCard.type)}/>
        <Button variant="primary" onClick={() => updateCurrentCardIndex()}>Next</Button>
        <hr />
        <p> Showing {currentCardIndex+1} / {cards.length} </p>
    </div>) : 
    (
        <div className="text-center mt-5">
            <h1>Loading vocabulary practice list...</h1>
        </div>
        )
}