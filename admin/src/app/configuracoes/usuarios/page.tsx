'use client'

import Button from "@/components/Buttons/Button"
import Input from "@/components/Input/Input"
import PageHeader from "@/components/PageHeader/PageHeader"
import UserTable from "@/components/Table/UserTable"
import { AuthContext } from "@/contexts/AuthContext"
import { createInvite } from "@/services/invite"
import { getUsersRestaurants } from "@/services/restaurant"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const addUserSchema = z.object({
  email: z.string(),
})

type AddUserSchema = z.infer<typeof addUserSchema>

const Usuarios = () => {
  const { role, restaurant } = useContext(AuthContext)
  const [userRestaurant, setUserRestaurant] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema)
  })

  useEffect(() => {
    if(restaurant?.id) {
      getUsersRestaurants(restaurant?.id).then(response => {
        setUserRestaurant(response.data)
      })
    }
  }, [restaurant])

  function addUser(data: any) {
    if(restaurant?.id) {
      createInvite(data.email).then(response => {
        console.log(response)
      })
    }
  }

  return (
    <div className="w-full px-20 py-10">
      <PageHeader
        title="Gerenciamento de Usuários"
        description="Bem-vindo à seção de gerenciamento de usuários. Aqui, você pode adicionar, editar e excluir usuários. Esta seção permite o controle completo sobre as contas de usuário, garantindo que apenas pessoas autorizadas tenham acesso."
      />
      <div className="flex justify-between items-center mt-10">
        <p className="font-bold">Usuários membros</p>
        {(role === 'OWNER') && (
          <button 
            className="flex items-center gap-2 border-bordercolor rounded-lg bg-brandcolor px-3 h-9 font-medium cursor-pointer text-white"  
            onClick={() => setIsFormVisible(!isFormVisible)}>
            <Image alt="Adicionar usuário" src="/plus-icon.png" width={24} height={24} />
            {isFormVisible ? "Fechar formulário" : "Adicionar usuário"}
          </button>
        )}
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit(addUser)} className="p-8 bg-white mt-4 rounded-lg border border-bordercolor">
          <div className="flex items-end gap-2">
            <Input
              register={register}
              type="email"
              name="email"
              label="Digite o email do usuário e espere pela confirmação"
              placeholder="Email"
              className="bg-gray w-96 h-10 rounded-lg indent-4 mt-2"
            />
            <div className="w-28">
              <Button type="submit" background="bg-secondarycolor" color="text-white" text="Enviar" />
            </div>
          </div>
        </form>
      )}

      <div className="mt-10">
        <UserTable data={userRestaurant}/>
      </div>
      
    </div>

  )
}

export default Usuarios