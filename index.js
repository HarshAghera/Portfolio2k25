/* Show content when page is fully loaded */
window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.content').style.opacity = '1';
});

window.addEventListener('load', function () {
  document.querySelector('.loading-spinner').style.display = 'none';

  document.querySelector('.landing').classList.add('loaded');
  document.querySelector('.content').style.visibility = 'visible';
});

const jobTitles = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Developer',
  'Enthusiastic',
];

let currentIndex = 0;
let isTyping = true;

function changeJobTitle() {
  const jobTitleElement = document.getElementById('job-title');
  const currentTitle = jobTitles[currentIndex];

  if (isTyping) {
    // Typing animation
    if (jobTitleElement.textContent.length < currentTitle.length) {
      jobTitleElement.textContent += currentTitle.charAt(
        jobTitleElement.textContent.length,
      );
    } else {
      isTyping = false;
      clearInterval(cursorBlinkInterval);
    }
  } else {
    // Removing animation
    if (jobTitleElement.textContent.length > 0) {
      jobTitleElement.textContent = jobTitleElement.textContent.slice(0, -1);
    } else {
      currentIndex = (currentIndex + 1) % jobTitles.length;
      isTyping = true;
      cursorBlinkInterval = setInterval(toggleCursor, 500);
    }
  }
}

// Start the typing effect
setInterval(changeJobTitle, 100); // Adjust interval as needed

// Close the navbar dropdown when a link is clicked (without jQuery)
document.addEventListener('DOMContentLoaded', function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Loop through each link and add a click event
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Get the collapsed navbar element
      const navbarCollapse = document.getElementById('navbarNav');

      // Check if the navbar collapse is already opened
      if (navbarCollapse.classList.contains('show')) {
        // If it's open, manually collapse it
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false, // Do not toggle, just hide
        });
        bsCollapse.hide(); // Close the navbar
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const description = document.querySelector('.p-description');
  const spans = description.querySelectorAll('span');

  // Observer to detect when the "about" section is visible
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply staggered animations by adding the `animate` class
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.classList.add('animate');
            }, index * 350); // 350ms delay per line
          });

          // Stop observing once animation is triggered
          aboutObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }, // Trigger when 50% of the section is visible
  );

  // Observe the "about" section
  const aboutSection = document.querySelector('#about');
  if (aboutSection) aboutObserver.observe(aboutSection);
});

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
    // Scroll down to next section
    currentSection = Math.min(currentSection + 1, sections.length - 1);
    scrollToSection(currentSection);
    event.preventDefault();
  } else if (event.deltaY < 0 && sections[currentSection].scrollTop === 0) {
    // Scroll up to previous section
    currentSection = Math.max(currentSection - 1, 0);
    scrollToSection(currentSection);
    event.preventDefault();
  }
});

// Get the floating home button element
const homeButton = document.querySelector('.floating-home-button');

// Get the landing section element
const landingSection = document.getElementById('landing');

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section'); // Select all sections
  const navbarLinks = document.querySelectorAll('.navbar a'); // Select all navbar links
  const scrollableSections = document.querySelectorAll('.scrollable'); // Select sections where scrolling is allowed

  // Check if the screen width is greater than 768px (tablet and laptop)
  const isTabletOrLaptop = window.matchMedia('(min-width: 769px)').matches;

  if (isTabletOrLaptop) {
    // Function to scroll to the target section
    function scrollToSection(event) {
      event.preventDefault(); // Prevent default link behavior
      const targetId = this.getAttribute('href').substring(1); // Get the target section ID
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }

    // Attach click event to all navbar links
    navbarLinks.forEach((link) => {
      link.addEventListener('click', scrollToSection);
    });

    // Enable scrolling for scrollable sections
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

    // Disable default scrolling globally
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
window.scrollTo(0, 0);
