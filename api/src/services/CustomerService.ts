import { Customer, PrismaClient } from "@prisma/client";
import { CustomerRequest } from "@src/models/requests/CustomerRequest";
import { BadRequestError, ConflictError, NotFound } from "@src/util/errors/ApiError";
import AuthService from "./AuthService";
import { validateInputs } from "@src/util/validate";
import PrismaClientSingleton from "@src/databases/PrismaClient";

const prisma = new PrismaClient()

interface CustomerUpdate {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class CustomerService {
  constructor(
    private prisma = PrismaClientSingleton.getInstance()
  ) {}

  public async createCustomer(customer: CustomerRequest, restaurantId: string): Promise<Customer> {
    console.log(restaurantId)
    if (customer.password !== customer.passwordTwo)
        throw new BadRequestError('Passwords do not match!')

    // // Verifica se o cliente já existe pelo telefone
    const existingCustomer = await this.prisma.customer.findFirst({
        where: { phone: customer.phone, restaurant_id: restaurantId }
    });

    if (existingCustomer)
      throw new ConflictError('Cliente já está cadastrado neste restaurante!');
        
    const hashedPassword = await AuthService.hashPassword(customer.password);
    customer.password = hashedPassword;

    const customerRequest = await validateInputs(customer, CustomerRequest);
    delete customerRequest.passwordTwo;

    const newCustomer = await prisma.customer.create({
      data: {
        email: customer.email,
        first_name: customer.first_name,
        phone: customer.phone,
        password: customer.password,
        restaurant_id: restaurantId
      }
    })

    return newCustomer
  }


  public async getCustomers(): Promise<Customer[]> {
    const customers = await prisma.customer.findMany()

    return customers
  }

  public async getLoggedCustomer(customer_id: string, restaurant_id: string) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: customer_id,
        restaurant_id: restaurant_id
      }
    })

    if(!customer)
      throw new NotFound('Customer not found!')

    return customer
  }

  public async getCustomerById(id: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: { id }
    })

    if(!customer)
      throw new NotFound('Customer not found')

    return customer
  }

  public async updateCustomerById(
    id: string, 
    { first_name, last_name, email, phone}: CustomerUpdate
    ): Promise<Customer> {
    const customer = await prisma.customer.findUnique({ where: { id } })

    if(!customer)
      throw new NotFound('Customer not found')
    
      const updatedCustomer = await prisma.customer.update({
        where: { id },
        data: {
          first_name,
          last_name,
          email,
          phone
        }
      })

      return updatedCustomer
  }

  public async deleteCustomerById(id: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: { id }
    })

    if(!customer)
      throw new NotFound('Customer not found')

    await prisma.customer.delete({
      where: { id }
    })

    return customer
  }
}