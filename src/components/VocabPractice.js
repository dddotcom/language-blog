import React, { useContext, useState, useEffect } from 'react';
import { TagalogContext } from '../contexts/TagalogContext';
import { PracticeCard } from './PracticeCard';
import { AnswerStats } from './AnswerStats';
import { Button, Breadcrumb} from 'react-bootstrap'
import _ from 'lodash';
import { MyListContext } from '../contexts/MyListContext';

// TODO: 
// if user clicks add to my list, show some indication that my list was set
// wrong 3 times try
// session --> 
// save current state in local storage
// show progress bar?
// verb conjugation
// see a list of all words in the app

export const VocabPractice = (props) => {
    const { adjectives, verbs, getAdjectivesBySet, shuffleCards, adjectiveSets } = useContext(TagalogContext)
    const { myList } = useContext(MyListContext);
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
        if (cardType.includes('adjective')) {
            newCards = _.cloneDeep(getAdjectivesBySet(cardType));
        } else {
            switch (cardType) {
                case 'verb': 
                    if (verbs.length) {
                        newCards = _.cloneDeep(verbs);
                    }
                    break;
                case 'myList':
                    if (myList.length) {
                        newCards = _.cloneDeep(myList);
                    }
                    break;
                default:
                    // show all
                    newCards = _.cloneDeep(adjectives);
                    newCards = newCards.concat(_.cloneDeep(verbs))
            } 
        }

        setCards(shuffleCards(newCards));
        setCurrentCardIndex(0);
        setCurrentCard(newCards[0]);
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

    const vocabPracticeBreadcrumbBar = () => {
        return (
            <div className="text-center practice-menu">
            <p className="mt-3 mb-3 ml-auto mr-auto p-3 toggle-language" onClick={() => setViewTagalog(!viewTagalog)}>
                {viewTagalog ? 'Tagalog -> English' : 'English -> Tagalog'}</p>
            <Breadcrumb className="breadcrumb-style m-auto">
                <Breadcrumb.Item  active={cardType==='verb'} onClick={() => setCardTypeToView('verb')}>Verbs</Breadcrumb.Item>
                <Breadcrumb.Item  active={cardType==='myList'} onClick={() => setCardTypeToView('myList')}>My List</Breadcrumb.Item>
                {adjectiveSets.map(setName => {
                    return (
                        <Breadcrumb.Item key={setName} active={cardType === setName}  onClick={() => setCardTypeToView(setName)}>{_.startCase(setName)}</Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
        )
    }

    return (
    <div className="text-center mt-5">
        <h1>Vocab Practice</h1>
        {vocabPracticeBreadcrumbBar()}

        { cards.length && currentCard ?  (
            cardsGuessedCorrect.length !== cards.length ? (
                <div>

                    { cards.map(card => {
                        return (
                            (card.removeFromList || (card.tagalog !== currentCard.tagalog) ) ? (undefined) : (
                                <PracticeCard key={card.tagalog}  word={viewTagalog ? card.tagalog : card.english} 
                                translation={viewTagalog ? card.english : card.tagalog}
                                updateCurrentCardIndex = {updateCurrentCardIndex}
                                type={_.startCase(card.type)}/>
                            )
                        )
                    })}
                    <hr />
                    {cardsGuessedCorrect.length !== cards.length ? (
                        <p> {cards.length - cardsGuessedCorrect.length} Cards Left</p>
                    ) : (undefined)}
                </div> ): (
                <div>
                    <p>Congrats! Done with vocab Set!</p>
                    <AnswerStats answerStats={answerStats} cardType={cardType} />
                    <Button onClick={reset}>Practice Again</Button>
                </div>) 
        ): (
        <div className="text-center mt-5">
            <h3>No entries in vocabulary practice list...</h3>
        </div>
        ) }
    </div>
    )
}