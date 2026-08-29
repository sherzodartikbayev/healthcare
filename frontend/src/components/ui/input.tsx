import type {InputTypes} from "../../types";

const Input = ({id, label, icon, placeholder, value, onChange, error, className, ...props}: InputTypes) => (
  <div className='relative flex flex-col w-full'>
    {label && <label className="font-semibold text-[14px] text-black mb-1 select-none">{label}</label>}

    {icon &&
      <img
        src={icon}
        alt={label}
        className={`size-4.5 absolute ${label ? 'top-8' : 'top-3.5'} ${label ? "left-2" : "left-3"}`}
      />
    }

    <input
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        ${className} 
        ${icon ? "px-8" : "px-3"} 
        py-1 border-2 border-gray max-w-80 outline-none transition text-[14px]
      `}
      {...props}
    />

    {error && <p className='font-semibold text-xs text-red'>{error}</p>}
  </div>
);

export default Input;
