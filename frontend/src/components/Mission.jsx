import React from 'react';
import about from '../assets/about.jpg';

const Mission = () => {
    return (
        <section className="flex items-start mt-8 md:mt-16 px-8">
            <img
                src={about}
                alt="About Us"
                className="w-1/2 h-auto mb-4 md:mb-0 rounded-3xl md:ml-8 mr-8 md:mr-16"
                style={{ maxHeight: '400px', maxWidth: '550px', marginBottom: '3rem' }}
            />
            <div className="flex-1 mr-4 md:mr-12">
                <h3 className="md:text-3xl text-justify"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                    Welcome to MARAWI Zero-Waste, a cutting-edge web-based application designed to optimize waste 
                    collection and management at MSU-Marawi City. Our team is dedicated to addressing the 
                    challenges faced in waste management and promoting eco-conscious practices within the 
                    MSU-Marawi community.
                </h3>
                <h3 className="text-justify mt-10"
                    style={{ fontSize: '25px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5', color: '#015A00', fontWeight: 'bold', textDecoration: 'underline', letterSpacing: '0.2em' }}>
                    OUR MISSION
                </h3>
                <h3 className="text-justify mt-2"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                    At MARAWI Zero-Waste, our mission is clear: to enhance efficiency, promote sustainability, and 
                    foster a cleaner campus environment. We understand the importance of proper waste disposal 
                    and its impact on both the environment and community well-being.
                </h3>
                <h3 className="text-justify mt-6"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                    Through MARAWI Zero-Waste, users gain access to a range of features aimed at optimizing waste 
                    collection processes. Real-time mapping allows for precise tracking of waste collection 
                    points, ensuring timely pickups and reducing instances of missed collections. 
                    Our scheduling functionality streamlines waste collection logistics, making it easier 
                    for students, staff, and residents to coordinate and manage their waste disposal needs.
                </h3>
            </div>
        </section>
    );
};

export default Mission;
