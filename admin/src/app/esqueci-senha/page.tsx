'use client'

import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { forgotPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginUserFormSchema = z.object({
  email: z.string().email("E-mail inválido")
})
type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

const ForgotPassword = () => {
  const [isEmailSuccess, setIsEmailSuccess] = useState(false) 
  const { register, handleSubmit, watch, trigger, getValues, formState: { errors, isValid } } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
    mode: 'onChange'
  })

  const handleSubmitForm = async (data: any) => {
    const token = await forgotPassword(data.email)

    if(token) {
      setIsEmailSuccess(true)
    }
  }

  return (
    <div className="flex flex-col items-center py-12 px-4 w-full h-svh gap-14">
      <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mt-8 mb-14" />

      {isEmailSuccess ? (
        "Foi enviado um email"
      ) :
      (
        <>
          <h1 className="font-bold">Esqueceu sua senha?</h1>
          <p>Digite seu e-mail ou nome de usuário para resetar sua senha</p>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4 w-80 max-w-[378px]">
            <Input
              register={register}
              type="text"
              name="email"
              placeholder="Email"
              label="Digite seu email"
              errorMessage={errors.email?.message}
              required
            />
            <Button type="submit" background="bg-brandcolor" color="text-white" text="Confirmar" />
          </form>
        </>
      )}
    </div>
  )
}

export default ForgotPassword