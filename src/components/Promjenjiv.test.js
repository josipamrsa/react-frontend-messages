import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Promjenjiv from './Promjenjiv';

describe('Komponenta <Promjenjiv />', () => {
    let komponenta;

    beforeEach(() => {
        komponenta = render(
            <Promjenjiv natpis='prikazi...'>
                <div className='testDiv' />
            </Promjenjiv>
        );
    });

    test('renderiranje djece', () => {
        expect(komponenta.container
            .querySelector('.testDiv'))
            .toBeDefined();
    });

    test('child element je skriven', () => {
        const div = komponenta.container
            .querySelector('.promjenjiviSadrzaj');
        expect(div).toHaveStyle('display: none');
    });

    test('nakon klika se prikazuje skriveni dokument', () => {
        const button = komponenta.getByText('prikazi...');
        fireEvent.click(button);
        
        const div = komponenta.container
            // querySelector dohvati prvi element
            .querySelector('.promjenjiviSadrzaj');
            // može biti i display: ""
        expect(div).not.toHaveStyle('display: none');
    });

    test('skriva se element nakon klika na odustani', () => {
        const button = komponenta.getByText('prikazi...');
        fireEvent.click(button);
        const odustani = komponenta.getByText('Odustani');
        fireEvent.click(odustani);
        
        const div = komponenta.container
            .querySelector('.promjenjiviSadrzaj');
        expect(div).toHaveStyle('display: none');
    });

    test('prikazani sadrzaj se moze sakriti', () => {
        const button = komponenta.container.querySelector('button');
        fireEvent.click(button);
    
        // drugi element pretrage (jer qSelector dohvaća prvi)
        const odustaniButton = komponenta.container.querySelector(
          'button:nth-child(2)'
        );
        fireEvent.click(odustaniButton);
    
        const div = komponenta.container.querySelector('.promjenjiviSadrzaj');
        expect(div).toHaveStyle('display: none');
      });
}); 