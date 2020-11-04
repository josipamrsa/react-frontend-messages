import React, {useState} from 'react';
import PropTypes from 'prop-types';

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

            <div style={prikazi} className='promjenjiviSadrzaj'>        
                {props.children}           
                <button onClick={promjenaVidljivosti}>Odustani</button>
            </div>
        </div>
    );
}

/* Promjenjiv.PropTypes = { natpis: PropTypes.string.isRequired } */

export default Promjenjiv;