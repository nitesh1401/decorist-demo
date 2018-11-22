import React from 'react';
import ImgHero from './img-hero.jpg';

export default function(props) {
    return (
        <div style={{position:'relative'}} >
            <img src={ImgHero} style={{top: '50px', position: 'absolute', backgroundAttachment: 'fixed', width: '100%'}} />
        </div>
    );
};