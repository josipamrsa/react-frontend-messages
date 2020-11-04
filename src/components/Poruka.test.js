import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, findAllByTestId} from '@testing-library/react';
import Poruka from './Poruka';

test('renderira sadrzaj', () => {
    const novaPoruka = {
        sadrzaj: 'Testiranje komponenti',
        vazno: true
    }

    const komponenta = render(
        <Poruka poruka={novaPoruka} />
    );

    // html sadržaj se nalazi u containeru renderirane komponente
    expect(komponenta.container).toHaveTextContent('Testiranje komponenti');
});