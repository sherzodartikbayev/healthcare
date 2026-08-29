import type {InputTypes} from "../../types";

const Input = ({id, label, icon, placeholder, value, onChange, error, className, ...props}: InputTypes) => (
  <div className='relative flex flex-col w-full'>
    {label && <label className="font-semibold md:text-[14px] text-xs text-black mb-1 select-none">{label}</label>}

    {icon &&
      <img
        src={icon}
        alt={label}
        className={`size-4.5 absolute ${label ? 'md:top-9 top-7' : 'top-3'} ${label ? "left-2" : "left-3"}`}
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
        py-2 border-2 border-gray w-full outline-none transition  md:text-base text-xs rounded-lg
      `}
      {...props}
    />

    {error && <p className='font-semibold text-xs text-red'>{error}</p>}
  </div>
);

export default Input;
