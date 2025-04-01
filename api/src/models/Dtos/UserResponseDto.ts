import { Role } from "@prisma/client";

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role | undefined;
  position: string | null | undefined;
  passwordDate: Date;
  createdAt: Date;
  updatedAt: Date;
  restaurant_id: string | null;
}