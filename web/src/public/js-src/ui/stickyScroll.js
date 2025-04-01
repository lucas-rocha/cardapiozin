export const stickyScroll = () => {
  const header = document.querySelector('.header')
  const configSection = document.querySelector('.config')
  const menuIcon = document.querySelector('.menu-icon')
  const combinedOffset = header.offsetHeight + configSection.offsetHeight
  // const shoppingSection = document.querySelector('.shopping')
  if(window.scrollY > combinedOffset) {
    styleConfig()
  } else {
    styleDefaultConfig()
  }

  function styleDefaultConfig() {
    header.classList.remove('header--hidden')
    configSection.classList.remove('config--fixed')
    menuIcon.style.display = 'none'
    // shoppingSection.style.marginTop = `${configSection.offsetHeight}px`
  }

  function styleConfig() {
    header.classList.add('header--hidden')
    configSection.classList.add('config--fixed')
    menuIcon.style.display = 'block'
    // shoppingSection.style.marginTop = 0
  }
}