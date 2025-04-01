import { BagController } from "./controllers/BagController"
import { DeliveryOptionsController } from "./controllers/DeliveryOptionsController"
import { InfoController } from "./controllers/InfoController"
import { LoginController } from "./controllers/LoginController"
import { ProductController } from "./controllers/ProductController"
import { RegisterContoller } from "./controllers/RegisterController"
import { SearchController } from "./controllers/SearchController"
import { SubscribeContoller } from "./controllers/SubscribeController"
import { Router } from "./lib/Router"
import { questionsAccordion } from "./ui/accordions"
import { categoryScrool } from "./ui/categoryScroll"
import { menuHamburguer } from "./ui/menuHamburguer"
import { stickyScroll } from "./ui/stickyScroll"

const route = new Router()

route.get(['/conta'], () => {
  const formLogin = document.querySelector('#form-login')
  const loginController = new LoginController()
  
  if(formLogin) {
    formLogin.addEventListener('submit', loginController.authenticate.bind(loginController))
  }
})

route.get(['/conta', '/criar-conta', '/sacola', '/', '/pedidos/finalizar'], () => {
  menuHamburguer()
  const logoutButton = document.querySelector('#logout-button')

  if(logoutButton) {
    let loginController = new LoginController()
    document.querySelector('#logout-button').addEventListener('click', loginController.logout.bind(loginController))
  }
})

try {
  let registerController = new RegisterContoller()

  document.querySelector('#create-customer').addEventListener('click', registerController.createCustomer.bind(registerController))
} catch (error) {
  console.log(error.message)
}

try {
  const infoController = new InfoController()
  
  document.querySelector('#info').addEventListener('click', infoController.show.bind(infoController))
} catch (error) {
  
}

try {
  let subscribeController = new SubscribeContoller()
  
} catch (error) {
  console.log(error.message)
}

try {
  document.querySelector('.subscribe-form__form').addEventListener('submit', subscribeController.save.bind(subscribeController))
} catch (error) {
  console.log(error.message)
}
try {
  let registerController = new RegisterContoller()
  
  document.querySelector('.cadastro-form').addEventListener('submit', registerController.register.bind(registerController))
} catch (error) {
  console.log(error.message)
}


try {
  document.addEventListener('scroll', () => stickyScroll())
  categoryScrool()
} catch (error) {
  console.log(error.message)
}

try {
  const deliveryOptionsController = new DeliveryOptionsController()
  document
    .querySelector('.address__location')
    .addEventListener('click', deliveryOptionsController.show.bind(deliveryOptionsController))
    
    document
    .addEventListener('click', (event) => {
      const modal = document.querySelector("#cep-modal")
      if(event.target === modal) {
        deliveryOptionsController.close()
      }
    })
    
    document
    .addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        deliveryOptionsController.close()
      }
    })
  } catch (error) {
    
  }
  
  
  try {
    const productController = new ProductController()
  } catch (error) {
    console.log(error.message)
  }

  try {
    const bagController = new BagController()
  } catch (error) {
    console.log(error.message)
  }

  const searchController = new SearchController()
  
  try {
    document.querySelector('.search__input').addEventListener('input', (event) => {
      const searchQuery = event.target.value.toLowerCase()
      
      searchController.search(searchQuery)
    })
  } catch (error) {
    
  }
  
  questionsAccordion()