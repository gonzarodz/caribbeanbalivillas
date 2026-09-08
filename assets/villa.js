/* ============================================
   Caribbean Bali Villas — Villa Detail Pages
   Lightweight, null-safe interactions.
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
    // Navbar solid background on scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    if (navbar) {
        window.addEventListener('scroll', updateNavbar, { passive: true });
        updateNavbar();
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when a link is chosen
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.villa-gallery-grid .gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    let currentIndex = 0;
    let lastFocused = null;

    function showImage(index) {
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Enlarged gallery image';
    }

    if (modal && modalImg && galleryItems.length) {
        galleryItems.forEach(function (item, index) {
            item.addEventListener('click', function () {
                lastFocused = document.activeElement;
                currentIndex = index;
                modal.classList.add('show');
                showImage(index);
                document.body.style.overflow = 'hidden';
                if (closeModal) closeModal.focus();
            });
        });

        function closeModalFn() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            if (lastFocused) lastFocused.focus();
        }

        if (closeModal) closeModal.addEventListener('click', closeModalFn);

        if (prevImage) {
            prevImage.addEventListener('click', function (e) {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        if (nextImage) {
            nextImage.addEventListener('click', function (e) {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }

        // Close when clicking outside the image
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModalFn();
        });

        // Escape / arrow keys
        document.addEventListener('keydown', function (e) {
            if (!modal.classList.contains('show')) return;
            if (e.key === 'Escape') {
                closeModalFn();
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            }
        });
    }

    // Dynamic year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});