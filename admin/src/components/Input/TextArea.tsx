import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface TextAreaProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  label?: string;
  required?: boolean;
}

const TextArea = <T extends FieldValues> ({ name, placeholder, register, label, required, className }: TextAreaProps<T> & { className?: string }) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="font-bold text-sm">{label}</label>
      <textarea className={`p-4 w-full`} {...register(name, { required })} placeholder={placeholder}></textarea>
    </div>
  )
}

export default TextArea