import { AdditionalItemResponse } from "./AdditionalItemResponse";
import { Decimal } from "@prisma/client/runtime/library";

export class MenuItemResponse{
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: Decimal;
    quantity: number;
    unit_id: number | null;
    visible: boolean;
    category: number[];
    add_item: AdditionalItemResponse[]
    remove_item: AdditionalItemResponse[]
  
}

