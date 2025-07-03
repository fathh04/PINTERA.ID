(function () {
  "use strict";

  // Tambah class .scrolled ke body saat scroll turun
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  // Inisialisasi AOS
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // Scroll ke posisi hash saat halaman diload
  window.addEventListener('load', function () {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // Scrollspy navmenu
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();

// Interaksi tombol WhatsApp
document.querySelector('a[href="#wa-button"]').addEventListener('click', function (e) {
  e.preventDefault();
  const waButton = document.getElementById('wa-button');

  // Scroll ke tombol WhatsApp
  waButton.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Tambahkan animasi zoom
  waButton.classList.add('zoom-pop');

  // Hapus kelas animasi setelah selesai
  setTimeout(() => {
    waButton.classList.remove('zoom-pop');
  }, 600);
});

// Scroll top button visibility berdasarkan hero
const scrollTopBtn = document.getElementById('scroll-top');
const heroSection = document.getElementById('hero');

const observer = new IntersectionObserver(
  function(entries) {
    if (entries[0].isIntersecting) {
      scrollTopBtn.style.display = 'none';
    } else {
      scrollTopBtn.style.display = 'flex';
    }
  },
  {
    root: null,
    threshold: 0.4
  }
);

observer.observe(heroSection);

// template
  document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.querySelector('#download-template');
  const alertBox = document.querySelector('#template-alert');
  const timerSpan = document.querySelector('#alert-timer');

  if (downloadBtn && alertBox && timerSpan) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();

      let timeLeft = 3;
      timerSpan.textContent = timeLeft;

      alertBox.classList.remove('d-none');
      alertBox.classList.add('show');

      const countdown = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          alertBox.classList.remove('show');
          alertBox.classList.add('d-none');
        }
      }, 1000);
    });
  }
});


