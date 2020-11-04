import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Poruka from './Poruka';

test('renderira sadrzaj', () => {
    const novaPoruka = {
        sadrzaj: 'Testiranje komponenti',
        vazno: true
    }

    const komponenta = render(
        <Poruka poruka={novaPoruka} />
    );

    komponenta.debug(); // detaljan ispis

    // html sadržaj se nalazi u containeru renderirane komponente
    expect(komponenta.container).toHaveTextContent('Testiranje komponenti');
});

test('klik poziva eventHandler', () => {
    const novaPoruka = {
        sadrzaj: 'Testiranje komponenti',
        vazno: true
    }

    // test handler funkcija da se vidi da dolazi do eventa
    const testHandler = jest.fn();

    const komponenta = render(
        <Poruka poruka={novaPoruka} promjenaVaznosti={testHandler} />
    );

    // dohvati botun iz komponente
    const button = komponenta.getByText('Označi kao nevažno');
    fireEvent.click(button); // pozovi event

    // očekivanje - izvršava se samo jednom
    expect(testHandler.mock.calls).toHaveLength(1);
});