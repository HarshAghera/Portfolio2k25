window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.content').style.opacity = '1';
});

window.addEventListener('load', function () {
  document.querySelector('.loading-spinner').style.display = 'none';
  document.querySelector('.landing').classList.add('loaded');
  document.querySelector('.content').style.visibility = 'visible';
});

// Typing Animation for Job Titles
const jobTitles = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Developer',
  'Enthusiastic',
];

let currentIndex = 0;
let isTyping = true;
let cursorBlinkInterval;

function changeJobTitle() {
  const jobTitleElement = document.getElementById('job-title');
  const currentTitle = jobTitles[currentIndex];

  if (isTyping) {
    if (jobTitleElement.textContent.length < currentTitle.length) {
      jobTitleElement.textContent += currentTitle.charAt(
        jobTitleElement.textContent.length,
      );
    } else {
      isTyping = false;
      clearInterval(cursorBlinkInterval);
    }
  } else {
    if (jobTitleElement.textContent.length > 0) {
      jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
    } else {
      currentIndex = (currentIndex + 1) % jobTitles.length;
      isTyping = true;
      cursorBlinkInterval = setInterval(toggleCursor, 500);
    }
  }
}

setInterval(changeJobTitle, 100);

// Close navbar dropdown on link click
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const navbarCollapse = document.getElementById('navbarNav');

      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
      }
    });
  });
});

// About Section Animation
document.addEventListener('DOMContentLoaded', () => {
  const description = document.querySelector('.p-description');
  const spans = description.querySelectorAll('span');

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.classList.add('animate');
            }, index * 350);
          });

          aboutObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );

  const aboutSection = document.querySelector('#about');
  if (aboutSection) aboutObserver.observe(aboutSection);
});

// Scrolling Logic for Sections
const sections = document.querySelectorAll('.section');
let currentSection = 0;

function scrollToSection(index) {
  if (index < 0 || index >= sections.length) return;
  sections[index].scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('wheel', (event) => {
  if (
    event.deltaY > 0 &&
    sections[currentSection].scrollTop +
      sections[currentSection].clientHeight >=
      sections[currentSection].scrollHeight
  ) {
    currentSection = Math.min(currentSection + 1, sections.length - 1);
    scrollToSection(currentSection);
    event.preventDefault();
  } else if (event.deltaY < 0 && sections[currentSection].scrollTop === 0) {
    currentSection = Math.max(currentSection - 1, 0);
    scrollToSection(currentSection);
    event.preventDefault();
  }
});

// Floating Home Button
const homeButton = document.querySelector('.floating-home-button');
const landingSection = document.getElementById('landing');

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const navbarLinks = document.querySelectorAll('.navbar a');
  const scrollableSections = document.querySelectorAll('.scrollable');

  const isTabletOrLaptop = window.matchMedia('(min-width: 769px)').matches;

  if (isTabletOrLaptop) {
    function scrollToSection(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }

    navbarLinks.forEach((link) => {
      link.addEventListener('click', scrollToSection);
    });

    scrollableSections.forEach((section) => {
      section.addEventListener('wheel', (event) => event.stopPropagation(), {
        passive: false,
      });

      section.addEventListener(
        'touchmove',
        (event) => event.stopPropagation(),
        {
          passive: false,
        },
      );
    });

    window.addEventListener(
      'wheel',
      (event) => {
        if (
          ![...scrollableSections].some((section) =>
            section.contains(event.target),
          )
        ) {
          event.preventDefault();
        }
      },
      { passive: false },
    );

    window.addEventListener(
      'touchmove',
      (event) => {
        if (
          ![...scrollableSections].some((section) =>
            section.contains(event.target),
          )
        ) {
          event.preventDefault();
        }
      },
      { passive: false },
    );
  } else {
    console.log('Scrolling is enabled on mobile devices.');
  }
});

// Force scroll to top on page load
window.scrollTo(0, 0);

// Enable scrolling for `.projects` section **only when it fully covers the viewport on mobile**
document.addEventListener('DOMContentLoaded', function () {
  const projectsSection = document.querySelector('.projects');

  const enableScrollingForProjects = () => {
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    if (isSmallScreen) {
      // Enable scroll only when the `.projects` section fully covers the viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              projectsSection.classList.add('scrollable');
            } else {
              projectsSection.classList.remove('scrollable');
            }
          });
        },
        { root: null, threshold: 1.0 },
      );
      observer.observe(projectsSection);
    } else {
      // Allow scroll by default on larger screens
      projectsSection.classList.add('scrollable');
    }
  };

  enableScrollingForProjects();
  window.addEventListener('resize', enableScrollingForProjects); // Reapply logic on resize
});
