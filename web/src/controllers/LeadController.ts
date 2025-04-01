import { Request, Response } from "express";
import { supabase } from "../config/database";

export class LeadController {
  constructor() {}

  public async createLead(req: Request, res: Response) {
    const { name, lastname, email, phone_number, restaurant_name } = req.body
    
    const { data } = await supabase.from('leads').insert({
      name,
      lastname,
      email,
      phone_number,
      restaurant_name
    }).select()

    return res.status(201).json(data)
  }

  public congratulateLead(req: Request, res: Response) {
    const { name, restaurant } = req.query

    res.render('congratulations', {
      layout: 'basicLayout',
      name,
      restaurant
    })
  }
}