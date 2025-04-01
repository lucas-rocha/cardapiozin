import { PaymentMethod } from "@prisma/client";

class OrderItem {
  menuItemId: number;
  quantity: number;  
  additionalItemsId: number[]; 
}


export class OrderRequest {
  total_amount: number; 
  customer_id: string;
  payment_method: PaymentMethod;
  restaurant_id: string; 
  coupon_id?: number;    
  items: OrderItem[];  
}