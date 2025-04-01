'use client'

import Button from "@/components/Buttons/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { acceptedInvite, getInvite } from "@/services/invite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function InviteAccept({ params }: { params: { token: string } }) {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { token } = params

  useEffect(() => {
    getInvite(token).then(response => {
      setEmail(response.email)
    })
  })

  const handleAccept = () => {
    acceptedInvite(token).then(response => {
      console.log("ok")
    })

    router.push('/')
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-svh">
      <Image src="/logo.png" width={167} height={26} alt="logo" />
      <h1 className="text-secondarycolor font-bold mt-4">Aceite seu Convite e comece agora!</h1>
      <p className="mx-96 text-center">Você foi convidado para participar do nosso sistema. Para concluir, faça login com sua conta ou crie uma nova. Após isso, basta aceitar o convite para acessar todos os recursos disponíveis!</p>

      <div className="flex w-40" onClick={handleAccept}>
        <Button background="bg-brandcolor" color="text-white" text="Aceitar" />
      </div>
    </div>
  )
}