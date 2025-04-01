import { Controller, Delete, Get, Middleware, Patch, Post, Put } from '@overnightjs/core'
import { Folder } from '@src/enum/folder'
import { authMiddleware } from '@src/middlewares/AuthMiddleware'
import verifyFile from '@src/middlewares/FileUpload'
import { UserService } from '@src/services/UserService'
import { NotFound } from '@src/util/errors/ApiError'
import { Request, Response } from 'express'

@Controller('users')
export class UserController {
  constructor(private _userService: UserService = new UserService()) {
  }
  
  @Post('restaurants')
  public async createUserWithRestaurant(req: Request, res: Response) {
    const newUser = await this._userService.createUserWithRestaurant(req.body)

    return res.status(201).json(newUser)
  }

  @Post('')
  public async createUserFromInvite(req: Request, res: Response) {
    const newUser = await this._userService.createUserFromInvite(req.body)

    return res.status(201).json(newUser)
  }

  @Get('')
  public async getUsers(req: Request, res: Response) {
    const users = await this._userService.getUsers()

    return res.status(200).send(users)
  }

  @Get('check-email') 
  public async checkEmail(req: Request, res: Response) {
    const { email } = req.query
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const userByEmail = await this._userService.checkEmail(email as string)

    return res.status(200).json(userByEmail)
  }

  @Get('me')
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response) {
    const userId = req.context?.user_id

    if(!userId)
      throw new NotFound('User id not provided')

    const user = await this._userService.getLoggedUser(userId)

    return res.status(200).json(user)
  }

  @Get(':id')
  public async getUserById(req: Request, res: Response) {
    const user = await this._userService.getUserById(req.params.id)

    return res.status(200).json(user)
  }

  @Get(':id/restaurants')
  @Middleware(authMiddleware)
  public async getRestaurantsFromUser(req: Request, res: Response) {
    const restaurants = await this._userService.getRestaurants(req.params.id)

    return res.status(200).json(restaurants)
  }

  @Patch(':id')
  @Middleware(verifyFile(Folder.PROFILE))
  public async updateUserById(req: Request, res: Response) {
    const bodyJSON = req.body
    const user = await this._userService.updateUserById(req.params.id, bodyJSON, req.file )

    return res.status(200).json(user)
  }

  @Patch(':id/profile')
  @Middleware(verifyFile(Folder.PROFILE))
  public async updateProfile(req: Request, res: Response) {
    const user = await this._userService.updateProfileByUserId(req.params.id, req.body, req.file)

    return res.status(200).json(user)
  }

  @Delete(':id')
  public async deleteUser(req: Request, res: Response) {
    const user = await this._userService.deleteUser(req.params.id)
    
    return res.status(202).json(user)
  }
  
  @Put('current-restaurant')
  @Middleware(authMiddleware)
  public async currentRestaurantt(req: Request, res: Response) {
    const userId = req.context?.user_id
    const { restaurant_id, role } = req.body

    if(!userId)
      throw new NotFound('User id not provided')

    const user = await this._userService.currentRestaurant(restaurant_id, userId, role)
    
    return res.status(200).json(user)
  }
  
}