import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

//const promise = axios.get("http://localhost:3001/poruke");
//console.log(promise);
//promise.then((response) => { console.log(response.data); });

// inače kako se piše po konvenciji
/* axios
  .get("http://localhost:3001/poruke")
  .then((response) => {
    const poruke = response.data;
}); */

ReactDOM.render(<App />,document.getElementById('root'));

