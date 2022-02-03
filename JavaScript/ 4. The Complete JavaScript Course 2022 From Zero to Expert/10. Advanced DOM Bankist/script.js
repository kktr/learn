/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';
///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.nav__logo');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Modal window
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log('s1coords', s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   );
  // });
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

// navLink.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);

//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add even listener to common parent element
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  const dataTab = clicked.getAttribute('data-tab');
  console.log(dataTab);

  // Guard clause
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));

  clicked.classList.add('operations__tab--active');
  // console.log(this.parentNode.children);
  //   this.parentNode.children.forEach((tab) => {
  //     tab.classList.remove('operations__tab--active');
  //   });
  //   if (this.parentNode.children.classList.contains('operations__content--1')) {
  //     console.log('passed');
  //   }
  // Activate content
  tabContent.forEach((content) =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${dataTab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const opacity = this;
    const link = e.target;
    console.log('🚀 ~ handleHover ~ link', link);

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    console.log('🚀 ~ handleHover ~ siblings', siblings);

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = opacity;
      console.log('🚀 ~ el.style.opacity', opacity);
    });

    logo.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// scroll isn't efficient
const initialCords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky')
// });

//  13/197 A Better Way: The Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const sections = document.querySelectorAll('.section');

const showSection = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    sectionObserver.observe(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
  // rootMargin: `-${navHeight}px`,
});

sections.forEach((section) => sectionObserver.observe(section));

// lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

function showImg(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    const dataSrc = entry.target.attributes[1].value;
    entry.target.src = dataSrc;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
      imgObserver.unobserve(entry.target);
    });
  }
}

const imgObserver = new IntersectionObserver(showImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//! Lessons

// 13/186 Selecting, Creating, and Deleting Elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');
// console.log('🚀 ~ allSections', allSections);

// console.log(document.getElementById('section--1'));

// const allButtons = document.getElementsByTagName('button');
// console.log('🚀 ~ allButtons', allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookie for improve functionality and analytics'
// message.innerHTML = `We use cookie for improve functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>`;

// // header.prepend(message);

// // header.append(message.cloneNode(true));

// header.append(message);

// // header.before(message);
// // header.after(message);

// console.log(document.querySelector('.btn-close-cookie'));
// document
//   .querySelector('.btn-close-cookie')
//   .addEventListener('click', function (e) {
//     e.preventDefault;
//     message.remove();
//   });

// // 13/187 Styles, Attributes and Classes

// // styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log('only for inline style', message.style.backgroundColor);
// console.log('empty', message.style.height);

// console.log('for real style, css, browser', getComputedStyle(message).height);

// const height = getComputedStyle(message).height;
// console.log('🚀 ~ height', height);
// console.log(parseInt(height));

// message.style.height = `${parseInt(height) + 100}px`;

// console.log('🚀 ~ height', height);
// console.log('after change', message.style.height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes

// console.log('alt', logo.alt);
// console.log('absolute src', logo.src);
// console.log('relative src', logo.getAttribute('src'));
// console.log('src', logo.className);

// // Non-standard, don't work
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// logo.setAttribute('company', 'Bankist');

// logo.alt = 'beautiful minimalist logo';
// console.log(logo.alt);

// // data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // don't use
// // logo.className = 'jonas'

// // 13/188 Implementing smooth scrolling

// // 13/189 Types of events and events handlers

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// // h1.addEventListener('mouseenter', alertH1);

// // 13/190 Event propagation: bubbling and capturing

// // 13/191 Event propagation in practice

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('nav__link', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('.nav__links', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('.nav', e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// });

// // 13/193 Dom traversing

// // going downwards: child
// // finding children no matter how far it is
// console.log(h1.querySelectorAll('.highlight'));
// console.log('h1.childNodes', h1.childNodes);
// console.log('h1.children', h1.children);
// h1.firstElementChild.style.color = randomColor();
// h1.lastElementChild.style.color = randomColor();

// // going upwards: parents
// console.log('h1.parentNode', h1.parentNode);
// console.log('h1.parentElement', h1.parentElement);

// // finding parent no matter how far it is
// console.log(h1.closest('.header'));

// // going sideways: siblings
// console.log('h1.previousElementSibling)', h1.previousElementSibling);
// console.log('h1.nextElementSibling)', h1.nextElementSibling);

// console.log('h1.previousSibling', h1.previousSibling);
// console.log('h1.nextSibling', h1.nextSibling);

// // all siblings
// console.log('h1.parentNode.children', h1.parentNode.children);
// // [...h1.parentNode.children].forEach(function (el) {
// //   if (el !== h1) el.style.transform = 'scale(0.5)';
// // });

// // 13/194 Build tabbed component
