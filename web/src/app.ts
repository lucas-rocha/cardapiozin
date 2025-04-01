import * as dotenv from 'dotenv';
import express from 'express'
import { engine } from 'express-handlebars'
import routes from './routes'
import path from 'path'
import subdomainMiddleware from './middlewares/subdomainMiddleware';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()

app.engine('.hbs', engine({extname: '.hbs'}))
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: {
    eq: (a: any, b: any): boolean => a === b
  }
}));
app.set('view engine', '.hbs')
app.set('views', 'src/views')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use(subdomainMiddleware)

app.use(routes)

export default app
