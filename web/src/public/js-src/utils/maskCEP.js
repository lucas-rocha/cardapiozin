export const maskCEP = () => {
  const cepInput = document.getElementById('cep');

  cepInput.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2'); // Aplica máscara de CEP
    }

    event.target.value = value;
  });
}