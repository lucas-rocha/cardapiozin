import { AccountType } from "@/constants/enums";
import { getInitials } from "@/utils/getInitials";
import Image from "next/image"

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface DataProps {
  user_id: string;
  role: string;
  restaurant_id: string;
  position: string | null;
  user: UserProps;
}

interface UserTableProps {
  data: DataProps[]
}

const UserTable = ({ data }: UserTableProps) => {
  return (
    <table className="w-full text-sm bg-white border-collapse border rounded-lg">
      <thead>
        <tr className="border border-bordercolor">
          <th className="p-3 text-left">
            <div className="flex gap-1 text-table-head font-medium">
              Usuário
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
              Cargo
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
              Acesso
              <Image src="/table-arrow.png" alt="Filtrar" width={24} height={24} />
            </div>  
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (

          <tr key={row.user_id} className={`border border-bordercolor font-semibold cursor-pointer`}>
            <td className="p-3">{row.user.firstName}</td>
            <td className="p-3">
              <div className="flex gap-2 items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brandcolor text-white">{getInitials(`${row.user.firstName} ${row.user.lastName}`)}</div>
                {row.user.email}
              </div>
            </td>
            <td className="p-3">{row.user.position || "NA"}</td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {row.user.position || "NA"}
              </div>
            </td>
            <td className="p-3">
              <div className="flex gap-1 items-center">
                <Image src="/email-icon.png" alt="email" width={24} height={24} />
                {AccountType[row?.role as keyof typeof AccountType] || ''}
              </div>
            </td>
          </tr>
        ))}
        
      </tbody>
    </table>
  )
}

export default UserTable