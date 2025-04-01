"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor() { }
    getAllProducts() {
        return [
            {
                category: "pizza",
                anchor: "pizza",
                items: [
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db24db9d",
                        name: "Pizza Margherita",
                        description: "Molho de tomate, queijo mozzarella e manjericão fresco",
                        image: "https://example.com/pizza-margherita.jpg",
                        price: "39.90"
                    },
                    {
                        id: "ab5e1b04-c1a3-4a8d-967f-726db248b9d",
                        name: "Pizza Pepperoni",
                        description: "Molho de tomate, queijo mozzarella e pepperoni fatiado",
                        image: "https://example.com/pizza-pepperoni.jpg",
                        price: "42.50"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726dbp48b9d",
                        name: "Pizza Quatro Queijos",
                        description: "Pizza deliciosa com uma combinação de mussarela, gorgonzola, parmesão e provolone.",
                        image: "https://example.com/pizza-quatro-queijos.jpg",
                        price: "35.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726sb248b9d",
                        name: "Pizza Calabresa",
                        description: "Pizza com calabresa defumada, cebola e azeitonas pretas.",
                        image: "https://example.com/pizza-calabresa.jpg",
                        price: "28.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726ab248b9d",
                        name: "Pizza Frango com Catupiry",
                        description: "Pizza com frango desfiado, catupiry e orégano.",
                        image: "https://example.com/pizza-frango-catupiry.jpg",
                        price: "32.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db248b9d",
                        name: "Pizza Portuguesa",
                        description: "Pizza com presunto, ovo, cebola, azeitonas e pimentão.",
                        image: "https://example.com/pizza-portuguesa.jpg",
                        price: "33.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db2h8b9d",
                        name: "Pizza Vegetariana",
                        description: "Pizza com uma combinação de vegetais frescos, incluindo pimentão, cebola, tomate e abobrinha.",
                        image: "https://example.com/pizza-vegetariana.jpg",
                        price: "29.00"
                    }
                ]
            },
            {
                category: "hamburguer",
                anchor: "hamburguer",
                items: [
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db248g9d",
                        name: "Hamburguer Clássico",
                        description: "Pão brioche, carne bovina, queijo cheddar e maionese especial",
                        image: "https://example.com/hamburguer-classico.jpg",
                        price: "24.90"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db248f9d",
                        name: "Hamburguer Bacon",
                        description: "Pão brioche, carne bovina, bacon crocante e queijo cheddar",
                        image: "https://example.com/hamburguer-bacon.jpg",
                        price: "28.50"
                    }
                ]
            },
            {
                category: "hot dog",
                anchor: "hot-dog",
                items: [
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726dbm48b9d",
                        name: "Hot Dog Tradicional",
                        description: "Salsicha, pão macio, mostarda e ketchup",
                        image: "https://example.com/hotdog-tradicional.jpg",
                        price: "12.90"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-7n6db248b9d",
                        name: "Hot Dog Completo",
                        description: "Salsicha, purê de batata, milho, ervilha, batata palha e molhos",
                        image: "https://example.com/hotdog-completo.jpg",
                        price: "15.90"
                    }
                ]
            },
            {
                category: "bolos",
                anchor: "bolos",
                items: [
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-72cdb248b9d",
                        name: "Bolo de Chocolate",
                        description: "Bolo macio de chocolate com cobertura cremosa",
                        image: "https://example.com/bolo-chocolate.jpg",
                        price: "35.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db248b9d",
                        name: "Bolo de Cenoura",
                        description: "Bolo de cenoura com cobertura de chocolate",
                        image: "https://example.com/bolo-cenoura.jpg",
                        price: "30.00"
                    }
                ]
            },
            {
                category: "milk shake",
                anchor: "milk-shake",
                items: [
                    {
                        id: "a75e1b04-c1a3-4z8d-967f-726db248b9d",
                        name: "Milk Shake de Morango",
                        description: "Sorvete de morango com chantilly e calda de morango",
                        image: "https://example.com/milkshake-morango.jpg",
                        price: "18.90"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-927f-716db248b9d",
                        name: "Milk Shake de Chocolate",
                        description: "Sorvete de chocolate com chantilly e calda de chocolate",
                        image: "https://example.com/milkshake-chocolate.jpg",
                        price: "18.90"
                    }
                ]
            },
            {
                category: "sorvetes",
                anchor: "sorvetes",
                items: [
                    {
                        id: "a75e1b04-c1b3-4a8d-967f-726db244b9d",
                        name: "Sorvete de Baunilha",
                        description: "Sorvete cremoso de baunilha",
                        image: "https://example.com/sorvete-baunilha.jpg",
                        price: "10.00"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-726db248h9d",
                        name: "Sorvete de Chocolate",
                        description: "Sorvete cremoso de chocolate",
                        image: "https://example.com/sorvete-chocolate.jpg",
                        price: "10.00"
                    }
                ]
            },
            {
                category: "drinks",
                anchor: "drinks",
                items: [
                    {
                        id: "a75e1b04-c1a3-4a2d-967f-726db248b9d",
                        name: "Coca-Cola",
                        description: "Refrigerante Coca-Cola lata 350ml",
                        image: "https://example.com/coca-cola.jpg",
                        price: "5.50"
                    },
                    {
                        id: "a75e1b04-c1a3-4a8d-967f-721db248b9d",
                        name: "Suco de Laranja",
                        description: "Suco natural de laranja",
                        image: "https://example.com/suco-laranja.jpg",
                        price: "7.00"
                    }
                ]
            }
        ];
    }
}
exports.ProductService = ProductService;
