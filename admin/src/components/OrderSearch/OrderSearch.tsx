import Image from "next/image";
import { ChangeEvent, FC } from "react";

type OrderSearchProps = {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const OrderSearch: FC<OrderSearchProps> = ({ searchTerm, handleSearch}) => {
  return (
    <div className="flex items-center justify-between bg-white w-60 h-9 rounded-lg px-5">
      <input 
        type="text"
        placeholder="Procurar pedido"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Image src="/search-icon.png" alt="Procurar pedido" width={15} height={15} />
    </div>
  )
}

export default OrderSearch;