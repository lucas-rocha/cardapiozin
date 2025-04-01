export class CategoryService {
  constructor() {}

  getAllCategories() {
    return [
      {
        name: "Pizza",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/pizza.png",
        anchor: "pizza"
      },
      {
        name: "Hamburguer",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/burger.png",
        anchor: "hamburguer"
      },
      {
        name: "Hot Dog",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/hot-dog.png",
        anchor: "hot-dog"
      },
      {
        name: "Bolos",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/cake.png",
        anchor: "bolos"
      },
      {
        name: "Milk Shake",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/cup.png",
        anchor: "milk-shake"
      },
      {
        name: "Sorvetes",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/sorvetes.png",
        anchor: "sorvetes"
      },
      {
        name: "Drinks",
        image: "https://cardapiozin.s3.sa-east-1.amazonaws.com/images/categories/default/drinks.png",
        anchor: "drinks"
      }
    ]
  }
}