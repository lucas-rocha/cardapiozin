import { IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class CouponRequest {
  id: number;

  @IsNotEmpty({
    message: 'Coupon name should not be empty'
  })
  name: string;
  
  description: string;
  
  @IsNotEmpty({
    message: 'Value should not be empty'
  })
  value: number;

  @IsInt()
  @Min(1, {
    message: 'Quantity must be a positive integer'
  })
  @IsNotEmpty({
    message: 'Quantity should not be empty'
  })
  quantity: number;
  
  @IsNotEmpty({
    message: 'Start date should not be empty'
  })
  startAt: Date;
  
  @IsNotEmpty({
    message: 'Finish date should not be empty'
  })
  finishAt: Date;

  restaurant_id: string;
}
