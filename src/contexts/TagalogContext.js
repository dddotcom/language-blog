import React, { createContext, useState, useEffect } from 'react';

export const TagalogContext = createContext();

export const TagalogContextProvider = (props) => {
    const [adjectives, setAdjectives] = useState([]);
    const [verbs, setVerbs] = useState([]);
    // const [nouns, setNouns] = useState([]);
    // const [grammar, setGrammar] = useState([]);

    const stall = async(stallTime = 2000) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
    const getAdjectives = async () => {
        await stall();
        let adj = await Promise.resolve([
            { type: 'adjective', tagalog: 'basa', english: 'wet', 'tagalogSentence': 'Basang aso. ', 'englishSentence': 'Wet dog.'},
            { type: 'adjective', tagalog: 'bago', english: 'new', 'tagalogSentence': 'Bagong damit.', 'englishSentence': 'New clothing.'},
            { type: 'adjective', tagalog: 'bukas', english: 'open', 'tagalogSentence': 'Bukas na tindihan ', 'englishSentence': 'Open store'},
            { type: 'adjective', tagalog: 'galit', english: 'angry', 'tagalogSentence': 'Galit na nanay. ', 'englishSentence': 'Angry mom.'},
            { type: 'adjective', tagalog: 'gutom', english: 'hungry', 'tagalogSentence': 'Gutom na mga bata. ', 'englishSentence': 'Hungry children.'},
            { type: 'adjective', tagalog: 'lasing', english: 'drunk', 'tagalogSentence': 'Lasing na tito. ', 'englishSentence': 'Drunk tito.'},
        ])
        setAdjectives(adj);
    }
    
    const getVerbs = async () => {
        await stall();
        let verbs = await Promise.resolve([
            { type: 'um-verb', tagalog: 'dating', english: 'arrive', 'tagalogSentence': 'Dumating siya sa bahay', 'englishSentence': 'He/she arrived at the house'},
        ])
        setVerbs(verbs);
    }

    useEffect(() => {
        const asyncFn = async() => {
            await getVerbs();
            await getAdjectives();
        }
        
        asyncFn();
        return;
    }, [])

    return (
        <TagalogContext.Provider value={{adjectives, verbs}}>
            {props.children}
        </TagalogContext.Provider>
    )
}