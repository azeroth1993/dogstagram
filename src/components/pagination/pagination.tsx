import React, { useState } from "react"
import { urlToHttpOptions } from "url"
import Button from "../button/button";
import { ArrowLeft, ArrowRight } from "../icons";

interface Pagination {
  total: number,
  perPage: number,
  wrapperClass?: string,
  ButtonClass?: string,
  bgColor?: string,
  textColor?: string,
  onChange: (page: number) => void
}

const Pagination: React.FunctionComponent<Pagination> = ({ total, perPage, ButtonClass, wrapperClass, onChange, bgColor, textColor }) => {

  const [activePage, setActivePage] = useState(1);

  let items = [];
  for (let i = 1; i < Math.ceil(total / perPage) + 1; i++) {
    items.push(i);
  }

  const handleChange = (page: number) => {
    setActivePage(page);
    onChange && onChange(page - 1);
    console.log(page - 1);
  }
  const handleNextPrev = (amount: number) => {
    if (activePage > 1 && activePage < items.length) {
      setActivePage(activePage + amount);
      onChange && onChange(activePage + amount - 1);
    } 
  }

  return (
    <ul className={`flex justify-center items-center w-full mt-10 mb-4 rounded divide-x divide-lavender ${wrapperClass}`}>
      <li className={`inline-block lg:cursor-pointer bg-${bgColor} text-primary hover:bg-${textColor} hover:text-white active:scale-95 transition-transform will-change-transform rounded-l`}>
        <ArrowLeft className={`fill-current inline-block w-10 h-10 p-2`} onClick={() => handleNextPrev(-1)} />
      </li>
      {items.map(x => (
        <li 
          key={x} 
          className={`w-10 h-10 text-base font-semibold justify-center items-center shadow-sm lg:cursor-pointer active:scale-95 transition-transform will-change-transform hover:bg-primary hover:text-white
          ${(Math.abs(activePage - x) < 2) || items.length === x || x === 1 ? 'flex' : 'hidden'} ${activePage === x ? `bg-${textColor} text-white` : `bg-${bgColor} text-primary`} ${ButtonClass}`}
          onClick={() => handleChange(x)} 
        >
          {x}
        </li>
      ))}
      <li className={`inline-block lg:cursor-pointer bg-${bgColor} text-primary hover:bg-${textColor} hover:text-white active:scale-95 transition-transform will-change-transform rounded-r`}>
        <ArrowRight className={`fill-current inline-block w-10 h-10 p-2`} onClick={() => handleNextPrev(1)} />
      </li>
    </ul>
  )
}
export default Pagination

