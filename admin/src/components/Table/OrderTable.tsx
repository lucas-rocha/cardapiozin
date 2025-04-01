import { generateRandomColor } from "@/utils/generateRandomColor";
import { getInitials } from "@/utils/getInitials";
import clsx from "clsx";
import Image from "next/image";
import React, { useMemo, useState } from "react";

interface CustomerProps {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface DataProps {
  id: string;
  customer: CustomerProps
}

interface OrderTableProps {
  data: DataProps[];
  onRowClick: (index: number) => void;
  activeOrderId: number | null;
}

const OrderTable: React.FC<OrderTableProps> = ({ data, onRowClick, activeOrderId }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const colors = useMemo(() => data.map(() => generateRandomColor()), [data]);

  const handleRowClick = (index: number) => {
    setSelectedRow(index)
    onRowClick(index)
  }

  return (
    <table className="w-full text-sm bg-white border-collapse border rounded-lg">
      <thead>
        <tr className="border border-bordercolor">
          <th>
            <div className="flex justify-center">
              <Image src="/check-table.png" alt="Filtrar" width={16} height={16} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              ID Pedido
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Cliente
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Pedido
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Email
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>  
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Telefone
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className={`border border-bordercolor font-semibold cursor-pointer ${activeOrderId === parseInt(row.id) ? 'bg-white shadow-table' : ''} `} onClick={() => handleRowClick(parseInt(row.id))}>
            <td>
              <div className="flex justify-center">
                <Image src={`/check-table${activeOrderId === parseInt(row.id) ? '-active': ''}.png`} alt="Filtrar" width={16} height={16} />
              </div>
            </td>
            <td className="p-3">{row.id}</td>
            <td className="p-3">
              <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brandcolor text-white"  style={{ backgroundColor: colors[index] }}>{getInitials(`${row.customer.first_name} ${row.customer.last_name}`)}</div>
                {row.customer.first_name} {row.customer.last_name}
              </div>
            </td>
            <td className="p-3">sd</td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {row.customer.email}
              </div>
            </td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {row.customer.phone}
              </div>
            </td>
          </tr>
        ))}
        
        
      </tbody>
    </table>
  )
}

export default OrderTable;