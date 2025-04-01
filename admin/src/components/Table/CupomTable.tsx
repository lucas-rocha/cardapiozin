import { generateRandomColor } from "@/utils/generateRandomColor";
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
  id: number;
  nome: string;
  valor: string;
  descricao: string;
  inicio: string;
  fim: string;
}

interface OrderTableProps {
  data: DataProps[];
  onRowClick: (index: number) => void;
  activeOrderId: number | null;
}

const CupomTable: React.FC<OrderTableProps> = ({ data, onRowClick, activeOrderId }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  
  const colors = useMemo(() => data.map(() => generateRandomColor()), [data]);

  const handleRowClick = (index: number) => {
    setSelectedRow(index)
    onRowClick(index)
  }


  const getInitials = (name: string) => {
    const nameParts = name.split(' ')
    const initials = nameParts.map(part => part[0]).join('')
    
    return initials
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
              Nome do cupom
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Valor do desconto
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Descrição
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>  
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Data de início
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>
          </th>
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Data de Término
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>  
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id} className={`border border-bordercolor font-semibold cursor-pointer ${activeOrderId === row.id ? 'bg-white shadow-table' : ''} `} onClick={() => handleRowClick(row.id)}>
            <td>
              <div className="flex justify-center">
                <Image src={`/check-table${activeOrderId === row.id ? '-active': ''}.png`} alt="Filtrar" width={16} height={16} />
              </div>
            </td>
            <td className="p-3">{row.id}</td>
            <td className="p-3">
              <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brandcolor text-white"  style={{ backgroundColor: colors[index] }}>{getInitials(`${row.nome} ${row.nome}`)}</div>
                {row.nome} {row.nome}
              </div>
            </td>
            <td className="p-3">sd</td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {row.descricao}
              </div>
            </td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {row.valor}
              </div>
            </td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/delete_forever.png" alt="Filtrar" width={24} height={24} />
              </div>
            </td>
            
          </tr>
        ))}
        
        
      </tbody>
    </table>
  )
}

export default CupomTable;