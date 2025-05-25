"use client";
// import Button from '@mui/material/Button';
import TestimonialsSection from './Testimonial';
import Featurse from './Featurse';
import { BeamsWithHighlight } from '../user/common/BackroundAn';
import StickyScrollRevealDemo from './HowitsWork';



const MainLanding = () => {
  

  return (
    <div className=" p-12  w-full bg-black text-white  mx-auto ">
  
    <div className='flex justify-center   '>
   <div className='max-w-4/5 animate__animated animate__fadeInUp' > 
   <BeamsWithHighlight  
   title="Focus on what matters." 
    highlight="Track every step.Celebrate every win."
    >
 
   </BeamsWithHighlight>
   </div>
    </div>
  <div className='text-center p-5'>

<Featurse/>
<StickyScrollRevealDemo/>
<TestimonialsSection/>
  </div>
 

    </div>
  );
};

export default MainLanding;
