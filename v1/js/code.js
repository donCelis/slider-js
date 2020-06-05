let slide = document.querySelector('.slide'),
  images = document.querySelectorAll('.slide img'),
  arrows = document.querySelector('.arrows'),
  options = document.querySelectorAll('.option'),
  counter = 1,
  opIndex = 0,
  size = slide.clientWidth

//Actualizar el estado de los puntos
update()

function update() {
  slide.style.transform = `translateX(${-size * counter}px)`
  options.forEach((e) => {
    e.classList.remove('fill')
  })
  options[opIndex].classList.add('fill')
}

//Aplicar las transición
function slider() {
  slide.style.transition = 'transform 0.5s ease-in-out'
  update()
}

//Mover las fotos con las flechas
function moveArrow(i) {
  if (i.includes('next')) {
    if (counter >= images.length - 1) return
    counter++
    if (opIndex === options.length - 1) {
      opIndex = 0
    } else {
      opIndex++
    }
  } else if (i.includes('prev')) {
    if (counter <= 0) return
    counter--
    if (opIndex === 0) {
      opIndex = options.length - 1
    } else {
      opIndex--
    }
  }
  slider()
}

arrows.addEventListener('click', (e) => {
  let element = e.target.className
  moveArrow(element)
})

//Código para reiniciar el slider
slide.addEventListener('transitionend', (e) => {
  let element = e.target.children[counter]
  if (element.className === 'last') {
    slide.style.transition = 'none'
    counter = images.length - 2
    slide.style.transform = `translateX(${-size * counter}px)`
  } else if (element.className === 'first') {
    slide.style.transition = 'none'
    counter = images.length - counter
    slide.style.transform = `translateX(${-size * counter}px)`
  }
})

//Código para mover las fotos con los puntos
let optionFunc = function (e) {
  let i = Number(e.target.dataset.index)
  opIndex = i
  counter = i + 1
  slider()
}

options.forEach((e) => {
  e.addEventListener('click', optionFunc)
})