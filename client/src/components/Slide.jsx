import { UTurnLeftOutlined } from '@mui/icons-material';
import React from 'react';

const Slide = () => {
  return (
    <div className="bg-gray-200 py-20 px-8 lg:px-24 flex flex-col items-center justify-center mt-8 text-center h-[720px] bg-cover bg-center relative overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b" style={
        { backgroundImage: `url(https://res.cloudinary.com/dsja09265/image/upload/v1712608028/arnpwe7lkqktfhugouip.jpg)`,
         backgroundRepeat:'no-repeat',
         backgroundPosition:'center',
         backgroundSize:'cover'
    }}></div>

      {/* Content */}
      <div className="relative z-10 text-gray-300 font-semibold  -mt-16">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Welcome to HomelyHeaven</h1>
        <p className="text-lg lg:text-xl leading-relaxed mb-6">
          Your ultimate destination for finding the perfect home rentals. 
        </p>
        
      </div>
    </div>
  );
};

export default Slide;
