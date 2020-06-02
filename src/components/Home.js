import React from 'react';
import Puto from '../puto.png'

export const Home = (props) => {
    return (
        <div className="text-center">
            <h1>Anak ng puto!</h1>
            <img src={Puto} />
            <p>Masasarap ang mga puto, di ba?!</p>
            <p>may original, may buko pandan, may ube...gutom na ako</p>
        </div>
    )
}