!function(){"use strict";var e={913:function(e,t,o){e.exports=o.p+"card.webp"},64:function(e,t,o){e.exports=o.p+"digital.webp"},758:function(e,t,o){e.exports=o.p+"grow.webp"}},t={};function o(n){var c=t[n];if(void 0!==c)return c.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e}(),function(){o(913),o(758),o(64);const e=document.querySelector(".modal"),t=document.querySelector(".overlay"),n=document.querySelector(".btn--close-modal"),c=document.querySelectorAll(".btn--show-modal"),r=document.querySelector(".btn--scroll-to"),s=document.querySelector("#section--1"),i=(document.querySelectorAll(".nav__link"),document.querySelector(".nav__links")),l=document.querySelector(".nav"),a=document.querySelector(".nav__logo"),d=function(o){o.preventDefault(),e.classList.remove("hidden"),t.classList.remove("hidden")},u=function(){e.classList.add("hidden"),t.classList.add("hidden")};c.forEach((e=>e.addEventListener("click",d))),n.addEventListener("click",u),t.addEventListener("click",u),document.addEventListener("keydown",(function(t){"Escape"!==t.key||e.classList.contains("hidden")||u()})),r.addEventListener("click",(function(e){const t=s.getBoundingClientRect();console.log("s1coords",t),console.log(e.target.getBoundingClientRect()),console.log("Current scroll (X/Y",window.pageXOffset,window.pageYOffset),console.log("height/width viewport",document.documentElement.clientHeight,document.documentElement.clientWidth),s.scrollIntoView({behavior:"smooth"})})),i.addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("nav__link")){const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}));const g=document.querySelectorAll(".operations__tab"),v=document.querySelector(".operations__tab-container"),f=document.querySelectorAll(".operations__content");function m(e){if(e.target.classList.contains("nav__link")){const t=this,o=e.target;console.log("🚀 ~ handleHover ~ link",o);const n=o.closest(".nav").querySelectorAll(".nav__link");console.log("🚀 ~ handleHover ~ siblings",n),n.forEach((function(e){e!==o&&(e.style.opacity=t),console.log("🚀 ~ el.style.opacity",t)})),a.style.opacity=t}}v.addEventListener("click",(function(e){e.preventDefault();const t=e.target.closest(".operations__tab"),o=t.getAttribute("data-tab");console.log(o),t&&(g.forEach((e=>e.classList.remove("operations__tab--active"))),t.classList.add("operations__tab--active"),f.forEach((e=>e.classList.remove("operations__content--active"))),document.querySelector(`.operations__content--${o}`).classList.add("operations__content--active"))})),l.addEventListener("mouseover",m.bind(.5)),l.addEventListener("mouseout",m.bind(1)),s.getBoundingClientRect();const h=document.querySelector(".header"),p=l.getBoundingClientRect().height;new IntersectionObserver((function(e){const[t]=e;t.isIntersecting?l.classList.remove("sticky"):l.classList.add("sticky")}),{root:null,threshold:0,rootMargin:`-${p}px`}).observe(h);const _=document.querySelectorAll(".section"),y=new IntersectionObserver((function(e,t){const[o]=e;o.isIntersecting&&(o.target.classList.remove("section--hidden"),y.observe(o.target))}),{root:null,threshold:.15});_.forEach((e=>y.observe(e)));const b=document.querySelectorAll("img[data-src]"),L=new IntersectionObserver((function(e){const[t]=e;if(t.isIntersecting){const e=t.target.attributes[1].value;t.target.src=e,t.target.addEventListener("load",(function(){t.target.classList.remove("lazy-img"),L.unobserve(t.target)}))}}),{root:null,threshold:0,rootMargin:"200px"});b.forEach((e=>L.observe(e))),function(){const e=document.querySelectorAll(".slide"),t=document.querySelector(".slider__btn--left"),o=document.querySelector(".slider__btn--right"),n=document.querySelector(".dots");let c=0;const r=e.length,s=function(e){document.querySelectorAll(".dots__dot").forEach((e=>e.classList.remove("dots__dot--active"))),document.querySelector(`.dots__dot[data-slide="${e}"]`).classList.add("dots__dot--active")},i=function(t){e.forEach(((e,o)=>e.style.transform=`translateX(${100*(o-t)}%)`))},l=function(){c===r-1?c=0:c++,i(c),s(c)},a=function(){0===c?c=r-1:c--,i(c),s(c)};i(0),e.forEach((function(e,t){n.insertAdjacentHTML("beforeend",`<button class="dots__dot" data-slide="${t}" aria-label="Slide-${t+1}"></button>`)})),s(0),o.addEventListener("click",l),t.addEventListener("click",a),document.addEventListener("keydown",(function(e){"ArrowLeft"===e.key&&a(),"ArrowRight"===e.key&&l()})),n.addEventListener("click",(function(e){if(e.target.classList.contains("dots__dot")){const{slide:t}=e.target.dataset;i(t),s(t)}}))}()}()}();
//# sourceMappingURL=webpack-critical-css-inliner.js.map