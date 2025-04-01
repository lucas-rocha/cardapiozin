import { PrismaClient, Restaurant } from "@prisma/client";

const prisma = new PrismaClient()

export const createRestaurant = async (overrides = {}): Promise<Restaurant> => {
  return prisma.restaurant.create({
    data: {
      restaurant_name: 'My Restaurant',
      ...overrides
    }
  })
}