import { IsNotEmpty, IsOptional } from "class-validator";

export class RestaurantHourRequest {
  id: number;

  @IsOptional()
  open_time?: Date;
  
  @IsOptional()
  close_time?: Date;
  
  @IsNotEmpty({
    message: 'Is Closed should not be empty'
  })
  is_closed: boolean;
  
  @IsNotEmpty({
    message: '24 hours should not be empty'
  })
  is_24_hours: boolean;

  days_of_week_id: number;

  restaurant_id: string;
}
