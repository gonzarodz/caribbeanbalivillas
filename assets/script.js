document.addEventListener('DOMContentLoaded', function() {
    // Video section enhancements
    const videoPlayer = document.querySelector('.video-player video');
    if (videoPlayer) {
        videoPlayer.addEventListener('loadedmetadata', function() {
            // Video metadata loaded
        });
    }
    
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const slideContent = document.querySelector('.slide-content');
    
    // Wait 2 seconds then fade out the loading screen
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Fade i6n slide content as loading screen fades out
        setTimeout(() => {
            slideContent.classList.add('fade-in');
        }, 300);
        
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
    const learnBtn = document.querySelector('.btn');
    
    // Function to check scroll position and show/hide navbar
    function checkScroll() {
        const learnBottom = learnBtn.getBoundingClientRect().bottom;
        
        if (learnBottom <= 90) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
    
    // Check scroll position on scroll and page load
    window.addEventListener('scroll', checkScroll);
    checkScroll();
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close mobile menu when a nav link is clicked
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
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
    let lastFocusedElement = null;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lastFocusedElement = document.activeElement;
            modal.classList.add('show');
            modalImg.src = img.src;
            modalImg.alt = img.alt || 'Enlarged gallery image';
            document.body.style.overflow = 'hidden';
            closeModal.focus();
        });
    });
    
    function closeModalFn() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }
    
    closeModal.addEventListener('click', closeModalFn);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFn();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFn();
        }
    });
    
    // Focus trap for modal
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && modal.classList.contains('show')) {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate check-in is before check-out
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            
            if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Hide form and show success message
            bookingForm.style.display = 'none';
            formSuccess.hidden = false;
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Waitlist form submission
    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistSuccess = document.getElementById('waitlistSuccess');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            waitlistSuccess.hidden = false;
            waitlistForm.querySelector('input').value = '';
            waitlistSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;
    let testimonialTimer;
    
    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonialFn() {
        showTestimonial(currentTestimonial + 1);
        resetTestimonialTimer();
    }
    
    function prevTestimonialFn() {
        showTestimonial(currentTestimonial - 1);
        resetTestimonialTimer();
    }
    
    function resetTestimonialTimer() {
        clearInterval(testimonialTimer);
        testimonialTimer = setInterval(nextTestimonialFn, 6000);
    }
    
    if (testimonialSlides.length > 0) {
        prevTestimonial.addEventListener('click', prevTestimonialFn);
        nextTestimonial.addEventListener('click', nextTestimonialFn);
        
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                showTestimonial(parseInt(this.dataset.index));
                resetTestimonialTimer();
            });
        });
        
        // Auto-rotate testimonials every 6 seconds
        testimonialTimer = setInterval(nextTestimonialFn, 6000);
    }
    
    // Dynamic year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
