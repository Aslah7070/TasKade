"use client"

import React from 'react';

import { ImagesSliderDemo } from '../user/common/ImageSlider';


function Homepage() {

  return (
    <div className=" w-full  md:flex h-screen justify-between items-start  bg-white dark:bg-black text-white font-sans">
      <div className='md:w-3/5 h-4/5 flex items-center  justify-center '>
     <ImagesSliderDemo/>
     {/* <Entry/> */}
      </div>
      <div className='  md:w-2/5  md:flex justify-center '>     
      </div>

    </div>
  );
}

export default Homepage;

