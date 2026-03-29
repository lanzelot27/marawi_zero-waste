import React from 'react';

const Hero = () => {
  return (
    <section className='relative h-screen bg-hero bg-cover bg-no-repeat bg-center w-full'>
      <div className='absolute inset-0 bg-green-900 bg-opacity-70'></div>

      {/* Content */}
      <div className='max_padd_container relative top-40 xs:top-30 text-left text-white'>
        <div className='text-left'>
          <h1 style={{ fontFamily: "'Bungee Inline', cursive", textShadow: '0 0 5px #324e3b, 0 0 10px #324e3b, 0 0 15px #324e3b, 0 0 20px #324e3b' }}>
            <span style={{ fontSize: '30px' }}>TRANSFORM YOUR </span>
            <span style={{ fontSize: '30px', color: '#35A722' }}>ENVIRONMENT</span>
          </h1>
          <h1 style={{ fontFamily: "'Bungee Inline', cursive", textShadow: '0 0 5px #324e3b, 0 0 10px #324e3b, 0 0 15px #324e3b, 0 0 20px #324e3b' }}>
            <span style={{ fontSize: '30px' }}>WITH RESPONSIBLE WASTE</span>
          </h1>
          <h1 style={{ fontFamily: "'Bungee Inline', cursive", textShadow: '0 0 5px #324e3b, 0 0 10px #324e3b, 0 0 15px #324e3b, 0 0 20px #324e3b' }}>
            <span style={{ fontSize: '30px' }}>SOLUTIONS</span>
          </h1>
        </div>
        <p className='text-lg md:text-xl font-serif text-white text-justify my-8' style={{ fontFamily: "'Caladea', serif", fontSize: '16px' }}>
          It will serve as a comprehensive resource for waste-related matters,
          offering users information on various waste categories, suitable
          disposal methods, and a real-time waste collection map that optimizes
          pickup locations and schedules.
        </p>
      </div>
    </section>
  );
};

export default Hero;
