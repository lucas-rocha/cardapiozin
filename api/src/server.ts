import { Server } from '@overnightjs/core';
import { Application, json } from 'express';
import cors from 'cors'
import { UserController } from '@src/controllers/UserController';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import { PrismaClient } from "@prisma/client";
import { RestaurantController } from './controllers/RestaurantController';
import { BlogController } from './controllers/BlogController';
import { MenuItemController } from './controllers/MenuItemController';
import { CustomerController } from './controllers/CustomerController';
import { OrderController } from './controllers/OrderController';
import { CouponController } from './controllers/CouponController';
import { RestaurantHourController } from './controllers/RestaurantHourController';
import { CategoryController } from './controllers/CategoryController';
import { AdditionalMenuController } from './controllers/AdditionalItemController';
import { InfoController } from './controllers/InfoController';
import { InviteController } from './controllers/InviteController';
import { NotificationController } from './controllers/NotificationController';
import { AuthController } from './controllers/AuthController';

const prisma = new PrismaClient()

export class SetupServer extends Server {
  constructor(private port = 5000) {
    super()
  }
  
  public async init(): Promise<void> {
    this.setupExpress()
    this.setupControllers()
    await this.databaseSetup()
    // this.setupErrorMiddleware()
  }
  
  private setupExpress(): void {
    const corsOptions = {
      origin: ['http://localhost:3000', 'http://hamburgueria.localhost:4000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }

    this.app.use(json())
    this.app.use(cors(corsOptions))
  }

  private setupControllers(): void {
    const usersControllers = new UserController()
    const authController = new AuthController()
    const restaurantController = new RestaurantController()
    const blogController = new BlogController()
    const menuItemController = new MenuItemController()
    const customerController = new CustomerController()
    const orderController = new OrderController()
    const couponController = new CouponController()
    const restaurantHourController = new RestaurantHourController()
    const categoryController = new CategoryController()
    const additionalItemController = new AdditionalMenuController()
    const infoController = new InfoController()
    const inviteController = new InviteController()
    const notificationController = new NotificationController()

    this.addControllers([
      usersControllers,
      authController,
      restaurantController, 
      blogController,
      menuItemController,
      customerController,
      orderController,
      couponController,
      restaurantHourController,
      categoryController,
      additionalItemController,
      infoController,
      inviteController,
      notificationController
    ])
  }

  private setupErrorMiddleware(): void {
    this.app.use(errorMiddleware)
  }

  private databaseSetup(): Promise<void> {
    return prisma.$connect()
      .then(() => console.log('Database running'))
      .catch(error => console.log(error))
  }

  public getApp(): Application {
    return this.app
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening of port:', this.port)
    })
  }

  public close(): void {
    prisma.$disconnect()
  }
}