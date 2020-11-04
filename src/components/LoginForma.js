import React from 'react';


const LoginForma = (props) => (
    <form onSubmit={props.userLogin}>
            <div>Korisničko ime: 
                <input type='text' 
                        value={props.username} 
                        name='Username' 
                        onChange={props.promjenaImena} />
            </div>

            <div>Lozinka:
                <input type='password' 
                        value={props.pass} 
                        name='Pass'
                        onChange={props.promjenaLozinke} />
            </div>          
            <button type='submit'>Prijava</button>     
        </form>
);

export default LoginForma;