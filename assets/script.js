document.addEventListener('DOMContentLoaded', function() {
    // Video section enhancements
    const videoPlayer = document.querySelector('.video-player video');
    if (videoPlayer) {
        videoPlayer.addEventListener('loadedmetadata', function() {
            // Video metadata loaded
        });
    }
    
    // ============================================
    // Waitlist Popup Modal
    // ============================================
    const popup = document.getElementById('waitlistPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const popupForm = document.getElementById('popupWaitlistForm');
    const popupSuccess = document.getElementById('popupSuccess');
    const popupError = document.getElementById('popupError');
    const amenitiesSection = document.getElementById('amenities');
    
    // Check if popup was already shown/closed in this session
    const popupClosed = sessionStorage.getItem('waitlistPopupClosed');
    let popupShown = false;
    
    // Show popup when user scrolls to amenities section
    function checkScrollForPopup() {
        if (popupClosed || popupShown) return;
        
        const amenitiesPosition = amenitiesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show popup when amenities section is about 30% visible in viewport
        if (amenitiesPosition.top < windowHeight * 0.7 && amenitiesPosition.bottom > 0) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
            popupShown = true;
            // Remove scroll listener after showing popup
            window.removeEventListener('scroll', checkScrollForPopup);
        }
    }
    
    // Add scroll listener if popup hasn't been closed
    if (!popupClosed) {
        window.addEventListener('scroll', checkScrollForPopup);
        // Also check on page load in case user is already at that position
        checkScrollForPopup();
    }
    
    // Close popup function
    function closePopup() {
        popup.classList.remove('show');
        document.body.style.overflow = '';
        sessionStorage.setItem('waitlistPopupClosed', 'true');
    }
    
    // Close popup when clicking X button
    closePopupBtn.addEventListener('click', closePopup);
    
    // Close popup when clicking outside the content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            closePopup();
        }
    });
    
    // Handle popup form submission
    if (popupForm) {
        popupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = popupForm.querySelector('.btn-popup');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Hide any previous messages
            popupSuccess.hidden = true;
            popupError.hidden = true;
            
            const formData = new FormData(popupForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    popupSuccess.hidden = false;
                    popupForm.querySelector('input[type="email"]').value = '';
                    
                    // Close popup after 5 seconds on success
                    setTimeout(() => {
                        closePopup();
                    }, 5000);
                } else {
                    popupError.hidden = false;
                }
            } catch (error) {
                popupError.hidden = false;
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const slideContent = document.querySelector('.slide-content');
    
    // Wait 2 seconds then fade out the loading screen
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Fade in slide content as loading screen fades out
        setTimeout(() => {
            slideContent.classList.add('fade-in');
        }, 300);
        
        // Remove loading screen from DOM after fade animation completes
        setTimeout(() => {
            loadingScreen.remove();
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
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        // Show navbar after scrolling down 100px
        if (scrollPosition > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }
    
    // Check scroll position on scroll and page load
    window.addEventListener('scroll', checkScroll);
    // Wait a bit before checking on load to ensure content is rendered
    setTimeout(checkScroll, 100);
    
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
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    let currentImageIndex = 0;
    let lastFocusedElement = null;
    
    function showImage(index) {
        currentImageIndex = (index + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentImageIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Enlarged gallery image';
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lastFocusedElement = document.activeElement;
            currentImageIndex = index;
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
    
    // Previous/Next image navigation
    if (prevImage) {
        prevImage.addEventListener('click', function(e) {
            e.stopPropagation();
            showImage(currentImageIndex - 1);
        });
    }
    
    if (nextImage) {
        nextImage.addEventListener('click', function(e) {
            e.stopPropagation();
            showImage(currentImageIndex + 1);
        });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFn();
        }
    });
    
    // Close modal with escape key, navigate with arrow keys
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            closeModalFn();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
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
    
    // Waitlist form submission via Web3Forms
    const waitlistForm = document.getElementById('waitlistForm');
    const waitlistSuccess = document.getElementById('waitlistSuccess');
    const waitlistError = document.getElementById('waitlistError');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = waitlistForm.querySelector('.btn-waitlist');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Hide any previous messages
            waitlistSuccess.hidden = true;
            waitlistError.hidden = true;
            
            const formData = new FormData(waitlistForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    waitlistSuccess.hidden = false;
                    waitlistForm.querySelector('input[type="email"]').value = '';
                    waitlistSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    waitlistError.hidden = false;
                    waitlistError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } catch (error) {
                waitlistError.hidden = false;
                waitlistError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
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
