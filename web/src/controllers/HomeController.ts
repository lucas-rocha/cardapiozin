import { Request, Response } from 'express'

export class HomeController {
  constructor() {}

  public async Index(_: Request, res: Response) {
    const currentYear = new Date().getUTCFullYear()
    const title = 'O Futuro do seu Cardápio Online - Pré-inscrição Exclusiva!'

    res.render('home', {
      currentYear,
      title
    })
  }

  public async GetLead(req: Request, res: Response) {
    const { name, email, estabelecimento} = req.body

    res.json({ name, email, estabelecimento})
  }
}
