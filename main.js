// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navDots = document.querySelectorAll(".nav-dot");
  const sections = document.querySelectorAll(".section");


  // Navigation click handlers
  navDots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const targetSection = document.getElementById(this.dataset.section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Update active nav dot on scroll
  function updateActiveNavDot() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navDots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.dataset.section === current) {
        dot.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavDot);

  // Initialize roadmap chart if element exists
  const chartElement = document.getElementById("roadmapChart");
  if (chartElement && typeof Chart !== "undefined") {
    const ctx = chartElement.getContext("2d");

    const roadmapChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "New Features",
            data: [3, 2, 3, 2],
            backgroundColor: ["#2563EB", "#10B981", "#8B5CF6", "#F59E0B"],
            borderColor: ["#2563EB", "#10B981", "#8B5CF6", "#F59E0B"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw} new features`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: "Number of Features",
            },
          },
          x: {
            title: {
              display: true,
              text: "Quarter",
            },
          },
        },
      },
    });
  }



  // Hamburger Menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("nav-active");

      // Change hamburger icon
      const icon = this.querySelector("i");
      if (navLinks.classList.contains("nav-active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close mobile menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll("a");
    navLinksItems.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("nav-active");
        const hamburgerIcon = hamburger.querySelector("i");
        hamburgerIcon.classList.remove("fa-times");
        hamburgerIcon.classList.add("fa-bars");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !hamburger.contains(event.target) &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("nav-active");
        const hamburgerIcon = hamburger.querySelector("i");
        hamburgerIcon.classList.remove("fa-times");
        hamburgerIcon.classList.add("fa-bars");
      }
    });
  }

  // Theme Switcher functionality
  const themeSwitcher = document.querySelector(".theme-switcher");
  const body = document.body;

  if (themeSwitcher) {
    // Function to update icon
    const updateIcon = () => {
      const icon = themeSwitcher.querySelector("i");
      if (body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    };

    // Check saved theme preference on page load
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
    }
    updateIcon(); // Update icon on load

    themeSwitcher.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      // Save preference to localStorage
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      updateIcon(); // Update icon on click
    });
  }

  // Add fade-in animation to elements as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe all feature items, benefit items, etc.
  document
    .querySelectorAll(
      ".feature-item, .benefit-item, .testimonial-card, .pricing-card"
    )
    .forEach((el) => {
      observer.observe(el);
    });
});


const slides = document.querySelectorAll('.demo-slide');
const dots = document.querySelectorAll('.demo-dot');
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dot.classList.add('active');
  });
});
