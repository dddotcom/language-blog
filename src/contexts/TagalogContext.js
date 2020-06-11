import React, { createContext, useState, useEffect } from 'react';
import * as adjectivesJson from '../salita/adjectives.json';
import * as verbsJson from '../salita/verbs.json';
import * as grammarJson from '../salita/grammar.json';
import * as nounsJson from '../salita/nouns.json';

export const TagalogContext = createContext();

export const TagalogContextProvider = (props) => {
    const adjectiveSets = ['adjectiveI', 'adjectiveIa', 'adjectiveII'];

    const [adjectives, setAdjectives] = useState([]);
    const [verbs, setVerbs] = useState([]);
    const [nouns, setNouns] = useState([]);
    const [grammar, setGrammar] = useState([]);

    const stall = async(stallTime = 200) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
    const getAdjectives = async () => {
        await stall();
        let adj = adjectivesJson.default;
        setAdjectives(adj);
    }

    const getAdjectivesBySet = (setName) => {
        return adjectivesJson.default.filter(adj => adj.type === setName);
    }
    
    const getVerbs = async () => {
        await stall();
        let vbs = verbsJson.default;
        setVerbs(vbs);
    }

    const getNouns = async () => {
        await stall();
        let ns = nounsJson.default;
        setNouns(ns);
    }
    
    const getGrammar = async () => {
        await stall();
        let gmr = grammarJson.default;
        setGrammar(gmr);
    }

    const shuffleCards = (cards) => {
        // fisher yates shuffle
        // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
        for (let i = cards.length -1; i > 0; i--) {
            // get random number
            const randIndex = Math.floor(Math.random() *i);
            const temp = cards[randIndex];
            //exchange cards[randIndex] and cards[i]
            cards[randIndex] = cards[i];
            cards[i] = temp;
        }
        return cards;
    }

    useEffect(() => {
        const asyncFn = async() => {
            await getVerbs();
            await getAdjectives();
            await getGrammar();
            await getNouns();
        }
        
        asyncFn();
        return;
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TagalogContext.Provider value={{adjectives, verbs, nouns, getAdjectivesBySet, shuffleCards, adjectiveSets}}>
            {props.children}
        </TagalogContext.Provider>
    )
}