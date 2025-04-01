import { Decimal } from "@prisma/client/runtime/library";

export class CategoryResponse{
    id: number;
    name: string;
    image: string | null;
    menuItems: {
        id: number;
        item_name: string;
        price: Decimal;
        description: string | null;
        serving: number | null;
        quantity: number;
        visible: boolean;
    }[];
}

