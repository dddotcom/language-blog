import React, { createContext, useState, useEffect } from 'react';

export const MyListContext = createContext(); 

export const MyListContextProvider = (props) => {
    const [myList, setMyList ] = useState([]);

    return (
        <MyListContext.Provider value={{myList, setMyList}}>
            {props.children}
        </MyListContext.Provider>
    )
}