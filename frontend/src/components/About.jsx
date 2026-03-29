import React from 'react';

const About = () => {
    return (
        <section className='relative' style={{ minHeight: '30vh', backgroundImage: 'url("src/assets/msu1.png")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <div className='absolute inset-0 bg-green-900 bg-opacity-70'></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 style={{ fontFamily: 'Calistoga', fontSize: '25px', color: '#ffffff', letterSpacing: '0.1em', paddingTop: '70px', textDecoration: 'underline' }}>ABOUT US</h1>
            </div>
        </section>
    );
};

export default About;
