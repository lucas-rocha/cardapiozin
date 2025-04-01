import { Request, Response } from "express";
import { ProductService } from "../services/ProductsService";
import { CategoryService } from "../services/CategoryService";

export class ClientAppController {
  private _productService: ProductService
  private _categoryService: CategoryService

  constructor() {
    this._productService = new ProductService()
    this._categoryService = new CategoryService()
    this.Index = this.Index.bind(this);
  }

  public async Index(req: Request, res: Response) {
    const title = 'Burguer do Porto'
    const categories = await this._categoryService.getAllCategories()
    const products = await this._productService.getAllProducts()
    const restaurantInfo = req.context.restaurantSubdomain
    const loggedCustomer = req.context.customer
    return res.render('app', {
      layout: 'clientApp',
      title,
      categories,
      products,
      restaurantInfo,
      activePage: 'home',
      loggedCustomer
    })
  }

  public Sacola(req: Request, res: Response) {
    const title = 'Minha sacola - Burguer do Porto'
    const loggedCustomer = req.context.customer

    return res.render('sacola', {
      layout: 'clientApp',
      title,
      activePage: 'sacola',
      loggedCustomer
    })
  }

  public Conta(req: Request, res: Response) {
    const title = 'Conta - Burguer do Porto'
    const restaurantInfo = req.context.restaurantSubdomain
    const loggedCustomer = req.context.customer

    return res.render('conta', {
      layout: 'clientApp',
      title,
      restaurantInfo,
      activePage: 'conta',
      loggedCustomer
    })
  }

  public checkout(req: Request, res: Response) {
    const title = 'Finalizar pedido - Burguer do Porto'
    
    return res.render('checkout', {
      layout: 'clientApp',
      title
    })
  }

  public CriarConta(req: Request, res: Response) {
    const title = 'Criar conta - Burguer do Porto'
    const restaurantInfo = req.context.restaurantSubdomain || null
    const loggedCustomer = req.context.customer

    return res.render('criar-conta', {
      layout: 'clientApp',
      title,
      restaurantInfo,
      activePage: 'conta',
      loggedCustomer
    })
  }
}