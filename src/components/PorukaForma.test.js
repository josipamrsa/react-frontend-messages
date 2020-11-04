import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import PorukaForma from './PorukaForma';

test('<PorukaForma> poziva onSubmit i mijenja stanje roditelja', () =>{
    const stvoriPoruku = jest.fn();
   
    // renderiraj formu
    const komponenta = render(
      <PorukaForma spremiPoruku={stvoriPoruku} />
    );
   
    // dohvati tražene elemente za testiranje
    const input = komponenta.container.querySelector('input');
    const forma = komponenta.container.querySelector('form');
   
    // triggeraj event za input da upiše slijedeće
    fireEvent.change(input, {
      target: {value: 'testiranje forme nije bas jednostavno'}
    });

    // testira se event submit
    fireEvent.submit(forma);
   
    /* console.log(stvoriPoruku.mock); */
    /* console.log(stvoriPoruku.mock.calls); */
    // mock calls bi trebao biti samo 1
    expect(stvoriPoruku.mock.calls).toHaveLength(1);
    // i sadržaj tog mock calla bi trebao imati definiranu poruku
    expect(stvoriPoruku.mock.calls[0][0].sadrzaj).toBe('testiranje forme nije bas jednostavno');
    // broj poziva ovisi o broju renderiranih komponenti prethodno
    // dodati 2 poruke pa bi trebalo postojati 2 mock calla 
});