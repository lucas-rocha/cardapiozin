import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react";

interface FilterSelectProps {
  select: string;
  options: string[];
}

const FilterSelect: FC<FilterSelectProps> = ({ select, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectOption, setSelectOption] = useState(select)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: string) => {
    setSelectOption(option)
    setIsOpen(false); 
  };

  const handleOptionClear = () => {
    setSelectOption(select)
    setIsOpen(false)
  }

  const isOptionIncluded = () => {
    return options.includes(selectOption)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if(isOpen) {
      console.log("okoakokokokok")
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`flex items-center justify-between h-9 rounded-lg px-3 border border-bordercolor cursor-pointer ${isOptionIncluded() ? 'bg-secondarycolor' : 'bg-white'}`}
        onClick={handleToggle}
      >
        <p className={`font-medium text-sm ${isOptionIncluded() ? 'text-white font-bold' : ''}`}>{selectOption}</p>
        {!isOptionIncluded() ? (
          <Image src="/filter-arrow.png" alt="Procurar pedido" width={24} height={24} />
        ) : (
          <Image src="/close-icon.png" alt="Procurar pedido" width={24} height={24} onClick={handleOptionClear}/>
        )}
      </div>
      {isOpen && (
        <ul className="absolute p-3 z-10 mt-2 bg-white border border-bordercolor rounded-lg shadow-lg w-full">
          {options.map((option, index) => (
            <li 
              key={index} 
              className={`px-4 py-2 hover:bg-gray-100 hover:bg-gray rounded-lg cursor-pointer ${option == selectOption ? 'bg-bordercolor' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FilterSelect;