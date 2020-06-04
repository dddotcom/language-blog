import React, { useContext, useState, useEffect } from 'react';
import { TagalogContext } from '../contexts/TagalogContext';
import { PracticeCard } from './PracticeCard';
import { AnswerStats } from './AnswerStats';
import { Button, Breadcrumb} from 'react-bootstrap'
import _ from 'lodash';

// TODO: RANDOMIZE the vocab, 
// wrong shuffle back into random spot (manual override and 3 times try)
// session --> 
// save current state in local storage
// show progress bar?
// verb conjugation

export const VocabPractice = (props) => {
    const { adjectives, verbs, getAdjectivesBySet } = useContext(TagalogContext)
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    const [cards, setCards] = useState([]);
    const [cardsGuessedCorrect, setCardsGuessedCorrect] = useState([]);
    const [answerStats, setAnswerStats] = useState({})
    const [viewTagalog, setViewTagalog] = useState(true);
    const [cardType, setCardType] = useState('adjectiveI');

    const updateCurrentCardIndex = (removeFromList) => {
        removeCardFromList(removeFromList);
        updateAnswerStats(removeFromList);

        let index = currentCardIndex
        if (index === cards.length -1) {
            // loop back
            index = 0;
        } else {
            index++
        }

        // set current card
        let newCurrentCard = cards[index];
        // TODO is here a better way to set index without looping through entire array to find the next
        // good index?
        while(newCurrentCard.removeFromList 
            && ((removeFromList ? cardsGuessedCorrect.length + 1 : cardsGuessedCorrect.length) < cards.length)
        ) {
            if (index === cards.length -1) {
                // loop back
                index = 0;
            } else {
                index++
            }
            newCurrentCard = cards[index];
        }

        setCurrentCardIndex(index)
        setCurrentCard(newCurrentCard);
    }

    useEffect(() => {
        setCardTypeToView('adjectiveI')
    }, [adjectives]) // eslint-disable-line react-hooks/exhaustive-deps

    const setCardTypeToView = (cardType) => {
        let newCards = [];
        setCardType(cardType)
        switch (cardType) {
            case 'verb': 
                if (verbs.length) {
                    newCards = _.cloneDeep(verbs);
                }
                setCards(newCards);
                setCurrentCardIndex(0);
                setCurrentCard(newCards[0]);
                break;
            case 'adjectiveI': 
                if (adjectives.length) {
                    newCards = _.cloneDeep(getAdjectivesBySet(cardType));
                }
                setCards(newCards);
                setCurrentCardIndex(0);
                setCurrentCard(newCards[0]);
                break;
            case 'adjectiveII': 
                if (adjectives.length) {
                    newCards = _.cloneDeep(getAdjectivesBySet(cardType));
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

        setAnswerStats({});
        setCardsGuessedCorrect([]);
    }

    const removeCardFromList = (removeFromList) => {
        //set correct state
        currentCard.removeFromList = removeFromList;
        if (removeFromList) {
            const correctCards = _.cloneDeep(cardsGuessedCorrect);
            correctCards.push(_.cloneDeep(currentCard));
            setCardsGuessedCorrect(correctCards)
        }
    }

    const updateAnswerStats = (removeFromList) => {
        // set answer stats
        if (!removeFromList) {
            const key = `${currentCard.tagalog}=${currentCard.english}`
            const newAnswerStats = _.cloneDeep(answerStats);
            if (newAnswerStats.hasOwnProperty(key)) {
                    newAnswerStats[key]++;
            } else {
                newAnswerStats[key] = 1;
            }
            setAnswerStats(newAnswerStats);
        }
    }

    const reset = () => {
        setCardTypeToView(cardType);
    }

    return cards.length && currentCard ? 
    (<div className="text-center mt-5">
        <h1>Vocab Practice</h1>
        <div className="text-center practice-menu">
            <p className="mt-3 mb-3 ml-auto mr-auto p-3 toggle-language" onClick={() => setViewTagalog(!viewTagalog)}>
                {viewTagalog ? 'Tagalog -> English' : 'English -> Tagalog'}</p>
            <Breadcrumb className="breadcrumb-style m-auto">
                <Breadcrumb.Item  active={cardType==='verb'} onClick={() => setCardTypeToView('verb')}>Verbs</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjectiveI'}  onClick={() => setCardTypeToView('adjectiveI')}>Adjectives I</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjectiveII'}  onClick={() => setCardTypeToView('adjectiveII')}>Adjectives II</Breadcrumb.Item>
                {/* <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives III</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives IV</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives V</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives VI</Breadcrumb.Item>
                <Breadcrumb.Item active={cardType === 'adjective'}  onClick={() => setCardTypeToView('adjective')}>Adjectives VII</Breadcrumb.Item> */}
            </Breadcrumb>
        </div>
        { cardsGuessedCorrect.length !== cards.length ? (
            <div>

                { cards.map(card => {
                    return (
                        (card.removeFromList || (card.tagalog !== currentCard.tagalog) ) ? (undefined) : (
                            <PracticeCard key={card.tagalog}  word={viewTagalog ? card.tagalog : card.english} 
                            translation={viewTagalog ? card.english : card.tagalog}
                            sentence={viewTagalog ? card.tagalogSentence : card.englishSentence} 
                            updateCurrentCardIndex = {updateCurrentCardIndex}
                            type={_.startCase(card.type)}/>
                        )
                    )
                })}
            </div>
        ) : (
        <div>
            <p>Congrats! Done with vocab Set!</p>
            <AnswerStats answerStats={answerStats} />
            <Button onClick={reset}>Practice Again</Button>
        </div>) }
        <hr />
        {cardsGuessedCorrect.length !== cards.length ? (
            <p> {cards.length - cardsGuessedCorrect.length} Cards Left</p>
        ) : (undefined)}
    </div>) : 
    (
        <div className="text-center mt-5">
            <h1>Loading vocabulary practice list...</h1>
        </div>
        )
}