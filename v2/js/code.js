let slides = document.querySelector('.slider').children,
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  indicator = document.querySelector('.indicator'),
  index = 0

//Print images in view
let numberImages = 1
for (let i of slides) {
  i.style.backgroundImage = `url("img/photo${numberImages}.jpg")`
  numberImages++
}

prev.addEventListener('click', () => {
  prevSlide()
  updateCircleIndicator()
  resetTimer()
})

next.addEventListener('click', () => {
  nextSlide()
  updateCircleIndicator()
  resetTimer()
})

// create circle indicators
let circleIndicator = () => {
  for (const i in slides) {
    if (slides.hasOwnProperty(i)) {
      const div = document.createElement('div')
      div.setAttribute('onclick', 'indicateSlide(this)')
      div.id = i
      if (i == 0) {
        div.className = 'active'
      }
      indicator.appendChild(div)
    }
  }
}
circleIndicator()

let indicateSlide = element => {
  index = element.id
  changeSlide()
  updateCircleIndicator()
  resetTimer()
}

let updateCircleIndicator = () => {
  for (const i of indicator.children) {
    i.classList.remove('active')
  }
  indicator.children[index].classList.add('active')
}

let prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1
  }
  else {
    index--
  }
  changeSlide()
}

let nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0
  }
  else {
    index++
  }
  changeSlide()
}

let changeSlide = () => {
  for (const i of slides) {
    i.classList.remove('active')
  }
  slides[index].classList.add('active')
}

let resetTimer = () => {
  clearInterval(timer)
  timer = setInterval(autoPlay, 8000)
}

let autoPlay = () => {
  nextSlide()
  updateCircleIndicator()
}

let timer = setInterval(autoPlay, 8000)