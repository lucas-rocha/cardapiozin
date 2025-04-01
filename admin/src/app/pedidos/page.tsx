'use client'

import OrderStatus from "@/components/OrderStatus/OrderStatus";
import Layout from "../page";
import { ChangeEvent, useEffect, useState } from "react";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import FilterSelect from "@/components/FilterSelect/FilterSelect";
import ExportButton from "@/components/Buttons/ExportButton";
import OrderTable, { DataProps } from "@/components/Table/OrderTable";
import OrderDetails from "@/components/OrderDetails/OrderDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { getOrderById, getOrders } from "@/services/order";
import PageHeader from "@/components/PageHeader/PageHeader";
import PrivateRoute from "@/components/PrivateRoute";

export default function Pedidos() {
  const [activeStatus, setActiveStatus] = useState("Pedidos")
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null)
  const [orders, setOrders] = useState<DataProps[]>([])
  const [filteredOrders, setFilteredOrders] = useState<DataProps[]>([])
  const [orderDetails, setOrderDetails] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    getOrders().then(response => {
      setOrders(response.data)
      setFilteredOrders(response.data)
    })
    
  }, [])
  
  useEffect(() => {
    const id = searchParams.get("item")
    
    if(id) {
      setActiveOrderId(parseInt(id))
      getOrderById(parseInt(id)).then(response => {
        setOrderDetails(response.data)
      })
    }

  }, [searchParams])

  const handleRowClick = (id: number) => {
    if(activeOrderId === id) {
      setActiveOrderId(null)
      router.push("/pedidos")
    } else {
      setActiveOrderId(id)
      router.push(`/pedidos?item=${id}`)
    }
  }
  
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)

    const filteredOrders = orders.filter(order => order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredOrders(filteredOrders)
  }

  return (
    <PrivateRoute>
      <Layout>
        <div className="px-20 py-10">
          <PageHeader 
            title="Pedidos"
            description="Gerencie e acompanhe todos os pedidos recebidos em seu estabelecimento. Atualize o status, visualize detalhes e mantenha-se organizado para oferecer um atendimento eficiente e de qualidade aos seus clientes."
          />

          <ul className="flex gap-4 mt-10">
            <OrderStatus onClick={() => setActiveStatus("Pedidos")} status="Pedidos" statusNumber={145} isStatusActive={activeStatus === "Pedidos"} />
            <OrderStatus onClick={() => setActiveStatus("Em espera")} status="Em espera" statusNumber={5} isStatusActive={activeStatus === "Em espera"} />
            <OrderStatus onClick={() => setActiveStatus("Finalizados")} status="Finalizados" statusNumber={138} isStatusActive={activeStatus === "Finalizados"} />
            <OrderStatus onClick={() => setActiveStatus("Em entrega")} status="Em entrega" statusNumber={2} isStatusActive={activeStatus === "Em entrega"} />
          </ul>

          <div className="w-full h-px bg-bordercolor my-2"></div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-3">
              <OrderSearch searchTerm={searchTerm} handleSearch={handleSearch}/>
              <FilterSelect select="Metodo de pagamento" options={["Cartão", "Dinheiro", "Pix"]}/>
              <FilterSelect select="Status do pedido" options={["Cartão", "Dinheiro", "Pix"]}/>
              <FilterSelect select="Data do pedido" options={["Cartão", "Dinheiro", "Pix"]}/>
            </div>
            <ExportButton />
          </div>

          <div className="mt-10">
            <OrderTable data={filteredOrders} onRowClick={handleRowClick} activeOrderId={activeOrderId} />
          </div>
        </div>
        
        {activeOrderId && (
          <div>
            {/* <div className="absolute w-full h-full bg-colortext top-0 left-0 bg-custom-overlay"></div> */}
            <OrderDetails data={orderDetails} />
          </div>
        )}
      </Layout>  
    </PrivateRoute>
  )
}
