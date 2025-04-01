import { Request, Response } from 'express'

export class BlogController {
  constructor() {}

  public async Index(_: Request, res: Response) {
    const currentYear = new Date().getUTCFullYear()
    const title = 'Blog'

    res.render('blog', {
      currentYear, 
      title
    })
  }
}
