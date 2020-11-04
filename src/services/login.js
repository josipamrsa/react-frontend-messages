import axios from 'axios';
const osnovniUrl = '/api/login';

const prijava = async podaci => {
    const odgovor = await axios.post(osnovniUrl, podaci);
    return odgovor.data;
}

export default { prijava }