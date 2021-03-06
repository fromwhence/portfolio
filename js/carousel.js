'use strict';
// Carousel
const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel--track');
// const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel--button-right');
const prevButton = document.querySelector('.carousel--button-left');
const dotsNav = document.querySelector('.carousel--nav');
// const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
const slideHeight = slides[0].getBoundingClientRect().height;
const slideImagesSmall = Array.from(
  document.getElementsByClassName('carousel--image-sml')
);
const slideImagesLarge = Array.from(
  document.getElementsByClassName('carousel--image-lrg')
);

// Resize carsousel based on slide image height
const reSizeCarouselHeight = () => {
  if (window.innerWidth < 600) {
    slideImagesSmall.forEach(image => {
      image.classList.remove('is-hidden');
    });
    slideImagesLarge.forEach(image => {
      image.classList.add('is-hidden');
    });
    let imageHeight = slideImagesSmall[0].height;
    carousel.style.height = `${imageHeight + 2}px`;
  } else {
    slideImagesSmall.forEach(image => {
      image.classList.add('is-hidden');
    });
    slideImagesLarge.forEach(image => {
      image.classList.remove('is-hidden');
    });
    let imageHeight = slideImagesLarge[0].height;
    carousel.style.height = `${imageHeight + 2}px`;
  }
};

window.addEventListener('load', reSizeCarouselHeight);
window.addEventListener('resize', reSizeCarouselHeight);
window.addEventListener('orientationchange', function () {
  location.reload();
  reSizeCarouselHeight();
});

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

// Move to next slide
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// Move to previous slide
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
