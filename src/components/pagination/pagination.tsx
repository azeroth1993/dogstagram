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
    setActivePage(activePage + amount);
    onChange && onChange(activePage + amount - 1);
  }

  return (
    <ul 
      style={{ '--bg': bgColor, '--text': textColor } as React.CSSProperties}
      className={`flex justify-center items-center w-full mt-10 mb-4 ${wrapperClass}`}
    >
      <li className={`inline-block lg:cursor-pointer mx-[2px] [background-color:var(--bg)] [color:var(--text)] hover:[background-color:var(--text)] hover:[color:var(--bg)] active:scale-95 transition-transform will-change-transform rounded`}>
        <ArrowLeft className={`fill-current inline-block w-10 h-10 p-2`} onClick={() => activePage > 1 && handleNextPrev(-1)} />
      </li>
      {items.map(x => (
        <li 
          key={x} 
          className={`w-10 h-10 text-base font-semibold mx-[2px] justify-center items-center shadow-sm rounded lg:cursor-pointer active:scale-95 transition-transform will-change-transform hover:[background-color:var(--text)] hover:[color:var(--bg)]
          ${activePage === x ? '[background-color:var(--text)] [color:var(--bg)]' : '[background-color:var(--bg)] [color:var(--text)]'} ${(Math.abs(activePage - x) < 2) || items.length === x || x === 1 ? 'flex' : 'hidden'} ${ButtonClass}`}
          onClick={() => handleChange(x)} 
        >
          {x}
        </li>
      ))}
      <li className={`inline-block lg:cursor-pointer mx-[2px] [background-color:var(--bg)] [color:var(--text)] hover:[background-color:var(--text)] hover:[color:var(--bg)] active:scale-95 transition-transform will-change-transform rounded`}>
        <ArrowRight className={`fill-current inline-block w-10 h-10 p-2`} onClick={() => activePage < items.length && handleNextPrev(1)} />
      </li>
    </ul>
  )
}
export default Pagination

