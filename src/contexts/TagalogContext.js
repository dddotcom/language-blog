import React, { createContext, useState, useEffect } from 'react';
import * as adjectivesJson from '../salita/adjectives.json';
import * as verbsJson from '../salita/verbs.json';
import * as grammarJson from '../salita/grammar.json';
import * as nounsJson from '../salita/nouns.json';

export const TagalogContext = createContext();

export const TagalogContextProvider = (props) => {
    const [adjectives, setAdjectives] = useState([]);
    const [verbs, setVerbs] = useState([]);
    const [nouns, setNouns] = useState([]);
    const [grammar, setGrammar] = useState([]);

    const stall = async(stallTime = 2000) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
    const getAdjectives = async () => {
        await stall();
        let adj = adjectivesJson.default;
        setAdjectives(adj);
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

    useEffect(() => {
        const asyncFn = async() => {
            await getVerbs();
            await getAdjectives();
            await getGrammar();
            await getNouns();
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