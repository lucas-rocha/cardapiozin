import { Router } from 'express'
import { HomeController } from './controllers/HomeController'
import { BlogController } from './controllers/BlogController'
import { CadastroController } from './controllers/CadastroController'
import { ClientAppController } from './controllers/ClientAppController'
import { LeadController } from './controllers/LeadController'
import authMiddleware from './middlewares/authMiddleware'

const routes = Router()

const homeController = new HomeController()
const blogController = new BlogController()
const leadController = new LeadController()
const cadastroController = new CadastroController()
const clientAppController = new ClientAppController()

routes.get('/', authMiddleware, (req, res) => {
  if(req.context.restaurantSubdomain) {
    return clientAppController.Index(req, res) 
  } else {
    return homeController.Index(req, res) 
  }
})

routes.get('/sacola', authMiddleware, (req, res) => {
  if(req.context.restaurantSubdomain) {
    return clientAppController.Sacola(req, res) 
  }
  
})

routes.get('/conta', authMiddleware, (req, res) => {
  if(req.context.restaurantSubdomain) {
    return clientAppController.Conta(req, res) 
  }
  
})

routes.get('/pedidos/finalizar', authMiddleware, (req, res) => {
  if(req.context.restaurantSubdomain) {
    return clientAppController.checkout(req, res)
  }
})

routes.get('/criar-conta', authMiddleware, (req, res) => {
  if(req.context.restaurantSubdomain) {
    return clientAppController.CriarConta(req, res) 
  }
})

// routes.get('/hamburgueria', (req, res) => {
//     return clientAppController.Index(req, res) 
// })

// routes.get('/sacola', (req, res) => {
//     return clientAppController.Sacola(req, res) 
  
// })

routes.post('/', homeController.GetLead)

routes.get('/pre-inscricao-exclusiva', cadastroController.Index)

routes.get('/blog', blogController.Index)

routes.post('/api/leads', leadController.createLead)
routes.get('/parabens', leadController.congratulateLead)




export default routes
