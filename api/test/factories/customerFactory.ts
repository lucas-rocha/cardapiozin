import { Customer, PrismaClient } from "@prisma/client"
import AuthService from "@src/services/AuthService"

const prisma = new PrismaClient()

export const createCustomer = async (overrides = {}): Promise<Customer> => {
  return prisma.customer.create({
    data: {
      first_name: 'Lucas',
      last_name: 'Rocha',
      phone: '13974197920',
      password: await AuthService.hashPassword('ABCDEFG'),
      ...overrides
    }
  })
}