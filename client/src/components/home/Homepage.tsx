// "use client"

// import React from 'react';



// function Homepage() {

//   return (
//     <div className=" w-full  md:flex h-screen justify-between items-start  bg-white dark:bg-black text-white font-sans">
//       <div className='md:w-3/5 h-4/5 flex items-center  justify-center '>
       
//       </div>
//       <div className='  md:w-2/5  md:flex justify-center '>     
//       </div>

//     </div>
//   );
// }

// export default Homepage;



"use client"

import React from 'react';
import TemplateCarousel from './Templates/TestimonialCarosel';
import MyWorkSpace from './Templates/MyWorkSpace';

function Homepage() {
  return (
    <div className="w-full h-screen flex flex-col bg-white dark:bg-black text-white font-sans">
      <div className="h-1/2 w-full p-5 ">
       <h1 className=''>
        Templates
       </h1>
       <TemplateCarousel/>
      </div>
      <hr />
      <div className="h-1/2 w-full p-5 items-center justify-start ">
     My Workspace
      <MyWorkSpace/>
      </div>
    </div>
  );
}
 export default Homepage;