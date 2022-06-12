import React, { ReducerAction } from "react"
import { urlToHttpOptions } from "url"

interface Select {
  options: string[],
  wrapperClass?: string,
  labelClass?: string,
  className?: string,
  id: string,
  label: string,
  defaultValue: string,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FunctionComponent<Select> = ({ options, className, id, label, defaultValue, labelClass, wrapperClass, onChange }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);
  }

  return (
    <div className={`${wrapperClass}`}>
      <label htmlFor={id} className={`${labelClass}`}>{label}</label>
      <select 
        id={id}
        defaultValue={defaultValue}
        className={` ${className}`}
        onChange={handleChange}
      >
        {options.map((x, i) => (
          <option key={x + i} value={x}>{x}</option>
        ))}
      </select>
    </div>
  )
}
export default Select

