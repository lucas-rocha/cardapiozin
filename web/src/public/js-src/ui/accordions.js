export const questionsAccordion = () => {
  try {
    var accordions = document.querySelectorAll('.questions__accordion');
    
    accordions.forEach(function (accordion) {
        accordion.addEventListener('click', function () {
    
            const panel = this.nextElementSibling
            accordion.classList.toggle('questions__accordion--active')
    
            if(panel.style.display === "block") {
                panel.style.display = "none"
                this.childNodes[1].attributes[0].value = "./images/arrow-right-questions.png"
            } else {
                panel.style.display = "block"
                this.childNodes[1].attributes[0].value = "./images/arrow-down.png"
            }
        });
    });
  } catch (error) {
    console.log(error.message)
  }
}
