// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('show');
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Exit intent popup
    let hasShownPopup = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !hasShownPopup) {
            showExitPopup();
            hasShownPopup = true;
        }
    });

    function showExitPopup() {
        const popup = document.createElement('div');
        popup.className = 'exit-popup';
        popup.innerHTML = `
            <h3 class="text-xl font-poppins font-semibold mb-2">Jangan Lewatkan Koleksi Eksklusif Kami!</h3>
            <p class="mb-4 font-poppins">Hubungi kami sekarang untuk mendapatkan penawaran spesial.</p>
            <a href="https://wa.me/+628123456789" 
               class="block text-center bg-red-700 text-white py-2 rounded hover:bg-red-800 transition font-poppins">
                Hubungi via WhatsApp
            </a>
        `;
        document.body.appendChild(popup);
        
        // Show popup with animation
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);

        // Remove popup after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 300);
        }, 5000);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('#beranda');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fadeInUp');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Product image lazy loading
    const productImages = document.querySelectorAll('.product-card img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            });
        });

        productImages.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    }

    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelector('.hero-slider .slides');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.hero-slider .slide').length;

    function updateSlider() {
        const slideWidth = 100 / totalSlides;
        slides.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners for slider buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        nextButton.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto slide on hover
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Initialize slider
    updateSlider();
});

// Splash screen
window.addEventListener('load', function() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Tampilkan splash screen selama 2.5 detik
    setTimeout(function() {
        splashScreen.classList.add('fade-out');
        
        // Hapus splash screen setelah animasi selesai
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2500);
}); 
