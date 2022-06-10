import React, { useState } from 'react';
import Button from '../components/button/button';

import { DogBreed } from '../types/general'

interface GalleryItem {
  item: DogBreed,
  index: number,
  onClick: (index:number) => void
}

const GalleryItem: React.FunctionComponent<GalleryItem> = ({ item, index, onClick }) => {

  const handleClick = () => {
    onClick(index);
  }

  return (
    <li className={`block p-2 bg-white rounded ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} xl:shadow active:scale-[0.97] transition-transform duration-75 ease-linear will-change-transform lg:cursor-pointer select-none`} onClick={handleClick}>
      <div className="" />
      <img 
        src={item.image && item.image.url} 
        alt={item.name} 
        className={`block w-full h-[calc(((100vw_-_3rem)_/_2)_*_0.75)] sm:h-[calc(((100vw_-_4rem)_/_3)_*_0.75)] lg:h-[calc(((100vw_-_5rem)_/_4)_*_0.75)] 2xl:h-[calc(((1536px_-_6rem)_/_5)_*_0.75)] object-cover rounded-sm`} />
      <span className="block w-full text-center text-sm sm:text-base lg:text-lg font-bold pt-2 pb-1">{item.name}</span>
    </li>
  );
}

export default GalleryItem;
