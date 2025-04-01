import { IsOptional } from "class-validator";

export class UserProfileUpdateDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  position?: string;

  @IsOptional()
  phone?: string;
}
