import PrismaClientSingleton from '@src/databases/PrismaClient'
import { UserProfileUpdateDto } from '@src/models/Dtos/UserProfileDto';
import { BadRequestError, NotFound } from '@src/util/errors/ApiError'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

interface customerLoginRequest {
  email: string;
  password: string;
  restaurant_id: string;
}

export default class AuthService {
  constructor(
    private prisma = PrismaClientSingleton.getInstance()
  ) {}

  public async login(req: LoginResquest) {
    const user = await this.prisma.user.findUnique({
      where: { email: req.email }
    })
    
    if(!user)
      throw new NotFound('User not found!')

    if(!await AuthService.comparePasswords(req.password, user.password))
      throw new BadRequestError('Password does not match!')

    const userRestaurant = await this.prisma.user_Restaurant.findUnique({
      where: {
        user_id_restaurant_id: {
          restaurant_id: user?.restaurant_id as string,
          user_id: user?.id
        }
      }
    })

    const token = AuthService.generateToken(user.id, user.restaurant_id, userRestaurant?.role as string)

    return {
      token
    }
  }

  public async customerLogin(req: customerLoginRequest) {
    const customer = await this.prisma.customer.findFirst({
      where: { email: req.email, restaurant_id: req.restaurant_id }
    })

    if(!customer)
      throw new NotFound('Customer not found!')
    
    if(!await AuthService.comparePasswords(req.password, customer.password))
      throw new BadRequestError('Passwords does not match!')

    const token = AuthService.generateToken(customer.id, customer.restaurant_id, null)

    return {
      token
    }
  }

  public async forgotPassword(email: string, userType: 'user' | 'customer') {
    let user

    if(userType === 'user') {
      user = await this.prisma.user.findUnique({ where: { email } })
    } else {
      user = await this.prisma.customer.findUnique({ where: { email } })
    }

    if(!user)
      throw new NotFound('User not found!')

    const resetToken = AuthService.generateToken(user.id, null, null)
    const resetLink = `/reset-password?token=${resetToken}`

    if(userType === 'user') {
      await this.prisma.user.update({ where: { email }, data: { reset_token: resetToken }})
    }

    if(userType === 'customer') {
      await this.prisma.customer.update({ where: { email }, data: { reset_token: resetToken }})
    }

    return resetLink
  }

  public async resetPassword(token: string, newPassword: string, userType: 'user' | 'customer') {
    let user

    if(userType === 'user') {
      user = await this.prisma.user.findFirst({ where: { reset_token: token } })
    } else {
      user = await this.prisma.customer.findFirst({ where: { reset_token: token } })
    }

    const hashedPassword = await AuthService.hashPassword(newPassword)

    if(!user)
      throw new NotFound('User not found!')

    if(userType === 'user') {
      user = await this.prisma.user.update({ where: { email: user.email }, data: { password: hashedPassword, reset_token: '' } })
    }

    if(userType === 'customer') {
      user = await this.prisma.customer.update({ where: { email: user.email }, data: { password: hashedPassword, reset_token: '' } })
    }

    return user
  }
  
  public async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({ where: { verification_token: token } })

    if(!user)
      throw new NotFound('User not found!')

    await this.prisma.user.update({ where: { id: user.id }, data: {
      verification_token: null,
      is_email_verified: true
    }})

    return user
  }

  public async resendEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if(!user)
      throw new NotFound('User not found')

    const verificationToken = await AuthService.generateToken(user.id, null, null)

    await this.prisma.user.update({ where: { email }, data: {
      verification_token: verificationToken
    } })

    console.log(verificationToken)
  }

  public static async hashPassword(password: string, salt = 10): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  public static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }

  public static generateToken(user_id: string, restaurant_id: string | null, role: string | null): string {
    return jwt.sign({ user_id, restaurant_id, role }, 'ABCD')
  }

  public static decodeToken(token: string) {
    return jwt.verify(token, 'ABCD')
  }
}