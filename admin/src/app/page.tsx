'use client'

import NavItem from "@/components/NavItem/NavItem";
import NavItemChild from "@/components/NavItemChild/NavItemChild";
import { AuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated, loading, logout } = useContext(AuthContext)

  useEffect(() => {
    if(!loading && !isAuthenticated) {
      return redirect('/login')
    }
  }, [loading, isAuthenticated])

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="h-screen flex">
      <aside className="flex flex-col w-80 min-w-80 bg-white items-center gap-4 py-20">
        <Image src="/logo.png" width={167} height={26} alt="logo" />
        <nav className="flex w-full items-center overflow-y-auto flex-col gap-4 items-start my-10 text-slate-800 font-semibold">
          <NavItem text="Dashboard" href="/" defaultSrc="/home-icon.png" activeSrc="/home-icon-active.png" alt="Dashboard" />
          <NavItem text="Pedidos" href="/pedidos" defaultSrc="/pedido.png" activeSrc="/pedido-active.png" alt="Pedidos" />
          {/* <NavItem text="Produtos" href="/produtos" defaultSrc="/pedido.png" activeSrc="/pedido-active.png" alt="Produtos" /> */}

          <NavItem hasChild={true} href="/produtos" text="Produtos" defaultSrc="/products.png" activeSrc="/settings-icon-active.png" alt="Configurações">
            <NavItemChild text="Adicionar produto" href="/produtos/adicionar" />
          </NavItem>

          <NavItem text="Horarios" href="/horarios" defaultSrc="/clock.png" activeSrc="/clock-active.png" alt="Horários de funcionamento" />

          <NavItem text="Cupons" href="/cupons" defaultSrc="/cupom.png" activeSrc="/cupom-active.png" alt="Cupons disponíveis" />
          <NavItem text="Avaliações" href="/avaliacoes" defaultSrc="/review.png" activeSrc="/review-active.png" alt="Avaliações de clientes" />
          <NavItem text="Histórico" href="/historico" defaultSrc="/historico.png" activeSrc="/historico-active.png" alt="Histórico" />
          <NavItem text="Chat" href="/chat" defaultSrc="/chat-icon.png" activeSrc="/chat-icon-active.png" alt="Chat" />
          
          <NavItem hasChild={true} href="/configuracoes/perfil" text="Configurações" defaultSrc="/settings-icon.png" activeSrc="/settings-icon-active.png" alt="Configurações">
            <NavItemChild text="Organizações" href="/configuracoes/organizacoes" />
            <NavItemChild text="Perfil da Conta" href="/configuracoes/perfil" />
            <NavItemChild text="Conta" href="/configuracoes/conta" />
            <NavItemChild text="Assinatura" href="/configuracoes/assinatura" />
            <NavItemChild text="Usuários" href="/configuracoes/usuarios" />
          </NavItem>
        </nav>

        <button className="flex gap-4 w-44 justify-center bg-gray p-4 rounded-lg font-[600]" onClick={handleLogout}>
          <Image src="/logout-icon.png" alt="Sair da conta" width={24} height={24} />
          Sair da conta
        </button>
      </aside>
      <main className="flex flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;