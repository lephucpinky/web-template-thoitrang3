'use client'; // Mark as client-side component for image loading

import React from 'react';
import Image from 'next/image';

interface ExpertCardProps {
  name?: string;
  title?: string;
  description?: string;
  avatar: string; // Đường dẫn đến hình ảnh avatar
}

const Expert: React.FC<ExpertCardProps> = ({
  name,
  title,
  description,
  avatar,
}) => {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-center gap-2 rounded-lg bg-opacity-20 p-4 shadow-md">
      {/* Avatar */}
      <div className="h-32 w-32 overflow-hidden rounded-full">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          width={128} // Kích thước hình ảnh
          height={128}
          className="object-cover"
        />
      </div>

      {/* Tên chuyên gia */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-inter text-[16px] font-bold uppercase text-Black md:text-[20px]">
          {name}
        </h3>

        {/* Chức danh */}
        <p className="font-inter text-[12px] font-medium text-Black md:text-[16px]">
          {title}
        </p>
      </div>

      {/* Mô tả */}
      <p className="text-center font-inter text-[10px] font-normal text-Black md:text-[14px]">
        {description}
      </p>
    </div>
  );
};

export default Expert;
