import React, { useEffect, useState } from 'react';
import { FilledHeart } from '../components/icons';
import { DogBreed } from '../types/general'
import GalleryDetailsWrapper from './galleryDetailsWrapper';

interface Favourites {
  favs: string[],
  className?: string,
  items: DogBreed[],
  onClick?: () => void
}

const Favourites: React.FunctionComponent<Favourites> = ({ favs, items, className, onClick }) => {

  const [favDogs, setFavDogs] = useState<DogBreed[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const showDetails = (i: number) => {
    setCurrentIndex(i);
    setDetailsOpen(true);
  }
  const closeDetails = () => {
    setCurrentIndex(-1);
    setDetailsOpen(false);
  }

  useEffect(() => {
    const currentFavs = items.filter(x => favs.includes(x.image.id));
    setFavDogs([...currentFavs]);
  }, [favs, items]);

  return (
    <div className={` ${className}`}>
      <ul className="grid gap-3 grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8">
        {favDogs.length > 0 ?
          favDogs.map((x, i) => (
            <li 
              key={i} 
              className={`block p-1 bg-white relative rounded ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} xl:shadow active:scale-[0.97] transition-transform duration-75 ease-linear will-change-transform lg:cursor-pointer select-none`}
              onClick={() => showDetails(i)}
            >
              <FilledHeart className="inline-block w-8 h-8 p-2 rounded bg-white absolute right-0 bottom-0 fill-primary" />
              <img src={x.image.url} alt={x.name} className="block w-full aspect-square object-cover rounded-sm" />
            </li>
          ))
        :
          <li className="text-base sm:text-lg font-bold text-center col-span-full select-none">No favourites yet! Go back and show some love to puppies :)</li>
        }
      </ul>
      <GalleryDetailsWrapper items={favDogs} open={detailsOpen} index={currentIndex} onClose={closeDetails} />
    </div>
  );
}

export default Favourites;
