'use strict';
// Removes :focus outline for mouse users
(function (document, window) {
  if (!document || !window) {
    return;
  }
  var styleText =
    '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
  var unfocus_style = document.createElement('STYLE');

  window.unfocus = function () {
    document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);
    document.addEventListener('mousedown', function () {
      unfocus_style.innerHTML = styleText + '}';
    });
    document.addEventListener('keydown', function () {
      unfocus_style.innerHTML = '';
    });
  };

  unfocus.style = function (style) {
    styleText += style;
  };

  unfocus();
})(document, window);

// Variables
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const mainContent = document.getElementById('main-content');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
});

// Page navigation using Event Delegation
document.querySelector('.nav-list').addEventListener('click', function (e) {
  // e.preventDefault();
  if (e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
