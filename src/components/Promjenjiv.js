import React, {useState} from 'react';

const Promjenjiv = (props) => {
    const [vidljivo, postaviVidljivo] = useState(false);

    const sakrij = { display: vidljivo ? 'none' : '' }
    const prikazi = { display: vidljivo ? '' : 'none' }

    const promjenaVidljivosti = () => {
        postaviVidljivo(!vidljivo);
    }

    return (
        <div>
            <div style={sakrij}>
                <button onClick={promjenaVidljivosti}>{props.natpis}</button>
            </div>

            <div style={prikazi}>        
                {props.children}           
                <button onClick={promjenaVidljivosti}>Odustani</button>
            </div>
        </div>
    );
}

export default Promjenjiv;