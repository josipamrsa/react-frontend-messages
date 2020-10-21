import React, { useState, useEffect } from 'react';
import Poruka from './components/Poruka';
import porukeServer from './services/poruke';

const App = (props) => {
    const [poruke, postaviPoruke] = useState([]);
    const [unosPoruke, postaviUnos] = useState("Unesi poruku: ");
    const [ispisSve, postaviIspis] = useState(true);

    // učitavanje podataka sa servera
    useEffect(() => {
        console.log("Effect hook");
        porukeServer.dohvatiSve().then((response) =>
            {
                console.log("Podaci učitani");
                postaviPoruke(response.data);
            });
    }, []);

    // ako ispisSve ima true vrijednost, ispisiva sve
    // ako ima false, filtrira poruke po vaznosti
    const porukeZaIspis = ispisSve ? 
        poruke : poruke.filter(p => p.vazno === true);

    // prima event kad je onsubmit, onchange, itd.
    const novaPoruka = (e) => {
        e.preventDefault();
        const noviObjekt = {
            //id: poruke.length + 1, // duljina + 1 - funkcionalnost izvrsava server
            sadrzaj: unosPoruke,
            datum: new Date().toISOString(),
            vazno: Math.random() > 0.5 // vraća true/false 50/50 puta
        }

        porukeServer.stvori(noviObjekt).then((response) => 
            {
                console.log(response);
                postaviPoruke(poruke.concat(response.data));
                postaviUnos('');
            });
    };

    // controlled component
    const promjenaUnosa = (e) => {
        postaviUnos(e.target.value);
    }

    // delegat - event handler za promjenu poruke
    const promjenaVaznostiPoruke = (id) => {
        const poruka = poruke.find(p => p.id === id);

        const novaPoruka = {
            ...poruka,
            vazno: !poruka.vazno
        };

        porukeServer.osvjezi(id, novaPoruka).then((response) => {
                console.log(response);      
                postaviPoruke(
                    poruke.map(p => p.id !== id ? p : response.data)
                );     
            });
    }

    const brisanjePoruke = (id) => {
        porukeServer.brisi(id).then((response) => {
            console.log(response);
            // filtriranje poruka bez izbrisane
            postaviPoruke(poruke.filter(p => p.id !== id));
        });
    };

    return (
      <div>
        <h1>Poruke - Novo</h1>
        <div>
            <button onClick={ () => postaviIspis(!ispisSve) }>
                Prikaži {ispisSve ? "samo važne" : "sve"}
            </button>
        </div>
        <ul>
            {/* ne može se slati samo ime funkcije nego ovako */}
          {porukeZaIspis.map(p => 
           <Poruka 
                key={p.id} 
                poruka={p} 
                promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)}
                brisiPoruku={() => brisanjePoruke(p.id)} /> 
            )
           }
        </ul>
        <form onSubmit={novaPoruka}>
            <input value={unosPoruke} onChange={promjenaUnosa} />
            <button type="submit">Spremi</button>   
        </form>
      </div>
    )
  };

export default App;