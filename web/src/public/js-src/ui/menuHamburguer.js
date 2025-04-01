export const menuHamburguer = () => {
  const menu = document.getElementById('menu')
  const menuIcon = document.querySelector('.menu-icon')
  const modal = document.querySelector('.modal-general')
  
  menuIcon.addEventListener('click', openMenu)
  modal.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal-general')) {
      closeMenu()
    }
  })

  function openMenu() {
    modal.style.display = 'flex'
    modal.innerHTML = ''
    menu.classList.add('menu--active')
  }

  function closeMenu() {
    menu.classList.remove('menu--active')
    modal.style.display = 'none'
  }
}