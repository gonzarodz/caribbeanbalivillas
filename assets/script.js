document.addEventListener('DOMContentLoaded', function() {
    // Video placeholder interaction
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            const notification = document.createElement('div');
            
            notification.className = 'video-notification';
            notification.textContent = 'Video will be available soon';
            notification.style.position = 'absolute';
            notification.style.bottom = '20px';
            notification.style.left = '0';
            notification.style.right = '0';
            notification.style.textAlign = 'center';
            notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
            notification.style.color = 'white';
            notification.style.padding = '10px';
            notification.style.borderRadius = '4px';
            notification.style.margin = '0 auto';
            notification.style.maxWidth = '80%';
            notification.style.animation = 'fadeOut 2s forwards';
            
            // Remove existing notifications
            const existingNotification = this.querySelector('.video-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            this.appendChild(notification);
            
            // Remove notification after animation
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
        
        // Add hover effect styles
        videoPlaceholder.style.cursor = 'pointer';
        videoPlaceholder.style.transition = 'all 0.3s ease';
        
        videoPlaceholder.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        videoPlaceholder.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    }
    
    // Add keyframes for fadeOut animation for video notification
    const style = document.createElement('style');
    style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; }
    }`;
    document.head.appendChild(style);
    
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
    const learnBtn = document.querySelector('.btn');
    
    // Function to check scroll position and show/hide navbar
    function checkScroll() {
        const learnBottom = learnBtn.getBoundingClientRect().bottom;
        
        if (learnBottom <= 90) {
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
