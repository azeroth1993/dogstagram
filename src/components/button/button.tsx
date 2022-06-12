import React from "react"

interface Button {
  text: string,
  type: any,
  outlined?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  loading?: boolean,
  className?: string,
  leftIconClass?: string,
  rightIconClass?: string,
  color?: string,
  textColor?: string,
  name?: string,
  value?: string,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  onClick?: () => void,
}

const Button: React.FunctionComponent<Button> = ({ text, type = "button", color = "white", textColor, outlined, disabled = false, className, leftIconClass, rightIconClass, autoFocus, name, value, onClick, loading = false, leftIcon, rightIcon }) => {

  return (
    <button
      type={type}
      disabled={disabled}
      autoFocus={autoFocus}
      name={name}
      value={value}
      style={{ '--color': color, '--text-color': textColor } as React.CSSProperties}
      className={`
      block min-h-6 select-none origin-center active:scale-[0.97] transition-transform duration-[75ms] will-change-transform py-2 px-3 shadow focus:outline-none 
      border-2 [color:var(--text-color)] [border-color:var(--color)]
      ${disabled ? 'lg:cursor-not-allowed bg-gray-400 border-gray-400' : 'lg:cursor-pointer'} ${className}
      `}
      onClick={onClick}
    >
      {loading ?
        <svg className={`animate-spin mr h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        :
        <>
          <span className={`${leftIconClass}`}>{leftIcon}</span>
          {text}
          <span className={`${rightIconClass}`}>{rightIcon}</span>
        </>
      }
    </button>
  )

}
export default Button

