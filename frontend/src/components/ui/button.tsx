import type { ButtonTypes } from "../../types";

const Button = ({ children, variant = "none", icon, className = "", isLoading = false, ...props }: ButtonTypes) => {
  const variants = {
    primary: "bg-blue hover:bg-blue-700 focus:ring-blue-500 text-sm px-4 text-white",
    success: "bg-green hover:bg-green-700 focus:ring-green-500 text-sm text-white",
    danger: "bg-red hover:bg-red-700 focus:ring-red-500 text-sm text-white",
    outline: "bg-gray hover:bg-gray-700 focus:ring-gray-500 text-sm text-white",
    none: "p-0 m-0 rounded-none text-black"
  };

  return (
    <button
      className={`
        ${variants[variant]} 
        ${className} 
        px-3 font-normal rounded-[10px] py-2 cursor-pointer flex gap-2
      `}
      disabled={isLoading}
      {...props}
    >
      {icon && <img src={icon} alt="icon" />}
      {children}
    </button>
  )
}

export default Button;
