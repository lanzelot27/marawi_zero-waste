import React from 'react';
import add2 from '../assets/add2.png';

const Additional1 = () => {
    return (
        <section className="flex items-start mt-4">
            <div className="mt-20 mr-12 ml-20">
                <h2 className=" text-justify mb-6"
                    style={{ fontSize: '27px', color: '#2E6130', letterSpacing: '0.1em', fontFamily: 'Ultra, serif', fontWeight: 'bold'  }}>
                    Clean Waste, Green Future:
                    Preserving Our Planet Starts 
                    with Responsible Disposal.
                </h2>
                <h3 className="md:text-3xl text-justify"
                    style={{ fontSize: '15px',  fontFamily: 'Caladea, serif', fontWeight: 'bold'  }}>
                    Clearing waste keeps our world green and clean. Let's dispose 
                    responsibly for a better tomorrow.
                </h3>
            </div>
            <img
                src={add2}
                alt="Waste Segregation"
                className="w-1/2 h-auto ml-auto"
                style={{ maxHeight: '400px', marginRight: 0 }}
            />
        </section>
    );
};

export default Additional1;
