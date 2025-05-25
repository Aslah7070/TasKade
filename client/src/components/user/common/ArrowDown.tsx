"use client";
import { WorkSpace } from '@/types/type';
import React from 'react';
import { Dropdown } from 'rsuite';
import { useRouter } from 'next/navigation';

interface CustomDropdownProps {
  title: string;
  workSpace: WorkSpace[];
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  title,
  workSpace,
}) => {

  const router = useRouter();

  const handleSelect = (eventKey: string) => {

    router.push(`/user/w/space/${eventKey}`);
  };

  return (
    <Dropdown className="" title={title} onSelect={handleSelect}>
    <div className='dark:bg-black p-3 rounded-lg'>
          {workSpace.map((item) => (
        <Dropdown.Item className="font-light z-100 " key={item._id} eventKey={item._id}>
          {item.name}
        </Dropdown.Item>
      ))}
    </div>
    </Dropdown>
  );
};
