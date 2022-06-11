import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { DogBreed } from '../types/general'
import GalleryDetails from './galleryDetails'
import Modal from '../components/modal/modal';

interface GalleryDetailsWrapper {
  items: DogBreed[],
  open: boolean,
  index: number,
  onClose?: () => void 
}

const GalleryDetailsWrapper: React.FunctionComponent<GalleryDetailsWrapper> = ({ items, open = false, index = -1, onClose }) => {

  const [currentDog, setCurrentDog] = useState(index);
  const [detailsOpen, setDetailsOpen] = useState(open);

  console.log(items.length, currentDog);

  useEffect(() => {
    setCurrentDog(index);
    setDetailsOpen(true);
  }, [open])

  useLayoutEffect(() => {
    if (items.length >= 1 && currentDog !== -1) {
      setCurrentDog(currentDog => currentDog - 1);
      onClose && onClose();
    } 
  }, [items.length])

  const closeDetails = () => {
    setCurrentDog(-1);
    setDetailsOpen(false);
    onClose && onClose();
  }
  const handleSlide = (nextIndex: number) => {
    if (items.length <= currentDog + nextIndex || currentDog + nextIndex === -1) {
      onClose && onClose();
    } else {
      setCurrentDog(currentDog => { return currentDog + nextIndex });
    }
  }

  return (
    <>
      {items[currentDog] &&
        <Modal title={items[currentDog].name} open={detailsOpen} onClose={closeDetails} wrapperId="modalRoot">
          <GalleryDetails item={items[currentDog]} onSlide={handleSlide} />
        </Modal>
      }
    </>
  );
}

export default GalleryDetailsWrapper;
