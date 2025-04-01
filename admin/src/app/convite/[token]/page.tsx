'use client'

import LoginForm from "@/components/Form/LoginForm"
import { AuthContext } from "@/contexts/AuthContext";
import { getInvite } from "@/services/invite";
import { checkUserEmail, createUserFromInvite } from "@/services/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import Image from "next/image";

const loginUserFormSchema = z.object({
  firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(6, "Telefone inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  passwordTwo: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.passwordTwo, {
  path: ["passwordTwo"],
  message: "As senhas precisam ser iguais",
});

type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function InvitePage({ params }: { params: { token: string } }) {
  const [email, setEmail] = useState('')
  const [restaurantId, setRestaurantId] = useState('')
  const [isUserExist, setIsUserExist] = useState(false)
  const router = useRouter()
  const { token } = params
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit, watch, trigger, getValues, formState: { errors, isValid } } = useForm<LoginUserFormData>({
      resolver: zodResolver(loginUserFormSchema)
    });

  useEffect(() => {
    getInvite(token).then(response => {
      setEmail(response.email)
      setRestaurantId(response.restaurant_id)
      console.log(email)
    })

    if(email) {
      checkUserEmail(email)
        .then(response => {
          if(response) {
            console.log("iajdiad", email)
            setIsUserExist(true)
          } else {
            setIsUserExist(false)
          }
        })
    }
  }, [email])

  const handleSubmitForm = async (data: any) => {
    const bodyData = {...data, ...{ restaurant_id: restaurantId }}

    createUserFromInvite(bodyData)
      .then(async (response) => {
        await signIn({ email: response.email, password: getValues("password") })
        router.push(`/convite/${token}/aceitar`)
      })

  }

  async function handleLogin(data: { email: string; password: string }) {
    await signIn(data)

    router.push(`/convite/${token}/aceitar`)
  }

  return (
    <>
      {isUserExist ? (
        <LoginForm onSubmit={handleLogin} email={email}/>
      ): (
        <div className="flex flex-col items-center justify-center h-svh">
          <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mt-8 mb-14" />
          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-7">

            <div className="flex flex-col gap-4 max-w-[378px]">
            <div className="flex gap-4">
              <Input
                register={register}
                type="text"
                name="firstName"
                placeholder="Nome"
                label="Digite seu nome"
                required
                errorMessage={errors.firstName?.message}
              />

              <Input
                register={register}
                type="text"
                name="lastName"
                placeholder="Sobrenome"
                label="Digite seu sobrenome"
                required
                errorMessage={errors.lastName?.message}
              />
            </div>

            <Input
              register={register}
              type="text"
              name="email"
              placeholder="Email"
              label="Digite seu email"
              errorMessage={errors.email?.message}
              defaultValue={email}
              required
            />

            <Input
              register={register}
              type="text"
              name="phone"
              placeholder="Telefone"
              label="Digite seu telefone"
              errorMessage={errors.phone?.message}
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
            {errors && (<p className="text-red text-sm">{errors.password?.message}</p>)}
            <div>
              <Button type="submit" background="bg-brandcolor" color="text-white" text="Registrar" />
            </div>
          </div>
          </form>
        </div>
      )}
    </>
  )
}