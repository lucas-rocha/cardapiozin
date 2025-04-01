import { Menu_item, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createMenuItem = async (overrides = {}): Promise<Menu_item> => {
  return prisma.menu_item.create({
    data: {
      item_name: 'Hambuger',
      price: 45,
      ...overrides
    }
  })
}