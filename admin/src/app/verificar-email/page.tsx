'use client'

import Button from "@/components/Buttons/Button"
import { AuthContext } from "@/contexts/AuthContext"
import { resendEmail } from "@/services/auth"
import Image from "next/image"
import { useContext } from "react"

const VerifyEmail = () => {
  const { user } = useContext(AuthContext)

  const handleResendEmail = async () => {
    const emailsent = await resendEmail(user?.email as string)

    console.log(emailsent)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-svh gap-10">
      <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mb-14" />

      <h1 className="font-bold">Confirme seu e-mail para ativar sua conta!</h1>
      <p className="font-medium text-center max-w-[620px]">Olá, {user?.firstName}! 👋 <br/>
      Seja muito bem-vindo ao Cardapiozin! Estamos felizes em tê-lo aqui. <br/> Para ativar sua conta e acessar todos os recursos, <b>enviamos um e-mail para você confirmar sua conta</b>. Caso não tenha recebido, clique no botão abaixo para reenviar.</p>

      <div className="w-72">
        <Button type="button" background="bg-brandcolor" color="text-white" text="Reenviar email" onClick={handleResendEmail} />
      </div>

      <p className="font-medium text-center">Aproveite e explore tudo o que preparamos para você! O link expira em <b>24 horas</b>.</p>

      <p className="font-medium text-center">Atenciosamente, <br/> Equipe Cardapiozin</p>
    </div>
  )
}

export default VerifyEmail