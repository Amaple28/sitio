// Mobile navigation toggle
function toggleMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Close mobile nav when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Scroll to Airbnb section function
  function scrollToAirbnb() {
    const airbnbSection = document.getElementById('airbnb');
    if (airbnbSection) {
      airbnbSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Fade-in animation for elements
  function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Highlight current section in navigation
  function highlightNavOnScroll() {
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = '#' + section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    toggleMobileNav();
    
    // Setup scroll animations
    handleScrollAnimations();
    
    // Highlight current section in navigation
    highlightNavOnScroll();
    
    // Smooth scroll for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Load Airbnb widget script if not already loaded
    if (!window.AirbnbAPI) {
      const airbnbScript = document.createElement('script');
      airbnbScript.src = 'https://www.airbnb.com.br/embeddable/airbnb_jssdk';
      airbnbScript.async = true;
      document.body.appendChild(airbnbScript);
    }
    
    // Update mobile menu to include the new "Atrações Próximas" link
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      // Insert before the Contato link which is typically the last one
      const contactLink = mobileNav.querySelector('a[href="#contact"]');
      if (contactLink) {
        mobileNav.insertBefore(attractionsLink, contactLink);
      } else {
        mobileNav.appendChild(attractionsLink);
      }
    }
    
    // Update desktop menu to include the new "Atrações Próximas" link
    const navDesktop = document.querySelector('.nav-desktop');
    if (navDesktop) {
      // Insert before the Reservas link
      const reservasLink = navDesktop.querySelector('a[href="#airbnb"]');
      if (reservasLink) {
        navDesktop.insertBefore(attractionsLink, reservasLink);
      }
    }
  });
  