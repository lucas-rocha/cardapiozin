'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import Image from "next/image";
import { checkUserEmail, createUserWithRestaurant } from "@/services/user";
import { useRouter, useSearchParams } from "next/navigation";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  passwordTwo: string;
  restaurant_name: string;
};

const loginUserFormSchema = z.object({
  firstName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(6, "Telefone inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  passwordTwo: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  restaurant_name: z.string().min(6, "O nome do restaurante deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.passwordTwo, {
  path: ["passwordTwo"],
  message: "As senhas precisam ser iguais",
})

type LoginUserFormData = z.infer<typeof loginUserFormSchema>

const criarConta = () => {
  const [emailError, setEmailError] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()

  const nameParams = searchParams.get('name')
  const emailParams = searchParams.get('email')
  const phoneParams = searchParams.get('phone')

  const tiers = [
    {
      name: "Start",
      price: "00",
      description: "Perfeito para iniciar seu negócio",
      features: [
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
      ],
    },
    {
      name: "Super",
      price: "17",
      description: "O melhor custo benefício",
      features: [
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
      ],
    },
    {
      name: "Premium",
      price: "25",
      description: "Os melhores recursos para seu cardápio",
      features: [
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
        "Menu digital para celular e computador",
        "Site com domínio personalizado",
      ],
    },
  ]

  const { register, handleSubmit, watch, trigger, getValues, formState: { errors, isValid } } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
    mode: 'onChange'
  });

  const email = watch('email')

  const getFieldsByStep = (currentStep: number): (keyof FormFields)[] => {
    switch (currentStep) {
      case 1:
        return ["firstName", "lastName", "email", "password", "phone"];
      case 2:
        return ["email", "password"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const isValid = await trigger(getFieldsByStep(step));
    const isValidEmail = await handleCheckEmail()

    if (isValid && isValidEmail) {
      setStep(step + 1); // Avança a etapa
    }
  };

  const previousStep = () => setStep(step - 1);

  const handleSubmitForm = async (data: any) => {
    const user = await createUserWithRestaurant(data)

    if(user) {
      router.push('/login')
    }
  }

  const stepVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };


  const handleCheckEmail = async () => {
    const email = getValues("email")

    if(email) {
      const response = await checkUserEmail(email)
      
      if(response == null) {
        setEmailError(false)
        return true
      } else {
        setEmailError(true)
        return false
      }
    }

  }

  return (
    <div className="flex flex-col items-center py-12 px-4 w-full h-svh gap-14">
      <Image src="/logo-lg.png" width={220} height={34} alt="logo" className="mt-8 mb-14" />

      <div className="flex items-center gap-14">  
        <div className="flex flex-col items-center gap-2 relative">

          <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-brandcolor`}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className={`${(step === 1 || step === 2 || step === 3) ? 'font-bold' : ''}`}>Informações básicas</span>
          <div className={`w-32 h-[1px] ${(step === 2 || step === 3) ? 'bg-brandcolor' : 'bg-[#b3b3b3]'} absolute left-[95px] top-[10px]`}></div>
        </div>

        <div className="flex flex-col items-center gap-2 relative">

          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${(step === 2 || step === 3) ? 'bg-brandcolor' : 'bg-[#b3b3b3]'}`}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className={`${(step === 2 || step === 3) ? 'font-bold' : ''}`}>Assinatura</span>
          <div className={`w-32 h-[1px] ${(step === 3) ? 'bg-brandcolor' : 'bg-[#b3b3b3]'} absolute left-[60px] top-[10px]`}></div>
        </div>

        <div className="flex flex-col items-center gap-2 relative ml-8">

          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 3 ? 'bg-brandcolor' : 'bg-[#b3b3b3]'}`}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className={`${(step === 3) ? 'font-bold' : ''}`}>Seu Delivery</span>
        </div>

      </div>   


      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-7">

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              className="flex flex-col gap-4 max-w-[378px]"
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-4">
                <Input
                  register={register}
                  type="text"
                  name="firstName"
                  placeholder="Nome"
                  label="Digite seu nome"
                  defaultValue={nameParams as string}
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
                onBlur={handleCheckEmail}
                defaultValue={emailParams as string}
                errorMessage={errors.email?.message}
                required
              />

              {emailError && (
                <p className="text-error font-bold">Email já está em uso</p>
              )}

              <Input
                register={register}
                type="text"
                name="phone"
                placeholder="Telefone"
                label="Digite seu telefone"
                defaultValue={phoneParams as string}
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
              <div onClick={nextStep} >
                <Button background="bg-brandcolor" color="text-white" text="Próximo" />
              </div>
            </motion.div>

          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >

            <div className="flex flex-col gap-4">
              <p>Escolha o Plano</p>
              <div className="flex gap-4">
              {tiers.map((tier, index) => (
                <div
                  key={tier.name}
                  className={`relative rounded-lg shadow cursor-pointer ${
                    index === 1 ? "bg-[#FFF4EB]" : "bg-white"
                  }`}
                >
                  {/* Header */}
                  <div className="p-6">
                    <div className="absolute top-4 right-4">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-60" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{tier.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-sm text-gray-500">R$</span>
                      <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                      <span className="text-sm text-gray-500">/mês</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
                    <div className="w-full h-[1px] bg-[#E6E6E6] mt-4"></div>
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-gray-900">O que está incluso?</p>
                      <ul className="space-y-3">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
              ))}
              </div>
              <div className="flex gap-4 justify-end">
                <div onClick={previousStep} className="flex w-28">
                  <Button background="bg-secondarycolor" color="text-white" text="Voltar" />
                </div>
                <div onClick={nextStep} className="flex w-48">
                  <Button background="bg-brandcolor" color="text-white" text="Próximo" />
                </div>
              </div>
            </div>
            </motion.div>
          )}

          {step === 3 &&(
            <>
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <Input
                  register={register}
                  type="text"
                  name="restaurant_name"
                  placeholder="Nome do Delivery"
                  label="Digite o nome do Delivery"
                  required
                  errorMessage={errors.restaurant_name?.message}
                  />
              </motion.div>
              <div className="flex gap-4 justify-end">
                <div onClick={previousStep} className="flex w-28">
                  <Button background="bg-secondarycolor" color="text-white" text="Voltar" />
                </div>
                <div className="flex w-48">
                  <Button type="submit" background="bg-brandcolor" color="text-white" text="Salvar"/>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>

      </form>
    </div>
  )
}

export default criarConta