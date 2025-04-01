import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  background: string;
  color: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ type, text, background, color, ...rest }) => {
  return (
    <button type={type} className={`w-full h-10 rounded-lg text-center uppercase font-bold text-sm placeholder-colortext ${background} ${color}`} {...rest}>
      {text}
    </button>
  )
}

export default Button
