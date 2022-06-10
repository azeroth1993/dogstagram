import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getFavs, getAllDogs } from '../redux/slices/global';

// Hooks for getting genral store data
export const useGetAllBreeds = () => {
  const data = useAppSelector(getAllDogs);
  return data;
}
export const useGetFavourites = () => {
  const favs = useAppSelector(getFavs);
  return favs;
}

