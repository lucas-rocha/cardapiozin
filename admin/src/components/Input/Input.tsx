import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  defaultValue?: string;
  label?: string;
  required?: boolean;
  value?: string;
  isCurrency?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

function formatToBRL(value: string): string {
  const numberValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

const Input = <T extends FieldValues> ({ 
  type, 
  name, 
  placeholder, 
  label, 
  required, 
  register, 
  defaultValue,
  onChange,
  isCurrency,
  disabled,
  errorMessage,
  ...rest
}: InputProps<T> & React.InputHTMLAttributes<HTMLInputElement>) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCurrency) { // Aplica a máscara somente se isCurrency for true
      const formattedValue = formatToBRL(event.target.value);
      onChange?.(formattedValue);
      event.target.value = formattedValue;
      console.log(isCurrency)
    } else {
      onChange?.(event.target.value);
    }
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <label className="font-bold text-sm">{label}</label>
      <input className={`w-full h-12 border border-bordercolor rounded-lg indent-4
        ${disabled ? 'bg-gray text-gray-500 cursor-not-allowed' : 'bg-white'}`}
        {...register(name, { required })}
        defaultValue={defaultValue}
        type={type} 
        placeholder={placeholder}
        onInput={handleChange}
        disabled={disabled}
        {...rest}
      />
      {errorMessage && (
        <p className="text-red text-sm">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input