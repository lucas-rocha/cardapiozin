export const registerForm = () => {
  const buttons = document.querySelectorAll('.cadastro-form__button')
  const stepper = document.querySelectorAll('.stepper__item')

  buttons.forEach(btn => {
    if(btn.textContent == "Voltar") {
      btn.addEventListener('click', slideBack)
    }

    if(btn.textContent == "Salvar e continuar") {
      btn.addEventListener('click', slideToNext)
    }
  })
      
  function slideToNext() {
    const currentForm = document.querySelector('.subscribe-form__inputwrapper.active');
    const nextForm = currentForm.nextElementSibling;
    
    if (nextForm && nextForm.classList.contains('subscribe-form__inputwrapper')) {
      currentForm.classList.remove('active');
      nextForm.classList.add('active');
    }

    stepper.forEach(st => {
      if(st.getAttribute('data-step') == nextForm.getAttribute('data-step')) {
        const nextImage = st.firstElementChild
        const previousImage = st.previousElementSibling.firstElementChild
        const previousDivisor = st.previousElementSibling.childNodes[3]
        
        nextImage.innerHTML = `<img src="./images/step-actual.png" />`
        st.classList.add('stepper__item--next')

        st.previousElementSibling.classList.add('stepper__item--completed')
        previousImage.innerHTML = `<img src="./images/step-image.png" />`

        previousDivisor.style.background = '#FF4545'
      }
    })
  }

  function slideBack() {
    const currentForm = document.querySelector('.subscribe-form__inputwrapper.active');
    const previousForm = currentForm.previousElementSibling;

    if (previousForm && previousForm.classList.contains('subscribe-form__inputwrapper')) {
      currentForm.classList.remove('active');
      previousForm.classList.add('active');
      
      stepper.forEach(st => {
        if(st.getAttribute('data-step') == previousForm.getAttribute('data-step')) {
          const previousImage = st.firstElementChild
          const nextDivisor = st.childNodes[3]

          st.classList.remove('stepper__item--completed')
          previousImage.innerHTML = `<img src="./images/step-actual.png" />`

          st.nextElementSibling.classList.remove('stepper__item--next')
          st.nextElementSibling.firstElementChild.innerHTML = `<img src="./images/step-next.png" />`

          nextDivisor.style.background = '#DADADA'
        }
      })
    }
  }
  

}