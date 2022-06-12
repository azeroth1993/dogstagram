import React, { useMemo, useEffect, useState, useLayoutEffect } from 'react';
import GalleryItem from './galleryItem'
import { DogBreed } from '../types/general'
import Select from '../components/select/select';
import GalleryDetailsWrapper from './galleryDetailsWrapper';
import { Gear } from '../components/icons';
import Pagination from '../components/pagination/pagination';

interface Gallery {
  items: DogBreed[],
  className?: string,
  onFilter: (count: string) => void,
  onPagination: (page: number) => void,
}

const Gallery: React.FunctionComponent<Gallery> = ({ items, className, onFilter, onPagination }) => {

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentDog, setCurrentDog] = useState(-1);
  const [liveList, setLiveList] = useState(items);
  const [breed, setBreed] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState('15');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const showDetails = (index: number) => {
    setCurrentDog(index);
    setDetailsOpen(true);
  }
  const closeDetails = () => {
    setCurrentDog(-1);
    setDetailsOpen(false);
  }
  const breedSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setBreed(e.target.value);
  }
  const itemsCountSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    onFilter && onFilter(e.target.value);
  }
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  }
  const handlePagination = (page: number) => {
    onPagination && onPagination(page);
  }

  useMemo(() => {
    let currentList = items.filter(x => breed === 'All' ? x : x.name === breed);
    setLiveList(currentList);
  }, [items, breed]);

  return (
    <div className={`relative flex-col w-full ${className}`}>       
      <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 lg:order-2">
        {liveList.map((x, i) => (
          <GalleryItem key={x.name + i} item={x} index={i} onClick={showDetails}/>
        ))}
      </ul>
      <Pagination 
        total={172} 
        perPage={Number(itemsPerPage)} 
        onChange={handlePagination} 
        wrapperClass="order-2" 
        ButtonClass=""
        bgColor="white"
        textColor="primary"
      />
      <Gear className={`inline-block w-14 h-14 fixed ${filtersOpen ? 'bottom-40' : 'bottom-16'} right-0 bg-white fill-primary p-2 rounded shadow lg:cursor-pointer active:scale-95 transition-transform will-change-transform lg:hidden`} onClick={toggleFilters} />
      <div className={`${filtersOpen ? 'translate-y-0' : 'translate-y-full'} 
      transition-all shadow-md flex flex-col items-start bg-white w-screen -ml-3 py-3 border-b border-dashed border-lavender mx-auto mt-6 fixed bottom-10 will-change-transform z-10 sm:pt-2 sm:pb-2 px-4 rounded-t 
      lg:top-0 lg:bottom-auto lg:w-full lg:ml-0 lg:flex-row lg:overflow-auto lg:order-1 lg:sticky lg:mt-0 lg:translate-y-0 lg:mb-5 lg:border-none lg:rounded
      `}>
        <Select 
          label="Breed:"
          options={['All', ...items.map(x => x.name)]} 
          defaultValue={breed} 
          id="breeds" 
          onChange={breedSelection} 
          wrapperClass="my-1"
          labelClass="inline-block text-base font-bold mr-3 sm:text-lg text-primary text-left mb-1 sm:mb-0"
          className="outline-none bg-lavender text-title-color rounded py-2 px-2 lg:cursor-pointer"
        />
        <Select 
          label="Items:"
          options={['5', '10', '15', '20']} 
          defaultValue={itemsPerPage} 
          id="itemsPerPage" 
          onChange={itemsCountSelection} 
          wrapperClass="my-1"
          labelClass="inline-block text-base font-bold mr-3 sm:text-lg text-primary text-left mb-1 sm:mb-0 sm:ml-5"
          className="outline-none bg-lavender text-title-color rounded py-2 px-2 lg:cursor-pointer"
        />
      </div>
      <GalleryDetailsWrapper items={liveList} open={detailsOpen} index={currentDog} onClose={closeDetails} />
    </div>
  );
}

export default Gallery;
