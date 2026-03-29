import React from 'react';

const CAbout = () => {
    return (
        <section className='flex flex-col md:flex-row items-start px-4 md:px-8 md:pl-16 mt-6 md:mt-0'>
            <div className="flex-1 mr-2 md:mr-12">
                <h3 className="text-justify"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                    But MARAWI Zero-Waste is more than just a scheduling tool. We are committed to educating and empowering
                    the MSU-Marawi community to make informed decisions about waste management. Our platform offers
                    comprehensive educational resources on waste categorization, disposal methods, and environmental
                    impact, helping users understand their role in creating a cleaner, more sustainable campus.
                </h3>
                <h3 className="text-justify mt-6"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                    Beyond its immediate benefits, MARAWI Zero-Waste holds significant long-term implications for MSU-Marawi
                    and the wider community. By promoting responsible waste disposal practices, we aim to reduce
                    pollution, enhance cleanliness, and minimize the place's ecological footprint. Through data
                    analysis and collaboration with the City Government Services Office (CGSO), we strive to
                    contribute to more efficient city-wide waste management practices.
                </h3>
                <h3 className="text-justify mt-6"
                    style={{ fontSize: '15px', fontFamily: 'Roboto, sans-serif', lineHeight: '1.5', marginBottom: '3rem' }}>
                    Join us in our mission to create a cleaner, healthier, and more sustainable future at MSU-Marawi
                    with MARAWI Zero-Waste. Together, we can make a meaningful difference in our environment and community.
                </h3>
            </div>
        </section>
    );
}

export default CAbout;
