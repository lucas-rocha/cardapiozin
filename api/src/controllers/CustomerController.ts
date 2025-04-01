import { Controller, Delete, Get, Middleware, Patch, Post } from "@overnightjs/core";
import { authCustomerMiddleware } from "@src/middlewares/AuthCustomerMiddleware";
import { CustomerService } from "@src/services/CustomerService";
import { NotFound } from "@src/util/errors/ApiError";
import { Request, Response } from "express";

@Controller('customers')
export class CustomerController {
  constructor(private _customerService: CustomerService = new CustomerService()) {
  }

  @Post('')
  public async create(req: Request, res: Response) {
    const { restaurant_id } = req.body
    const newCustomer = await this._customerService.createCustomer(req.body, restaurant_id)

    return res.status(201).json(newCustomer)
  }

  @Get('')
  public async getCustomers(req: Request, res: Response) {
    const customers = await this._customerService.getCustomers()

    return res.status(200).json(customers)
  }

  @Get('me')
  @Middleware(authCustomerMiddleware)
  public async me(req: Request, res: Response) {
    const customer_id = req.context?.customer_id
    const restaurant_id = req.context?.restaurant_id

    if(!customer_id)
      throw new NotFound('Customer id not provided')

    if(!restaurant_id)
      throw new NotFound('Customer id not provided')

    const customer = await this._customerService.getLoggedCustomer(customer_id, restaurant_id)

    return res.status(200).json(customer)
  }

  @Get(':id')
  public async getCustomerById(req: Request, res: Response) {
    const customer = await this._customerService.getCustomerById(req.params.id)

    return res.status(200).json(customer)
  }

  @Patch(':id')
  public async updateCustomerById(req: Request, res: Response) {
    const updatedCustomer = await this._customerService.getCustomerById(req.params.id)

    return res.status(202).json(updatedCustomer)
  }

  @Delete(':id')
  public async deleteCustomerById(req: Request, res: Response) {
    const deletedCustomer = await this._customerService.deleteCustomerById(req.params.id)

    return res.status(202).json(deletedCustomer)
  }
}