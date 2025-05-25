

"use client"
import React from 'react'
import { TestimonialsAnimatedSection } from '../user/common/TestimonialAnimate'
import TrueFocus from '@/blocks/TextAnimations/TrueFocus/TrueFocus'

const Featurse = () => {
  return (
    <div className="flex justify-center items-center px-4 md:px-8">
      <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="w-full max-w-md md:max-w-1/2 p-20">
        <TrueFocus 
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>

        </div>

        <div className="w-full max-w-md md:max-w-1/2">
          <TestimonialsAnimatedSection />
        </div>
      </div>
    </div>
  )
}

export default Featurse
