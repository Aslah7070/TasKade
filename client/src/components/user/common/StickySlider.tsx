"use client";
import React from "react";
import { StickyScroll } from "../../ui/sticky-scroll-reveal";
interface StickyProps {
    title: string;
    description: string;
    content: React.ReactNode; 
  }
  
  
  interface StickyScrollRevealProps {
    content: StickyProps[]; 
  }
  
const StickyScrollReveal = ({ content }:StickyScrollRevealProps) => {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
};

export default StickyScrollReveal;
