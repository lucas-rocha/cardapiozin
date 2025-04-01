import 'express-async-errors'
import { PrismaClient } from "@prisma/client";
import { createCustomer } from '@test/factories/customerFactory';
import { createRestaurant } from '@test/factories/restaurantFactory';
import { createMenuItem } from '@test/factories/menuItemFactory';

const prisma = new PrismaClient()

describe('Order functional tests', () => {
  beforeEach(async () => {
    await prisma.order.deleteMany({})
    await prisma.customer.deleteMany({})
    await prisma.menu_item.deleteMany({})
    await prisma.restaurant.deleteMany({})
  })
  describe('When creating a new order', () => {
    it('should create a new order', async() => {
      const customer = await createCustomer()
      const restaurant = await createRestaurant()
      const menuItem = await createMenuItem({ restaurant_id: restaurant.id })

      const newOrder = {
        total_amount: 15,
        customer_id: customer.id,
        restaurant_id: restaurant.id,
        menu_item_id: menuItem.id
      }

      const response = await global.testRequest.post('/orders').send(newOrder)
      await expect(response.status).toBe(201)
    })
  })
})