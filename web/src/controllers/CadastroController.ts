import { Request, Response } from "express";

export class CadastroController {
  constructor() {}

  public async Index(_: Request, res: Response) {
    const title = 'Crie sua conta'

    res.render('cadastro', { title })
  }
}