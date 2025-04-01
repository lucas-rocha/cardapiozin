import { User } from "@prisma/client";
// import { UserResponse } from "@src/models/responses/UserResponse";
import { BadRequestError, ConflictError, NotFound } from "@src/util/errors/ApiError";
import AuthService from "./AuthService";
import { UserDto } from "@src/models/Dtos/UserDto";
import { UserResponseDto } from "@src/models/Dtos/UserResponseDto";
import { validateInputs } from "@src/util/validate";
import PrismaClientSingleton from "@src/databases/PrismaClient";
import { S3Service } from "./S3Service";
import { UserProfileUpdateDto } from "@src/models/Dtos/UserProfileDto";


export interface LoginResquest {
  email: string;
  password: string;
}

export interface UserUpdate {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

interface UserProfileWithPhoto extends Partial<UserProfileUpdateDto> {
  photo_url?: string;
}

export class UserService {
  constructor(
    private s3Service: S3Service = new S3Service(),
    private prisma = PrismaClientSingleton.getInstance()
  ) {}

  public async checkEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    return user
  }

  public async createUserWithRestaurant(user: UserDto): Promise<User> {
    if (user.password !== user.passwordTwo) {
      throw new BadRequestError("Passwords do not match!");
    }
  
    const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } })
    if (existingUser) {
      throw new ConflictError("Email already exists!")
    }
  
    const hashedPassword = await AuthService.hashPassword(user.password)
    user.password = hashedPassword
    user.restaurant_id = '';
    const userDto = await validateInputs(user, UserDto)

    
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            email: userDto.email,
            password: userDto.password,
            phone: userDto.phone,
            position: userDto?.position,
            restaurant_id: userDto.restaurant_id
          }
        });

        const verificationToken = await AuthService.generateToken(newUser.id, null, null)
        
        const newRestaurant = await tx.restaurant.create({
          data: {
            restaurant_name: user.restaurant_name
          }
        });
        
        await tx.user_Restaurant.create({
          data: {
            user_id: newUser.id,
            restaurant_id: newRestaurant.id,
            role: "OWNER"
          }
        })

        const updatedUser = await tx.user.update({
          where: { id: newUser.id },
          data: {
            restaurant_id: newRestaurant.id,
            verification_token: verificationToken
          }
        });
  
        return updatedUser;

      });

      console.log(result.verification_token)
  
      return result
    } catch (error) {
      console.error('Error in transaction', error);
      throw new Error('Transaction failed');
    }
  }

  public async createUserFromInvite(user: UserDto): Promise<User> {
    if (user.password !== user.passwordTwo) {
      throw new BadRequestError("Passwords do not match!");
    }
  
    const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } })
    if (existingUser) {
      throw new ConflictError("Email already exists!")
    }
  
    const hashedPassword = await AuthService.hashPassword(user.password)
    user.password = hashedPassword
    const userDto = await validateInputs(user,UserDto)

    const newUser = await this.prisma.user.create({
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        password: userDto.password,
        phone: userDto.phone,
        position: userDto?.position,
        restaurant_id: userDto.restaurant_id,
        is_email_verified: true
      }
    })
  
    return newUser
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    
    return users;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if(!user)
      throw new NotFound('User not found!')

    return user;
  }

  public async updateUserById(id: string, fieldsToUpdate: UserUpdate, file?: Express.Multer.File): Promise<User> {
    await validateInputs(fieldsToUpdate,UserDto)

    const user = await this.prisma.user.findUnique({ where: { id }})
   
    if(!user)
      throw new NotFound('User not found!')
    
    if(file)
      this.s3Service.uploadImage(file)
    

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: fieldsToUpdate.firstName,
        lastName: fieldsToUpdate.lastName,
        email: fieldsToUpdate.email,
        position: fieldsToUpdate.position,
        photo_url: file?.filename || null
      }
    })

    return updatedUser
  }

  public async updateProfileByUserId(id: string, userProfile: UserProfileUpdateDto, file?: Express.Multer.File): Promise<User> {
    await validateInputs(userProfile, UserProfileUpdateDto)

    const user = await this.prisma.user.findUnique({ where: { id } })

    if(!user)
      throw new NotFound('User not found!')
  
    const updatedFields: UserProfileWithPhoto = {}
    Object.keys(userProfile).forEach((key) => {
      if (userProfile[key as keyof UserProfileUpdateDto] !== undefined) {
        updatedFields[key as keyof UserProfileUpdateDto] = userProfile[key as keyof UserProfileUpdateDto];
      }
    })

    if(file) {
      await this.s3Service.uploadImage(file)
      updatedFields.photo_url = file.filename as string | undefined
      
      if(user.photo_url) {
        const photoKey = user.photo_url
          .split('/')
          .slice(-1)
          .toString()

        await this.s3Service.deleteImage(`/images/profile/${photoKey}`)
      } 
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updatedFields
    })

    return updatedUser
  }

  public async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if(!user)
      throw new NotFound('User not found!')

    await this.prisma.user.delete({
      where: { id }
    })

    return user
  }

  public async getLoggedUser(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        restaurants: {
          include: { restaurant: true}
        }
      }
    })
    
    if(!user)
      throw new NotFound('User not found!')

    if(!user.restaurant_id)
      throw new NotFound('Restaurant not found')

    const getUserRoleAndAccessType= await this.prisma.user_Restaurant.findUnique({
      where: {
        user_id_restaurant_id: {
          user_id: id,
          restaurant_id: user.restaurant_id
        }
      }
    })
    
    const userWithRoleAndAccessType = {
      ...user,
      role: getUserRoleAndAccessType?.role,
      accessType: getUserRoleAndAccessType?.accessType
    }

    return userWithRoleAndAccessType;
  }

  public async getRestaurants(userId: string) {
    const userWithRestaurants = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { restaurants: true }
    })

    return userWithRestaurants
  }

  public async currentRestaurant(restaurantId: string, userId: string, role: string) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        restaurant_id: restaurantId
      }
    })

    const token = AuthService.generateToken(updatedUser.id, updatedUser.restaurant_id, role)

    return {...updatedUser, ...{ token }}
  }
}