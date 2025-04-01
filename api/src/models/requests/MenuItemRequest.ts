import { AdditionalItemRequest } from "./AdditionalItemRequest";
import { CategoryRequest } from "./CategoryRequest";

export class MenuItemRequest {
  item_name: string;
  price: number;
  restaurant_id: string;
  description: string | null;
  serving: number | null;
  quantity: number;
  unit_id: number | null;
  unit_measure: number | null;
  visible: boolean;
  categoryIds: number[];
  categoriesCreated: CategoryRequest[];
  additionalItemIds: number[];
  removeAdditionalItemIds: number[]
  additionalItemCreated: AdditionalItemRequest[]; 
}
