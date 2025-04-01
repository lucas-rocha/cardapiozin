import { PrismaClient, Restaurant, User, User_Restaurant } from "@prisma/client";
import { RestaurantDto } from "@src/models/Dtos/RestaurantDto";
import { UserToRestaurantRequestDto } from "@src/models/Dtos/UserToRestaurantRequestDto";
import { BadRequestError, ConflictError, NotFound } from "@src/util/errors/ApiError";
import { validate } from "class-validator";
import { UserService } from "./UserService";
import AuthService from "./AuthService";
import { validateInputs } from "@src/util/validate";

const prisma = new PrismaClient()

export class RestaurantService {
  constructor(private _userService: UserService = new UserService()) {}

  public async createRestaurant(restaurant: RestaurantDto): Promise<Restaurant> {
    if(await prisma.restaurant.findUnique({ where: { restaurant_name: restaurant.restaurant_name} }))
      throw new ConflictError('Restaurant already exists!')

    await validateInputs(restaurant,RestaurantDto)

    const result = await prisma.$transaction(async (tx) => {
      const newRestaurant = await tx.restaurant.create({
        data: {
          restaurant_name: restaurant.restaurant_name
        }
      })

      await tx.user_Restaurant.create({
        data: {
          user_id: restaurant.user_id,
          restaurant_id: newRestaurant.id,
          role: "OWNER"
        }
      })

      // await tx.user.update({
      //   where: { id: restaurant.user_id},
      //   data: { restaurant_id: newRestaurant.id }
      // })

      return newRestaurant
    })

    return result
  }

  public async getUsersRestaurants(restaurantId: string) {
    const usersRestaurant = await prisma.user_Restaurant.findMany({
      where: {
        restaurant_id: restaurantId
      },
      include: {
        user: true
      }
    })

    return usersRestaurant
  }

  public async addUserToRestaurant(userRestaurant: UserToRestaurantRequestDto): Promise<User> {
    let user = await prisma.user.findUnique({
      where: { email: userRestaurant.email }
    })

    if(!user) {
      const hashedPassword = await AuthService.hashPassword(userRestaurant.password);

      user = await prisma.user.create({
        data: {
          firstName: userRestaurant.firstName,
          lastName: userRestaurant.lastName,
          email: userRestaurant.email,
          password: hashedPassword,
        }
      })
    }

    const existingRelation = await prisma.user_Restaurant.findUnique({
      where: {
        user_id_restaurant_id: {
          user_id: user.id,
          restaurant_id: userRestaurant.restaurant_id
        }
      }
    })

    if(existingRelation)
      throw new ConflictError('User is already associated with this restaurant')

    await prisma.user_Restaurant.create({
      data: {
        user_id: user.id,
        restaurant_id: userRestaurant.restaurant_id,
        role: userRestaurant.role || "USER",
        accessType: userRestaurant.accessType
      }
    })

    return user
  }

  public async getRestaurantsForLoggedUser(id: string): Promise<User_Restaurant[]> {
    const restaurants = await prisma.user_Restaurant.findMany({
      where: { user_id: id }
    })

    if(!restaurants)
      throw new NotFound('Restaurants not found!')

    return restaurants
  }

  public async getLoggedRestaurant(id: string): Promise<Restaurant> {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    })

    if(!restaurant)
      throw new NotFound('Restaurant not found!')

    return restaurant
  }

  public async getInfoRestaurant(restaurantUrl: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_url: restaurantUrl }
    })

    if(!restaurant)
      throw new NotFound('Restaurant not found!')

    return restaurant
  }
}