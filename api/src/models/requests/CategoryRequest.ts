import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class CategoryRequest {
  id: number;

  @IsNotEmpty({
    message: 'Category name should not be empty'
  })
  @Length(1, 50)
  name: string;
  restaurant_id: string;
  image_id: number;
  
}
