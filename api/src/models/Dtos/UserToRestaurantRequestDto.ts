import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UserToRestaurantRequestDto {
  id: string;
  
  @IsNotEmpty({
    message: 'Firstname should not be empty'
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Lastname should not be empty'
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Email should not be empty'
  })
  email: string;

  @IsNotEmpty({
    message: 'Password should not be empty'
  })
  password: string;

  @IsOptional()
  role: Role

  @IsOptional()
  accessType: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Password two should not be empty'
  })
  passwordTwo?: string;

  @IsOptional()
  restaurant_id: string;
}