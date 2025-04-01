import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

describe('Menu Item functional tests', () => {
  beforeEach(async () => {
    await prisma.menu_item.deleteMany({})
    await prisma.restaurant.deleteMany({})
  })

  describe('When creating a new menu item', () => {
    it('should create a menu item', async () => {
      const newMenuItem = {
        item_name: 'Hamburguer',
        price: 15,
        restaurant_id: 1
      }
      const response = await global.testRequest.post('/menu-item').send(newMenuItem)

      await expect(response.status).toBe(201)
      await expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        item_name: 'Hamburguer',
        price: 15,
        restaurant_id: expect.any(Number)
      }))
    })
  })
})