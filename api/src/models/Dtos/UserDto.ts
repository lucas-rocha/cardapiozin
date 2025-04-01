import { Role } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {
  id: number;
  
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
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Password two should not be empty'
  })
  passwordTwo?: string;

  @IsOptional()
  position: string;

  @IsOptional()
  restaurant_id: string;

  @IsOptional()
  restaurant_name: string;
}