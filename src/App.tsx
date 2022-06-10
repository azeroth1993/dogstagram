import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { DogPaw, EmptyHeart, FilledHeart, ImageOutlined, ImageSolid } from './components/icons';
import Gallery from './templates/gallery';
import Favourites from './templates/favourites';
import Button from './components/button/button';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { useGetFavourites, useGetAllBreeds } from './hooks/general'
import { fetchDogs } from './redux/slices/global'

const App = () => {

  const [activeTab, setActiveTab] = useState(1);
  const [itemsCount, setItemsCount] = useState(15);
  const dispatch = useAppDispatch();
  const allBreeds = useGetAllBreeds();
  const favourites = useGetFavourites();
  
  const handleFilters = (count: string) => {
    setItemsCount(Number(count));
    console.log(itemsCount);
  }

  useEffect(() => {
    dispatch(fetchDogs(itemsCount));
  }, [itemsCount])

  return (
    <main className="relative flex justify-center select-none">
      <div className="block w-full h-full bg-lavender pt-5 pb-16 px-3 text-title-color max-w-screen-2xl mx-auto">
        <h1 className="flex justify-center items-center capitalize text-center w-full text-4xl lg:text-5xl font-bold mt-4 mb-12 sm:mt-10 sm:mb-20 select-none lg:cursor-pointer" onClick={() => setActiveTab(1)}>
          <DogPaw className="w-12 h-12 sm:w-16 sm:h-16 fill-primary -rotate-12" />
          <span className="w-64 sm:w-auto px-2 sm:px-10">welcome to Dogstagram!</span>
          <DogPaw className="w-12 h-12 sm:w-16 sm:h-16 fill-primary rotate-12" />
        </h1>
        {activeTab === 1 ?
          <Gallery items={allBreeds} onFilter={handleFilters} />
          :
          <Favourites favs={favourites} items={allBreeds} />
        }
      </div>
      <div className="grid grid-cols-2 gap-0 w-full mt-6 fixed bottom-0 will-change-transform z-10">
        <Button 
          text="gallery"
          type="button"
          leftIcon={activeTab === 1 ? <ImageSolid className="tabIcon" /> : <ImageOutlined className="tabIcon" />}
          leftIconClass="mr-2"
          className={`flex justify-center items-center capitalize border-none bg-white ${activeTab === 1 ? 'shadow-inner font-bold' : ''}`}
          color="lavender"
          onClick={() => setActiveTab(1)}
        />
        <Button 
          text="favourites"
          type="button"
          leftIcon={activeTab === 1 ? <EmptyHeart className="tabIcon" /> : <FilledHeart className="tabIcon" />}
          leftIconClass="mr-2"
          className={`flex justify-center items-center capitalize border-none bg-white ${activeTab === 2 ? 'shadow-inner font-bold' : ''}`}
          color="lavender"
          onClick={() => setActiveTab(2)}
        />
      </div>
    </main>
  );
}
export default App;
