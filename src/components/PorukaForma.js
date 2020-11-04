import React, { useState } from 'react'
const PorukaForma = (props) => {
    const [unosPoruke, postaviUnos] = useState('Unesi poruku...');
    const promjenaUnosa = (e) => {
        postaviUnos(e.target.value);
    }

    const novaPoruka = (e) => {
        e.preventDefault();
        // novi objekt spremit će preko props.spremiPoruku metode (slanje "gore")
        props.spremiPoruku({            
            sadrzaj: unosPoruke,
            datum: new Date().toISOString(),
            vazno: Math.random() > 0.5 // vraća true/false 50/50 puta
        });

        postaviUnos('');
    }

    return (
        <form onSubmit={novaPoruka}>
            <input value={unosPoruke} 
                    onChange={promjenaUnosa} />
            <button type="submit">Spremi</button>   
        </form>
    )
}
export default PorukaForma