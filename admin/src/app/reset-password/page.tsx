'use client'

import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { resetPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image"
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod"

const loginUserFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  passwordTwo: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.passwordTwo, {
  path: ["passwordTwo"],
  message: "As senhas precisam ser iguais",
})
type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

const ResetToken = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { register, handleSubmit, watch, trigger, getValues, formState: { errors, isValid } } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
    mode: 'onChange'
  })

  const handleSubmitForm = async (data: any) => {
    await resetPassword({
      token,
      newPassword: data.password,
      userType: 'user'
    })
    console.log(data)
  }
    
  return (
    <div className="flex flex-col items-center py-12 px-4 w-full h-svh gap-14">
      <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mt-8 mb-14" />
      
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
        <div className="flex gap-4">
          <Input
            register={register}
            type="password"
            name="password"
            placeholder="Senha"
            label="Digite sua senha"
            required
          />

          <Input
            register={register}
            type="password"
            name="passwordTwo"
            placeholder="Senha"
            label="Digite sua senha"
            required
          />
        </div>
        <Button type="submit" background="bg-brandcolor" color="text-white" text="Confirmar" />
      </form>
    </div>
  )
}

export default ResetToken