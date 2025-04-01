'use client'

import PageHeader from "@/components/PageHeader/PageHeader";
import Layout from "../page";
import CupomTable from "@/components/Table/CupomTable";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

interface MyDataProps {
  id: number;
  nome: string;
  valor: string;
  descricao: string;
  inicio: string;
  fim: string;
}

const myData = [
  {
    id: 1,
    nome: '',
    valor: '',
    descricao: '',
    inicio: '',
    fim: ''
  }
]

export default function Cupons() {
  const [filteredOrders, setFilteredOrders] = useState<MyDataProps[]>([])
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null)
  const router = useRouter()


  useEffect(() => {
    setFilteredOrders(myData)
  }, [])

  const handleRowClick = (id: number) => {
    if(activeOrderId === id) {
      setActiveOrderId(null)
      router.push("/cupons")
    } else {
      setActiveOrderId(id)
      router.push(`/cupons?item=${id}`)
    }
  }
  return (
    <PrivateRoute>
      <Layout>
        <div className="px-20 py-10">
          <PageHeader
            title="Cupons"
            description="Gerencie e crie cupons exclusivos para atrair mais clientes ao seu restaurante. Ofereça descontos especiais, promoções e incentive a fidelidade com ofertas únicas."
          />

          <div className="mt-10">
            <CupomTable data={filteredOrders} onRowClick={handleRowClick} activeOrderId={activeOrderId} />
          </div>
        </div>


      </Layout>
    </PrivateRoute>
  );
}