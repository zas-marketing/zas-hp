(function () {
  'use strict';

  /* ---------- Header: solid on scroll ---------- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('solid', window.scrollY > 60);
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('site-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      header.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 960 && a.parentElement.classList.contains('has-dropdown')) return;
        menu.classList.remove('open');
        header.classList.remove('menu-open');
      });
    });

    /* Mobile: dropdown toggle on click */
    menu.querySelectorAll('.has-dropdown > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          var li = a.parentElement;
          li.classList.toggle('open');
        }
      });
    });
  }

  /* ---------- Hero slideshow ---------- */
  var slides   = [].slice.call(document.querySelectorAll('.slide'));
  var dotsWrap = document.getElementById('dots');
  if (slides.length && dotsWrap) {
    var cur = 0;
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', (i + 1) + '枚目のスライド');
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', function () { goSlide(i); });
      dotsWrap.appendChild(b);
    });
    var dots = [].slice.call(dotsWrap.children);

    function goSlide(i) {
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('on');
      cur = i;
      slides[cur].classList.add('active');
      dots[cur].classList.add('on');
    }
    setInterval(function () { goSlide((cur + 1) % slides.length); }, 5000);
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = [].slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = [].slice.call(document.querySelectorAll('.faq-item'));
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (el) { el.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

})();
