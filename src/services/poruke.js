import axios from 'axios';

/* const osnovniUrl = 'https://pmfst-node-poruke.herokuapp.com/api/poruke'; */ // dva na jednu
//const osnovniUrl = 'http://localhost:3001/api/poruke';
const osnovniUrl = '/api/poruke'; // relativna putanja!!

// ekvivalent pristupa svojstvu u C# 
let token = null; // token mijenja vrijednost pa ne smije biti const

const postaviToken = noviToken => {
    // "set" metoda
    token = `bearer ${noviToken}`;
} 

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
};

const stvori = async noviObjekt => {
    // definiranje headera sa autorizacijom
    const config = { headers: {Authorization: token} }
    // dohvati odgovor sa osnovnog url-a, novog objekta i konfiguracije
    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor;
};

const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt);
};

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`);
};

// imena pod kojima se exportaju funkcije
/* export default {
    dohvatiSve: dohvatiSve,
    stvori: stvori,
    osvjezi: osvjezi
}; */

// moze i ovako
export default { dohvatiSve, stvori, osvjezi, brisi, postaviToken };