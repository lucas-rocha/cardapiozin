import Image from "next/image"
import { FC } from "react"

type CustomerProps = {
  email: string;
  first_name: string;
  last_name: string;
}

type MenuItemProps = {
  item_name: string;
}

type OrderItemProps = {
  menu_item: MenuItemProps;
  quantity: number;
}

type OrderProps = {
  id?: number;
  customer?: CustomerProps
  order_items?: OrderItemProps[]
}

type OrderDetailsProps = {
  data: OrderProps
}

const OrderDetails: FC<OrderDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white w-96 h-full p-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">#{data.id}</h2>
        <span className="flex items-center justify-center bg-green rounded-lg w-28 h-7 text-white font-bold">Em trânsito</span>
      </div>

      <p className="font-bold text-brandcolor text-xl my-4">{data.customer?.first_name} {data.customer?.last_name}</p>

      <div>
        <div>
          <p className="text-sm text-colortext">Endereço</p>
          <p className="font-bold mt-2 mb-3">Rua Waldomiro Pereira, 500</p>
        </div>
        <div>
          <p className="text-sm text-colortext">Telefone</p>
          <p className="font-bold mt-2 mb-3">(13) 974197920</p>
        </div>
        <div>
          <p className="text-sm text-colortext">Email</p>
          <p className="font-bold mt-2 mb-3">{data.customer?.email}</p>
        </div>
        <div>
          <p className="text-sm text-colortext">Observação do cliente</p>
          <p className="font-bold mt-2 mb-3">Por favor, retirar a cebola e o picles</p>
        </div>
      </div>

      <div className="w-full bg-gray rounded-lg p-6 mt-8">
        <p className="text-base font-bold">Itens do pedido</p>

        <div>
          {data.order_items?.map(item => (
            <>
              <div className="flex justify-between items-center bg-white p-4 mt-4 rounded-lg gap-2">
                <div className="flex gap-2">
                  <Image src="/x-salada.png" alt="x-salada" width={40} height={40} />
                  <p className="font-bold">{item.menu_item.item_name}</p>
                </div>
                
                <div className="self-end">
                  <p className="font-bold">R$ 16,00</p>
                  <p>{item.quantity} uni</p>
                </div>
              </div>
            </>
          ))}

        </div>
      </div>
    </div>
  )
}

export default OrderDetails