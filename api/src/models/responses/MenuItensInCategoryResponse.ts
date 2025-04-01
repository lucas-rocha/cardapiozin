export class MenuItensInCategoryResponse{
    category: string
    anchor: string
    itens: {
      id: number,
      item_name: string,
      price: Decimal,
      description: string | null,
      image: string | null 
    }[]
}
