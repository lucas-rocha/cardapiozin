import { ProductService } from "../domain/Product/ProductService"
import { SearchProductsView } from "../ui/views/SearchProductsView"
import { ProductController } from "./ProductController"

export class SearchController {
  constructor() {
    this._productService = new ProductService()
    this._searchProductsView = new SearchProductsView('.products')
  }

  search(query) {
    const products = this._productService.getAllProducts()

    const result = products.map(category => {
      const filteredItems = category.items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )

      if (filteredItems.length > 0) {
        return {
          category: category.category,
          anchor: category.anchor,
          items: filteredItems
        }
      }

      return null
    }).filter(category => category !== null)
   
    this._searchProductsView.update(result)
    const productController = new ProductController()
  }
}