import { AdditionalItemRequest } from "./AdditionalItemRequest";
import { CategoryRequest } from "./CategoryRequest";

export class MenuItemUpdate {
    id: number;
    item_name: string;
    price: number;
    description:  string | null;
    serving: number | null;
    quantity: number;
    visible: boolean;
    removeImage: boolean;
    unit_id: number;
    unit_measure: number;
    restaurant_id: string;
    categoryIds: number[];
    categoriesCreated: CategoryRequest[];
    additionalItemIds: number[];
    removeAdditionalItemIds: number[]
    additionalItemCreated: AdditionalItemRequest[];

  }