import React from 'react';
import add1 from '../assets/add1.jpg';

const Additional = () => {
    return (
        <section className="flex items-start mt-8">
            <img
                src={add1}
                alt="Waste Segregation"
                className="w-1/2 h-auto mr-12 mb-4 md:mb-0"
                style={{ maxHeight: '400px', marginBottom: '3rem' }}
            />
            <div className="mt-20">
                <h2 className="text-justify mb-6"
                    style={{ fontSize: '28px', color: '#2E6130', letterSpacing: '0.1em', fontFamily: 'Ultra, serif', fontWeight: 'bold' }}>
                    Trash belongs in the bin, <br />
                    not on the ground—keep <br />
                    it clean. <br />
                </h2>
                <h3 className="md:text-3xl text-justify"
                    style={{ fontSize: '15px',  fontFamily: 'Caladea, serif', fontWeight: 'bold' }}>
                    Dispose of waste responsibly to maintain cleanliness and beauty in our surroundings. <br />
                    Let's work together for a cleaner environment. 
                </h3>
            </div>
        </section>
    );
};

export default Additional;
