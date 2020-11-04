import React, { useState, useEffect } from 'react';
import Poruka from './components/Poruka';
import LoginForma from './components/LoginForma';
import Promjenjiv from './components/Promjenjiv';
import porukeServer from './services/poruke';
import loginServer from './services/login';

const App = (props) => {
    const [poruke, postaviPoruke] = useState([]);
    const [unosPoruke, postaviUnos] = useState("Unesi poruku: ");
    const [ispisSve, postaviIspis] = useState(true);
    const [username, postaviUsername] = useState('');
    const [pass, postaviPass] = useState('');
    const [korisnik, postaviKorisnika] = useState(null);
    /* const [loginVidljiv, postaviLoginVidljiv] = useState(false); */

    // učitavanje podataka sa servera
    useEffect(() => {
        console.log("Effect hook");
        porukeServer.dohvatiSve().then((response) =>
            {
                console.log("Podaci učitani");
                postaviPoruke(response.data);
            });
    }, []);

    // provjera ulogiranog korisnika 
    useEffect(() => {
        const prijKorisnik = window.localStorage.getItem('prijavljeniKorisnik');
        if (prijKorisnik) {
            const prijavljeni = JSON.parse(prijKorisnik);
            postaviKorisnika(prijavljeni);
            porukeServer.postaviToken(prijavljeni.token);
        }
    }, []);

    // ako ispisSve ima true vrijednost, ispisiva sve
    // ako ima false, filtrira poruke po vaznosti
    const porukeZaIspis = ispisSve ? 
        poruke : poruke.filter(p => p.vazno === true);

    // prima event kad je onsubmit, onchange, itd.
    const novaPoruka = (e) => {
        e.preventDefault();
        const noviObjekt = {            
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

    const userLogin = async (e) => {
        e.preventDefault();
        //console.log("Prijava: ", username, "-", pass);
        try {
            const odgovor = await loginServer.prijava({ username, pass });
            // poslije odgovora
            window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(odgovor));
            porukeServer.postaviToken(odgovor.token);
            postaviKorisnika(odgovor);
            postaviUsername('');
            postaviPass('');
        }
        catch (ex) {
            alert('Neispravni podaci');
            console.log(ex.message);
        }
    };

    const loginForma = () => {    
        return (
            <Promjenjiv natpis='Prijavi se'>       
             {/* props.children > pod ovom komponentom */}                         
                    <LoginForma 
                        username={username}
                        pass={pass}
                        /* Destrukturiranje e.targeta zbog prebacivanja u zasebnu komp */
                        promjenaImena={({ target }) => postaviUsername(target.value)}
                        promjenaLozinke={({ target }) => postaviPass(target.value)}
                        userLogin={userLogin} />                                 
            </Promjenjiv>
        );
    };

    const porukaForma = () => (
        /* Može se dodati ista logika kao i kod login forme */
        <form onSubmit={novaPoruka}>
            <input value={unosPoruke} onChange={promjenaUnosa} />
            <button type="submit">Spremi</button>   
        </form>
    );

    return (
      <div>
        <h1>Poruke</h1>
        {/* 
            {korisnik === null && loginForma()}
            {korisnik !== null && porukaForma()}
        */}
        
        { korisnik === null ? loginForma() : 
            <div>
                <p>Prijavljeni ste kao: {korisnik.ime}</p>
                {porukaForma()}
            </div> }

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
            )}
        </ul>
      </div>
    )
  };

export default App;