import React from 'react';
import ImgHero from './assets/images/img-hero.jpg';

export default function(props) {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={ImgHero}
        alt="Hero"
        style={{
          top: '60px',
          position: 'absolute',
          backgroundAttachment: 'fixed',
          width: '100%',
          height: '600px'
        }}
      />
    </div>
  );
}
