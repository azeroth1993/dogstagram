import React, { useEffect, useState } from 'react';
import { FilledHeart, EmptyHeart, SharePaperPlane, ArrowLeft, ArrowRight } from '../components/icons'
import { useAppDispatch } from '../redux/hooks';
import { addFav, removeFav } from '../redux/slices/global';
import { useGetFavourites } from '../hooks/general'
import { DogBreed } from '../types/general';

interface GalleryDetails {
  item: DogBreed
  onSlide?: (index:number) => void
}

const GalleryDetails: React.FunctionComponent<GalleryDetails> = ({ item, onSlide }) => {

  const [fav, setFav] = useState(false);
  const dispatch = useAppDispatch();
  const favourites = useGetFavourites();

  const handleSlide = (nextIndex:number) => {
    onSlide && onSlide(nextIndex);
  }

  const toggleFav = () => {
    !fav ? dispatch(addFav(item.image.id)) : dispatch(removeFav(item.image.id));
  }

  useEffect(() => {
    const isFav = favourites.includes(item.image.id);
    setFav(isFav);
  }, [favourites, item.image.id])


  return (
    <div className="pb-0 sm:pb-2">
      {/* image & slide buttons */}
      <div className="relative">
        <div className="h-full flex justify-between items-center absolute w-full top-1/2 -translate-y-1/2 select-none opacity-0 hover:opacity-100">
          <span className="flex items-center h-full px-3 lg:px-8 lg:cursor-pointer" onClick={() => handleSlide(-1)}>
            <ArrowLeft className="inline-block bg-white fill-primary rounded-full w-8 h-8 lg:w-10 lg:h-10 p-2 bg-opacity-80 active:scale-95 transition-all" />
          </span>
          <span className="flex items-center h-full px-3 lg:px-8 lg:cursor-pointer" onClick={() => handleSlide(1)}>
            <ArrowRight className="inline-block bg-white fill-primary rounded-full w-8 h-8 lg:w-10 lg:h-10 p-2 bg-opacity-80 active:scale-95 transition-all"/>
          </span>
        </div>
        <img
          src={item.image.url}
          alt={item.name}
          className="block w-full object-contain select-none max-h-full"
          width={item.image.width}
          height={item.image.height}
        />
      </div>
      {/* like and share bar */}
      <div className="flex justify-start items-center px-3 sm:px-5 pt-2 pb-2">
        <span className="block w-8 h-8 text-primary lg:cursor-pointer active:scale-[0.85] transition-transform p-1" onClick={toggleFav}>
          {fav ?
            <FilledHeart className="fill-current select-none" />
            :
            <EmptyHeart className="fill-title-color select-none" />
          }
        </span>
        <span className="block w-8 h-8 lg:cursor-pointer active:scale-[0.85] transition-transform p-1 ml-4">
          <SharePaperPlane className="fill-title-color select-none" />
        </span>
      </div>
      {/* details list */}
      <ul className="block w-full px-4 sm:px-6 py-2 select-none">
        <li className="dogFeature">
          <span className="dogFeatureIcon">›</span>
          <span className="dogFeatureLabel">weight:</span>
          <span className="dogFeatureText">{item.weight.metric} kgs</span>
        </li>
        <li className="dogFeature">
          <span className="dogFeatureIcon">›</span>
          <span className="dogFeatureLabel">height:</span>
          <span className="dogFeatureText">{item.height.metric} cm at the withers</span>
        </li>
        <li className="dogFeature">
          <span className="dogFeatureIcon">›</span>
          <span className="dogFeatureLabel">life span:</span>
          <span className="dogFeatureText">{item.life_span} average life span</span>
        </li>
        <li className="dogFeature">
          <span className="dogFeatureIcon">›</span>
          <span className="dogFeatureLabel">personality:</span>
          <span className="dogFeatureText">{item.temperament}</span>
        </li>
      </ul>
    </div>
  );
}

export default GalleryDetails;
