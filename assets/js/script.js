// Navbar Toggle for Mobile
function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  if (navMenu && menuToggle) {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  }
}

// News Scroller Toggle
function toggleNewsScroller() {
  const scroller = document.getElementById('news-scroller');
  const newsIcon = document.getElementById('news-icon');
  const closeIcon = document.getElementById('news-close-icon');

  if (scroller) {
    if (scroller.style.display === 'none' || scroller.style.display === '') {
      scroller.style.display = 'block';
      if (newsIcon) newsIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
    } else {
      scroller.style.display = 'none';
      if (newsIcon) newsIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }
  }
}

// Counting Animation for Stats
document.addEventListener('DOMContentLoaded', function () {
  const statNumbers = document.querySelectorAll('.stat-number');

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Counter animation function
  function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 1200; 
    const frameRate = 8;
    const increment = target / (duration / frameRate);
    let current = 0;

    const counter = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(counter);
        if (target > 100) {
          element.innerText = current + '+';
        } else {
          element.innerText = current;
        }
      } else {
        element.innerText = Math.floor(current);
      }
    }, frameRate);
  }

  let animated = false;

  window.addEventListener('scroll', function () {
    if (!animated && statNumbers.length > 0) {
      if (isInViewport(statNumbers[0])) {
        animated = true;
        statNumbers.forEach(stat => animateCounter(stat));
      }
    }
  });

  if (statNumbers.length > 0 && isInViewport(statNumbers[0])) {
    animated = true;
    statNumbers.forEach(stat => animateCounter(stat));
  }
});

// News Scroller Functionality
document.addEventListener('DOMContentLoaded', function () {
  const newsPanel = document.getElementById("newsPanel");
  const toggleBtn = document.getElementById("newsBtn");
  const scroller = document.querySelector("#newsPanel .news-body");
  const track = document.querySelector("#newsPanel .news-track");

  if (toggleBtn && newsPanel) {
    toggleBtn.onclick = () => newsPanel.classList.toggle("hidden");
  }

  if (scroller && track) {
    let scrollSpeed = 0.5;
    let isDragging = false;
    let startY, startScroll;

    function autoScroll() {
      if (!isDragging) {
        scroller.scrollTop += scrollSpeed;
        if (scroller.scrollTop >= track.scrollHeight / 2) {
          scroller.scrollTop = 0;
        }
      }
      requestAnimationFrame(autoScroll);
    }
    autoScroll();

    scroller.addEventListener("mousedown", e => {
      isDragging = true;
      scroller.style.cursor = "grabbing";
      startY = e.pageY;
      startScroll = scroller.scrollTop;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      scroller.style.cursor = "grab";
    });

    document.addEventListener("mousemove", e => {
      if (!isDragging) return;
      const dy = e.pageY - startY;
      scroller.scrollTop = startScroll - dy;
    });
  }
});

// Hero Slider Logic
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (!slider || slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 4000;
  let autoSlideInterval;

  function goToSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function startSlideTimer() {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
  }

  function stopSlideTimer() {
    clearInterval(autoSlideInterval);
  }

  startSlideTimer();

  // Dot Click Events
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopSlideTimer();
      const slideIndex = parseInt(e.target.dataset.slide);
      if (!isNaN(slideIndex)) {
        goToSlide(slideIndex);
        startSlideTimer();
      }
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopSlideTimer);
  slider.addEventListener('mouseleave', startSlideTimer);
});