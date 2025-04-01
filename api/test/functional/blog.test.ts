import 'express-async-errors'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

describe('Blog functional tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({})
  })

  describe('When creating a new blog post', () => {
    it('should create a post', async () => {
      const newPost = {
        title: "Dominando o Mundo Digital",
        lead: "Bem-vindo ao nosso universo gastronômico digital.",
        content: "Bem-vindo ao nosso universo gastronômico digital, onde a inovação encontra o sabor!",
        image: "funny-image.png",
        restaurant_id: 1
      }

      const response = await global.testRequest.post('/blog/post').send(newPost)

      await expect(response.status).toBe(201)
      await expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: 'Dominando o Mundo Digital',
        lead: "Bem-vindo ao nosso universo gastronômico digital.",
        content: "Bem-vindo ao nosso universo gastronômico digital, onde a inovação encontra o sabor!",
        image: "funny-image.png",
        restaurant_id: 1
      }))
    })
  })
})