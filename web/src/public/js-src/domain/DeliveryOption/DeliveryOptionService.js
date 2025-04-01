import { HttpService } from "../../utils/HttpService";

export class DeliveryOptionService {
  constructor() {
    this._http = new HttpService()
  }

  async searchCEP(cep) {
    return await this._http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}