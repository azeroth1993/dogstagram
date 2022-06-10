import React, { useState, useEffect } from "react"

interface Input {
  type?: string,
  className?: string,
  labelClass?: string,
  inputClass?: string,
  unitClass?: string,
  label: string,
  id: string,
  unit?: string,
  placeholder?: string,
  pattern?: string,
  value?: string | undefined,
  step?: string,
  min?: number,
  required?: boolean,
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const Input: React.FunctionComponent<Input> = ({ type = 'text', label, id, className, labelClass, inputClass, unitClass, placeholder, unit, pattern, required, value = '', step, min, onInput }) => {

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value])


  const inputFormatter = (input : string) => {
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    const parts = input.split('.');
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const formattedInput = numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    console.log(formattedInput);
    return formattedInput;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(inputFormatter(e.target.value));
    setInputValue(e.target.value);
    onInput && onInput(e);
  }

  return (
    <div className={`block w-full ${className}`}>
      <label htmlFor={id} className={`block capitalize mb-1 w-full ${labelClass}`}>{label}</label>
        <span className="relative">
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
            value={inputValue}
            step={step}
            min={min}
            className={`block w-full h-10 outline-none capitalize ${inputClass}`}
            onChange={handleInput}
            />
          {unit &&
            <span className={`absolute right-0 top-1/2 transform -translate-y-1/2 select-none ${unitClass}`}>{unit}</span>
          }
        </span>
    </div>
  )
}
export default Input

