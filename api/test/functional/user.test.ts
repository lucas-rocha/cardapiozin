import 'express-async-errors'
import AuthService from "@src/services/AuthService"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe('Users functional tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })
  describe('When creating a new user', () => {
    it('should create a new user with encrypted password', async() => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '123456',
        passwordTwo: '123456'
      }

      const response = await global.testRequest.post('/users').send(newUser)
      await expect(response.status).toBe(201)

      await expect(AuthService.comparePasswords(newUser.password, response.body.password)).resolves.toBeTruthy()

      await expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        firstName: "Lucas",
        lastName: "Rocha",
        email: "lucasrocha.dv@gmail.com",
        password: expect.any(String),
        passwordDate: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }))
    })

    it('should return 400 when fields are missing', async() => {
      const newUser = {
        firstName: '',
        lastName: '',
        email: 'lucasrocha@gmail.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      const response = await global.testRequest.post('/users').send(newUser)
      
      await expect(response.status).toBe(400)
      expect(response.body).toEqual({
        code: 400,
        message: 'Some fields are missing!'
      })
    })

    it('should return 409 when the email alrealdy exists', async() => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha@gmail.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      await global.testRequest.post('/users').send(newUser)
      const response = await global.testRequest.post('/users').send(newUser)

      expect(response.status).toBe(409)
      expect(response.body).toEqual({
        code: 409,
        message: 'Email already exists!'
      })
      
    })
  
  })

  describe('When getting a user', () => {
    it('should get a user by id', async () => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      const user = await global.testRequest.post('/users').send(newUser)
      const response = await global.testRequest.get(`/users/${user.body.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(response.body))
    })

    it('should return 404 when the user is not found', async () => {
      const response = await global.testRequest.get('/users/1')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        code: 404,
        message: 'User not found!'
      })
    })
  })

  describe('When getting a list of users', () => {
    it('should return a list of users', async () => {
      const newUser1 = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucas@cardapiozin.com',
        password: '1234546',
        passwordTwo: '1234546'
      }
      const newUser2 = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha@cardapiozin.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      const response1 = await global.testRequest.post('/users').send(newUser1)
      const response2 = await global.testRequest.post('/users').send(newUser2)

      const response = await global.testRequest.get('/users')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining([
        {
          id: response1.body.id,
          firstName: "Lucas",
          lastName: "Rocha",
          email: "lucas@cardapiozin.com",
          password: response1.body.password,
          passwordDate: response1.body.passwordDate,
          createdAt: response1.body.createdAt,
          updatedAt: response1.body.updatedAt,
          restaurant_id: response1.body.restaurant_id
        },
        {
          id: response2.body.id,
          firstName: "Lucas",
          lastName: "Rocha",
          email: "lucasrocha@cardapiozin.com",
          password: response2.body.password,
          passwordDate: response2.body.passwordDate,
          createdAt: response2.body.createdAt,
          updatedAt: response2.body.updatedAt,
          restaurant_id: response2.body.restaurant_id
        }
      ]))

    })
  })

  describe('When updating a user', () => {
    it('should return 404 when the user is not found', async () => {
      const response = await global.testRequest.get('/users/1')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        code: 404,
        message: 'User not found!'
      })
    })

    it('should update the user', async() => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      const user = await global.testRequest.post('/users').send(newUser)
      const response = await global.testRequest.patch(`/users/${user.body.id}`).send({
        email: 'lucasrocha@cardapiozin.com'
      })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({
        id: response.body.id,
        firstName: "Lucas",
        lastName: "Rocha",
        email: "lucasrocha@cardapiozin.com",
        password: response.body.password,
        passwordDate: response.body.passwordDate,
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt
      }))
    })
  })

  describe('When deleting a new user', () => {
    it('should return 404 when the user is not found', async () => {
      const response = await global.testRequest.delete('/users/1')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        code: 404,
        message: 'User not found!'
      })
    })

    it('should delete a user sucessfully', async () => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '1234546',
        passwordTwo: '1234546'
      }

      const user = await global.testRequest.post('/users').send(newUser)
      const response = await global.testRequest.delete(`/users/${user.body.id}`)

      expect(response.status).toBe(202)
      await expect(response.body).toEqual(expect.objectContaining({
        id: response.body.id,
        firstName: response.body.firstName,
        lastName: response.body.lastName,
        email: response.body.email,
        password: response.body.password,
        passwordDate: response.body.passwordDate,
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt
      }))
    })
  })

  describe('When authenticating a user', () => {
    it('should generate a token for a valid user', async () => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '123456',
        passwordTwo: '123456'
      }

      const user = await global.testRequest.post('/users').send(newUser)

      const response = await global.testRequest.post('/users/login').send({
        email: "lucasrocha.dv@gmail.com",
        password: "123456",
      })

      const JwtClaims = AuthService.decodeToken(response.body.token)
      expect(response.body.token).toBeTruthy()
      expect(JwtClaims).toMatchObject({ sub: user.body.id })
    })

    it('should return 404 when the user is not found', async () => {
      const newUser = {
        email: 'emailnotfound@gmail.com',
        password: '123456'
      }

      const response = await global.testRequest.post('/users/login').send({
        email: newUser.email,
        password: newUser.password
      })

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        code: 404,
        message: 'User not found!'
      })

    })

    it('should return 400 for invalid password', async () => {
      const newUser = {
        firstName: 'Lucas',
        lastName: 'Rocha',
        email: 'lucasrocha.dv@gmail.com',
        password: '123456',
        passwordTwo: '123456'
      }

      await global.testRequest.post('/users').send(newUser)
     
      const response = await global.testRequest.post('/users/login').send({
        email: newUser.email,
        password: '1234567'
      })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({
        code: 400,
        message: 'Password does not match!'
      })
    })

  })

})