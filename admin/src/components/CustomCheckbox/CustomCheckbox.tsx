import { useState } from "react";

interface CheckboxProps {
  label: string;
  price?: number;
}

const CustomCheckbox = ({ label, price }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => setChecked(!checked);

  return (
    <label className="flex items-center justify-between space-x-3 cursor-pointer p-2 px-4">
      <span className="text-gray-700">
        <span className="font-medium">{label}</span>
        {price ? <span className="ml-3">+ R$ {price}</span> : ''}  
      </span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleCheckbox}
          className="sr-only peer" // Oculta o checkbox padrão
        />
        <div
          className={`w-4 h-4 border-2 rounded-[2px] transition-all duration-200 
            ${checked ? "bg-brandcolor border-brandcolor" : "bg-gray-200 border-gray-400"}
          `}
        >
          {checked && (
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" // Menor viewBox para maior detalhe do ícone
                fill="currentColor"
                style={{ width: "24px", height: "15px", position: "absolute", top: "1px", left: "-3px" }}
              >
              <path fillRule="evenodd" d="M20.707 5.293a1 1 0 00-1.414 0L9 15.586 5.707 12.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l11-11a1 1 0 000-1.414z" clipRule="evenodd" fill="white" />
            </svg>
          )}
        </div>
      </div>
    </label>
  )
}

export default CustomCheckbox