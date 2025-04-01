export class RegisterService {
  constructor() {}

  async createUser(user) {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })

    const data = await response.json()

    if(!response.ok) {
      throw new Error(data.message || 'Erro ao criar o usuário')
    }
      
    return data
  }
}