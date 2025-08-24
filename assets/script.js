document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const slideContent = document.querySelector('.slide-content');
    
    // Wait 2 seconds then fade out the loading screen
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Fade in slide content as loading screen fades out
        setTimeout(() => {
            slideContent.classList.add('fade-in');
        }, 300); // Small delay after loading screen starts to fade
        
        // Remove loading screen from DOM after fade animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1500);
    }, 2000);
    
    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');
    const hero = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    
    // Function to check scroll position and show/hide navbar
    function checkScroll() {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const aboutTop = aboutSection.getBoundingClientRect().top;
        
        if (aboutTop <= 90) {
            // When about section is visible, show navbar
            navbar.classList.add('visible');
        } else {
            // When in hero section, hide navbar
            navbar.classList.remove('visible');
        }
    }
    
    // Check scroll position on scroll and page load
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Logo click to go to top
    document.querySelector('.logo-container').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gallery image modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            modal.classList.add('show');
            modalImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});