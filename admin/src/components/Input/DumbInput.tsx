import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  type: string;
  placeholder: string;
  defaultValue?: string;
  label?: string;
  required?: boolean;
  value?: string;
}

const DumbInput = <T extends FieldValues> ({ type, placeholder, label, defaultValue, className }: InputProps<T> & { className?: string }) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label &&(
        <label className="font-bold text-sm">{label}</label>
      )}
      <input className="w-full h-12 bg-white rounded-lg indent-4"
        defaultValue={defaultValue}
        type={type} 
        placeholder={placeholder}
      />
    </div>
  )
}

export default DumbInput