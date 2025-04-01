const restaurants = [
  {
    subdomain: 'hamburgueria'
  }
]

export class RestaurantService {
  static async findBySubdomain(subdomain: string| undefined) {
    try {
      const response = await fetch(`http://localhost:5000/info/${subdomain}`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar informações do restaurante:", error);
      return null
    }
  }
}