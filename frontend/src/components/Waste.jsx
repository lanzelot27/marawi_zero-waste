import React from 'react'
import WASTE from '../assets/waste'
import Segregation from './Segregation'

const Waste = () => {
    return (
        <section>
            <div className='max_padd_container py-12 xl:py-15 xl:w-[95%]'>
                <h3 className='section-heading'>KNOW YOUR WASTE!</h3>
                {/* container */}
                <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {WASTE.map((segregation) => (
                        <Segregation
                            key={segregation.id}
                            id={segregation.id}
                            name={segregation.name}
                            image={segregation.image}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Waste
