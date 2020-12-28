'use strict';

const portfolioNav = document.querySelector('.portfolio-list');
const portfolioLiActive = document.querySelector('.current-page');

// Portfolio menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('portfolio-list--link')) {
    const link = e.target;
    const siblings = link
      .closest('.portfolio-list')
      .querySelectorAll('.portfolio-list--link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      el.style.borderBottom = 'px solid var(--clr-accent)';
    });

    portfolioLiActive.style.borderBottom = `3px solid rgba(108, 224, 253, ${this})`;
  }
};

portfolioNav.addEventListener('mouseover', handleHover.bind(0.5));
portfolioNav.addEventListener('mouseout', handleHover.bind(1));
