import { IsNotEmpty, IsOptional } from "class-validator";

export class CustomerRequest {
  id: string;

  @IsNotEmpty({
    message: 'Firstname should not be empty'
  })
  first_name: string;
  
  last_name: string;
  
  email: string;
  
  @IsNotEmpty({
    message: 'Phone should not be empty'
  })
  phone: string;
  
  @IsNotEmpty({
    message: 'Password should not be empty'
  })
  password: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Password two should not be empty'
  })
  passwordTwo?: string;
}
