import clsx from "clsx";
import { FC } from "react";

interface OrderStatusProps {
  status: string;
  statusNumber: number;
  isStatusActive?: boolean;
  onClick: () => void;
}

const OrderStatus: FC<OrderStatusProps> = ({ status, statusNumber, isStatusActive, onClick}) => {
  return (
    <>
      <li
        onClick={onClick}
        className={clsx("cursor-pointer", { "font-bold": isStatusActive })}
      >
        {`${status} (${statusNumber})`}
      </li>
    </>
  )
}

export default OrderStatus