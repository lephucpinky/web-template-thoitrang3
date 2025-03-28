'use client'; // Mark as client-side component for hover effects and animations

import React from 'react';

interface VisionProps {
  title: string;
  body: string;
}

const Vision: React.FC<VisionProps> = ({ title, body }) => {
  return (
    <div className="relative isolate flex h-auto flex-col overflow-hidden rounded-xl font-inter text-base">
      {/* Nền trong suốt */}

      {/* Tiêu đề */}
      <div className="bg-yellow-fade-left z-30 bg-clip-text p-1 pl-5 pt-4 text-[24px] font-bold text-transparent transition-transform duration-300 md:text-[32px] lg:w-3/5">
        #{title}
      </div>

      {/* Nội dung */}
      <div className="z-30 px-5 text-[12px] text-Black transition-transform duration-300 md:text-[14px] lg:w-3/5">
        {body}
      </div>
    </div>
  );
};

export default Vision;
