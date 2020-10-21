import axios from 'axios';

//const osnovniUrl = '/api/poruke'; // relativna putanja!!
const osnovniUrl = 'https://pmfst-node-poruke.herokuapp.com/api/poruke'; // dva na jednu
//const osnovniUrl = 'http://localhost:3001/api/poruke'; 

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
};

const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt);
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
export default { dohvatiSve, stvori, osvjezi, brisi };