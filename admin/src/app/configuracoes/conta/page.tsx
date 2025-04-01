'use client'

import Button from "@/components/Buttons/Button"
import Input from "@/components/Input/Input"
import PageHeader from "@/components/PageHeader/PageHeader"
import { AuthContext } from "@/contexts/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const editUserFormSchema = z.object({
  email: z.string(),
  actualPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string()
})

type EditUserFormData = z.infer<typeof editUserFormSchema>

const conta = () => {
  const { user, setUser } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<EditUserFormData>({
      resolver: zodResolver(editUserFormSchema)
    })

  return (
    <div className="w-full p-20 py-10">
      <PageHeader
        title="Configurações da conta"
        description="Personalize sua experiência e mantenha seus dados atualizados"
      />

      <div className="mt-10">
        <form className="flex flex-col gap-6 w-1/2">
        <div className="flex gap-6">
          <div className="w-1/2">
            <Input
              register={register}
              type="text"
              placeholder="E-mail"
              label="E-mail"
              name="email"
              defaultValue={user?.email}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <Input 
              register={register}
              type="password"
              placeholder="**********"
              label="Senha atual"
              name="actualPassword"
              />
          </div>
          <div className="w-1/2">
            <Input
              register={register}
              type="password"
              placeholder="**********"
              label="Nova senha"
              name="newPassword"
            />
          </div>
          <div className="w-1/2">
            <Input 
              register={register}
              type="password"
              placeholder="**********"
              label="Confirmar senha"
              name="confirmPassword"
            />
          </div>
        </div>
        <div className="max-w-36">
          <Button type="submit" background="bg-brandcolor" color="text-white" text="Salvar" />
        </div>
        </form>
      </div>
    </div>
  )
}

export default conta