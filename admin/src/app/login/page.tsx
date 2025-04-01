'use client'

import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { AuthContext } from "@/contexts/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginUserFormSchema = z.object({
  email: z.string(),
  password: z.string()
})

type LoginUserFormData = z.infer<typeof loginUserFormSchema>


export default function Login() {
  const [keepLogged, setKeepLogged] = useState(false)
  const { signIn } = useContext(AuthContext)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema)
  })

  async function onSubmit(data: LoginUserFormData) {
    await signIn({email: data.email, password: data.password})

    router.push('/')
  }

  return (
    <div className="flex flex-col gap-12 w-full h-svh items-center">
      <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mt-40" />
      <h2 className="font-bold text-2xl">Entre na sua conta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7 w-80">
        <Input 
          register={register}
          type="email"
          name="email"
          placeholder="Email"
          label="Digite seu e-mail"
          required
        />
        <Input 
          register={register}
          type="password" 
          name="password" 
          placeholder="Password"
          label="Digite sua senha"
          required
        />
        <div className="flex justify-between items-center text-xs">
          <div className="flex gap-2 cursor-pointer" onClick={() => setKeepLogged(!keepLogged)}>
            <Image src={`/check-orange${keepLogged === true ? '-active' : ''}.png`} width={15} height={15} alt="logo" />
            <p className="font-semibold">Manter logado</p>
          </div>
          <Link href='/esqueci-senha' className="text-xs font-bold text-brandcolor hover:underline">Esqueci minha senha</Link>
        </div>
        <Button 
          type="submit" 
          text="Login"
          background="bg-brandcolor"
          color="text-white"
        />
      </form>
    </div>
  )
}