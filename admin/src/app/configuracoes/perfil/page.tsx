'use client'

import Button from "@/components/Buttons/Button"
import Input from "@/components/Input/Input"
import PageHeader from "@/components/PageHeader/PageHeader"
import { AuthContext } from "@/contexts/AuthContext"
import { updateProfileUser } from "@/services/user"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Swal from 'sweetalert2'
import { AccountType } from "@/constants/enums"

const editUserFormSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  role: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional()
})

type EditUserFormData = z.infer<typeof editUserFormSchema>

const Perfil = () => {
  const { user, setUser } = useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema)
  })

  useEffect(() => {
    if (user) {
      setValue("firstname", user?.firstName || "");
      setValue("lastname", user?.lastName || "");
      setValue("position", user?.position || "");
      setValue("phone", user?.phone || "");
      setValue("role", AccountType[user?.role as keyof typeof AccountType] || "");
    }
  }, [user, setValue]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  async function editUser(data: any) {
    const formData = new FormData()
    
    formData.append("firstName", data.firstname)
    formData.append("lastName", data.lastname)
    formData.append("position", data.position)
    formData.append("phone", data.phone)

    if (selectedImage) {
      formData.append("file", selectedImage)
    }
    
    const response = await updateProfileUser(user?.id, formData)

    if(response.photo_url) {
      setUser((prevUser: any) => ({
        ...prevUser,
        firstName: response.firstName,
        lastName: response.lastName,
        position: response.position,
        phone: response.phone
      }))
    }

    if(response) {
      Swal.fire({
        icon: "success",
        title: "Usuário editado com sucesso!",
        showConfirmButton: true,
        timer: 1500
      })
    }
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log("o", file)
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  return (
    <div className="w-full p-20 py-10">
      <PageHeader
        title="Perfil da conta"
        description="Bem-vindo ao seu perfil pessoal. Esta seção é dedicada exclusivamente a informações e preferências do usuário, separada dos detalhes e funcionalidades do restaurante."
      />

      <div className="flex gap-2 items-center mt-10 mb-6">
        <div className="relative bg-brandcolor w-28 h-28 rounded-full border-4 border-secondarycolor border-solid cursor-pointer">
          {/* Imagem de Perfil */}
          <Image src={previewImage || user?.photo_url || "/default-user-avatar.png"} alt="Foto de perfil de usuário" fill className="rounded-full object-cover" />

          {/* Ícone de câmera com input de arquivo */}
          <div className="absolute right-0">
            <Image src="/camera-icon.png" alt="camera" width={29} height={29} />
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          {/* <div className="absolute right-0">
            <Image src="/camera-icon.png" alt="camera" width={29} height={29} />
          </div> */}
        </div>
        <div>
          <h2 className="font-bold">{user?.firstName} {user?.lastName}</h2>
          <p>{user?.position}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(editUser)} className="flex flex-col gap-6 w-1/2">
        <div className="flex justify-between gap-6 w-full">
          <div className="w-1/2">
            <Input
              register={register}
              type="text"
              placeholder="Nome"
              label="Nome"
              name="firstname"
              defaultValue={user?.firstName}
            />
          </div>
          <div className="w-1/2">
            <Input 
              register={register}
              type="text"
              placeholder="Sobrenome"
              label="Sobrenome"
              name="lastname"
              defaultValue={user?.lastName}
            />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <Input
              register={register}
              type="text"
              placeholder="Cargo"
              label="Cargo"
              name="position"
              defaultValue={user?.position}
            />
          </div>
          <div className="w-1/2">
            <Input
              register={register}
              type="text"
              placeholder="(13) 974197920"
              label="Telefone"
              name="phone"
              defaultValue={user?.phone}
              />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
          <Input
            register={register}
            type="text"
            placeholder="Acesso"
            label="Tipo de acesso"
            name="role"
            defaultValue={AccountType[user?.role as keyof typeof AccountType] || ''}
            disabled={true}
          />
          </div>
        </div>
      
        <div className="max-w-36">
          <Button type="submit" background="bg-brandcolor" color="text-white" text="Salvar" />
        </div>
      </form>
    </div>
  )
}

export default Perfil