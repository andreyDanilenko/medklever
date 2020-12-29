// Выпадающее меню

let wrapper = document.querySelector('.header__wrapper');
let navToggle = document.querySelector('.header__burger');
let header = document.querySelector('.hero');
let nav = document.querySelector(".header__nav")

navToggle.addEventListener('click', function () {
  if (wrapper.classList.contains('header__wrapper--closed')) {
    wrapper.classList.remove('header__wrapper--closed');
    wrapper.classList.add('header__wrapper--opened');
  } else {
    wrapper.classList.add('header__wrapper--closed');
    wrapper.classList.remove('header__wrapper--opened');
  }

  nav.classList.toggle('header__nav--opened')
  header.classList.toggle('hero--open');
});

// Слайдер для мобильного

const slidesToShow = 1;
const slidesToScroll = 1;
let position = 0;

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const container = document.querySelector(".slider__container");
const slideList = document.querySelector(".slider__list");
const slideItem = document.querySelectorAll(".slider__item");
const slideItemCount = slideItem.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const indicators = document.querySelectorAll(".slider__indicator");

slideItem.forEach(item => {
  item.style.minWidth = `${itemWidth}px`;
});

indicators.forEach((item, i) => {
  item.addEventListener('click', function () {
    position = -(itemWidth * i);

    item.classList.add("active");

    setPosition();
  });
  console.log(item)
});


btnPrev.addEventListener('click', function () {
  const itemsLeft = slideItemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  if (itemsLeft === 0) {
    position += itemWidth * (slideItemCount - slidesToShow);
  }
  setPosition();
});

btnNext.addEventListener('click', function () {
  const itemsLeft = Math.abs(position) / itemWidth;
  position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  if (itemsLeft === 0) {
    position -= itemWidth * (slideItemCount - slidesToShow);
  }
  setPosition();
});

window.setInterval(function () {
  const itemsLeft = slideItemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  if (itemsLeft === 0) {
    position += itemWidth * (slideItemCount - slidesToShow);
  }
  setPosition();
}, 5000);

const setPosition = () => {
  slideList.style.transform = `translateX(${position}px)`;
  slideList.style.transition = `3s`;
}








