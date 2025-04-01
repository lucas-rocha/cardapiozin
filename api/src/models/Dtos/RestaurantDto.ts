import { IsNotEmpty } from "class-validator";

export class RestaurantDto {
  id: string;

  @IsNotEmpty({
    message: 'User id required'
  })
  user_id: string;

  @IsNotEmpty({
    message: 'Restaurant name should not be empty'
  })
  restaurant_name: string;
}