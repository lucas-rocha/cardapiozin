import Glide from '@glidejs/glide'

export const categoryScrool = () => {
  let glideInstance

  glideInstance = new Glide('.glide', {
    startAt: 0,
    perView: 7,
    breakpoints: {
      480: {
        perView: 4
      }
    }
  }).mount() 

  document.querySelector('.config__image').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
  const categoriesLinks = document.querySelectorAll('.category__link');

  const setActiveCategory = (index) => {
    // Remove a classe 'active' de todos os links
    document.querySelectorAll('.category__option').forEach(item => {
      item.classList.remove('category__option--active');
    });

    // Adiciona a classe 'active' ao link da categoria correspondente
    if (categoriesLinks[index]) {
      categoriesLinks[index].childNodes[1].childNodes[1].classList.add('category__option--active');
    }

    categoriesLinks.forEach(categoryLink => {
      categoryLink.childNodes[1].childNodes[1].classList.remove('category__option--active')
      categoryLink.childNodes[1].childNodes[1].nextSibling.nextElementSibling.style.fontWeight = 'normal'
    })

    categoriesLinks[index].childNodes[1].childNodes[1].classList.add('category__option--active')
    categoriesLinks[index].childNodes[1].childNodes[1].nextSibling.nextElementSibling.style.fontWeight = 'bold'
  }
  
  const originalsItems = Array.from(document.querySelectorAll('.products__items'));

  const searchInput = document.querySelector('.search__input');
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    
    // Encontra o índice da categoria correspondente na lista
    const categoryIndex = findCategoryIndexBySearch(query);
    
    if (categoryIndex !== -1) {
      // Atualiza o Glide para a categoria encontrada
      glideInstance.go(`=${categoryIndex}`);
      setActiveCategory(categoryIndex)
      console.log(categoryIndex)
    }
  });

  // Função para encontrar o índice da categoria correspondente
  const findCategoryIndexBySearch = (query) => {
    
    return originalsItems.findIndex(category => {
      const items = category.querySelectorAll('.products__name'); // Nome dos itens na categoria
      return Array.from(items).some(item => 
        item.textContent.toLowerCase().includes(query)
      );
    });
  };


  // Event listener para clique nas categorias
  categoriesLinks.forEach(categoryLink => {
    categoryLink.addEventListener('click', (event) => {
      event.preventDefault();
      
      // Remove a classe 'active' de todos os links
      document.querySelectorAll('.category__option').forEach(item => {
        item.classList.remove('category__option--active');
      });
      
      // Obtém a seção alvo e faz o scroll suave até ela
      const targetSection = document.querySelector(categoryLink.getAttribute('href'));
      const headerHeight = document.querySelector('.config').offsetHeight;
      const sectionPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Adiciona a classe 'active' ao link clicado
      categoryLink.childNodes[1].childNodes[1].classList.add('category__option--active');
    });
  });

  const sections = document.querySelectorAll('.products__items');

  // Detecta qual seção está visível na tela durante o scroll
  document.addEventListener('scroll', () => {
    let currentSection = '';
    let currentIndex

    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - window.innerHeight / 2; // Define a metade da altura da janela como ponto de ativação
       if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
        currentIndex = index    
      }
    });

    glideInstance.go(`=${currentIndex}`)
    
    // Atualiza o estilo dos links das categorias com base na seção visível
    categoriesLinks.forEach(categoryLink => {
      categoryLink.childNodes[1].childNodes[1].classList.remove('category__option--active');
      categoryLink.childNodes[1].childNodes[1].nextSibling.nextElementSibling.style.fontWeight = 'normal';

      if (categoryLink.getAttribute('href') === `#${currentSection}`) {
        categoryLink.childNodes[1].childNodes[1].classList.add('category__option--active');
        categoryLink.childNodes[1].childNodes[1].nextSibling.nextElementSibling.style.fontWeight = 'bold';
      }
    });
  });
};
