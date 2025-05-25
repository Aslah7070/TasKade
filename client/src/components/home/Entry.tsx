
"use client"
// import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BlurText from "../../blocks/TextAnimations/BlurText/BlurText";
// import GitHubButton from '../user/common/SpButton';
import taskmanage from "../../Assets/taskmanage.jpeg"
import { TextGenerateEffect } from '../ui/text-generate-effect';
// import { ImagesSliderDemo } from '../user/common/ImageSlider';

const Entry = () => {
      const words = " Plan, prioritize, and stay focused with our intuitive task management solution"
  return (
    <div>
       <section className="relative text-center flex justify-center items-center    animate__animated animate__fadeInUpBig">

        
          <div className="relative z-10 bg-gray-700 md:w-3/4 rounded-xl ">
            <h1 className="text-5xl  sm:text-9xl font-bold text-white">
              Tas
              <span className="relative inline-block">
                <span
                  className="absolute inset-0"
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  Kade
                </span>
                <span className="relative z-10 text-transparent bg-clip-text transition-all duration-300 ease-in-out hover:bg-green-800">
                  Kade
                </span>
              </span>
            </h1>


  <div className="flex flex-col items-center justify-start   py-6">
            <Image
              className='rounded-2xl object-cover'
              src={taskmanage}
              width={300}
              height={200}
              alt='task management'
            />

            <BlurText
  text="Plan smarter. Execute faster."
  delay={150}
  animateBy="words"
  direction="top"
//   onAnimationComplete={handleAnimationComplete}
  className="text-2xl "
/>
 <TextGenerateEffect className='text-"xl' words={words} />


          </div>
          </div>  
        </section>
    </div>
  )
}

export default Entry
