'use client'

import PageHeader from "@/components/PageHeader/PageHeader";
import Layout from "../page";
import PrivateRoute from "@/components/PrivateRoute";

export default function Produtos() {
  return (
    <PrivateRoute>
      <Layout>
        <div className="p-20">
        <PageHeader 
          title="Produtos"
          description="Gerencie e organize todos os produtos disponíveis em seu estabelecimento. Atualize informações, visualize detalhes e mantenha seu catálogo sempre atualizado para oferecer uma experiência completa e de qualidade aos seus clientes."
        />

        </div>
      </Layout>
    </PrivateRoute>
  )
}