// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const nav = document.querySelector('.nav');
                const menuToggle = document.querySelector('.menu-toggle');
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav && nav.classList.contains('active')) {
                        menuToggle.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                    
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Header scroll effect (throttled for mobile main-thread / TBT)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > 50) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
                ticking = false;
            });
        }, { passive: true });
    }
});

// Form validation for consultation booking
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        // Simple validation
        let isValid = true;
        
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        } else {
            clearError('name');
        }
        
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (phone === '') {
            showError('phone', 'Please enter your phone number');
            isValid = false;
        } else {
            clearError('phone');
        }
        
        if (service === '') {
            showError('service', 'Please select a service');
            isValid = false;
        } else {
            clearError('service');
        }
        
        if (date === '') {
            showError('date', 'Please select a date');
            isValid = false;
        } else {
            clearError('date');
        }
        
        if (time === '') {
            showError('time', 'Please select a time');
            isValid = false;
        } else {
            clearError('time');
        }
        
        // If form is valid, submit
        if (isValid) {
            // Replace with actual form submission
            // For demo purposes, just show success message
            showSuccessMessage();
        }
    });
}

// Helper functions for form validation
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    field.classList.add('form-control--error');
    
    if (errorElement) {
        errorElement.innerText = message;
    } else {
        const error = document.createElement('div');
        error.id = `${fieldId}-error`;
        error.className = 'form-error-message';
        error.innerText = message;
        
        field.parentNode.appendChild(error);
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    field.classList.remove('form-control--error');
    
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successMessage = document.createElement('div');
    
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Booking Successful!</h3>
        <p>Thank you for booking a consultation with PeakHealth Pharmacy. We will contact you shortly to confirm your appointment.</p>
        <button id="new-booking" class="btn btn--primary">Book Another Consultation</button>
    `;
    
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
    
    // Add event listener to "Book Another" button
    document.getElementById('new-booking').addEventListener('click', () => {
        window.location.reload();
    });
}

// Pharmacy First Plus availability indicator
document.addEventListener('DOMContentLoaded', () => {
    updatePharmacyFirstPlusAvailability();
});

function updatePharmacyFirstPlusAvailability() {
    const indicator = document.querySelector('.pharmacy-plus-indicator');
    
    if (indicator) {
        // Always show as available
        indicator.classList.add('pharmacy-plus-indicator--available');
        indicator.querySelector('.status-text').innerText = 'Available Now';
    }
}

// Testimonials Slider (simple version without dependencies)
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonials-slider');
    
    if (slider && window.innerWidth > 768) {
        const testimonials = slider.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        
        // Hide all testimonials except the first one if on mobile
        if (testimonials.length > 1) {
            for (let i = 1; i < testimonials.length; i++) {
                testimonials[i].style.display = 'none';
            }
            
            // Add navigation arrows
            const prevButton = document.createElement('button');
            prevButton.className = 'slider-button slider-button--prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'slider-button slider-button--next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            slider.appendChild(prevButton);
            slider.appendChild(nextButton);
            
            // Add event listeners to navigation buttons
            prevButton.addEventListener('click', () => {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
            
            nextButton.addEventListener('click', () => {
                testimonials[currentSlide].style.display = 'none';
                currentSlide = (currentSlide + 1) % testimonials.length;
                testimonials[currentSlide].style.display = 'block';
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Helper function to detect if we're on mobile (works in portrait and landscape)
    function isMobileDevice() {
        // Check if the menu toggle is visible (most reliable - CSS controls this)
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            const computedStyle = window.getComputedStyle(menuToggle);
            if (computedStyle.display !== 'none') {
                return true;
            }
        }
        
        // Fallback: Check screen size and touch capability
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 992;
        
        return hasTouch && isSmallScreen;
    }
    const slides = document.querySelectorAll('.slideshow-slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        function ensureSlideBackground(slide) {
            if (!slide || slide.dataset.bgApplied === '1') return;
            const url = slide.getAttribute('data-bg');
            if (url) {
                slide.style.backgroundImage = 'url("' + encodeURI(url).replace(/"/g, '\\"') + '")';
                slide.dataset.bgApplied = '1';
            }
        }

        function showSlide(index) {
            ensureSlideBackground(slides[index]);
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            const next = (index + 1) % slides.length;
            ensureSlideBackground(slides[next]);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        showSlide(0);

        setInterval(nextSlide, 3000);
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        // Create backdrop overlay
        const backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
        
        function openMenu() {
            menuToggle.classList.add('active');
            nav.classList.add('active');
            backdrop.classList.add('active');
            document.body.classList.add('no-scroll');
        }
        
        function closeMenu() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (nav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Remove backdrop click handlers - backdrop is now invisible and doesn't close menu
        // Menu will only close when clicking hamburger icon or when navigating away
        
        // CRITICAL: Prevent clicks inside nav from closing menu
        nav.addEventListener('click', function(e) {
            // Stop any clicks inside nav from bubbling up
            e.stopPropagation();
            // Let links navigate naturally - don't prevent default
        }, true); // Use capture phase to catch early
        
        // ONLY handle dropdown parent links - regular links navigate naturally without any JS interference
        const dropdownItems = nav.querySelectorAll('.nav__item--dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav__link');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (isMobileDevice()) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation(); // Stop ALL other handlers
                        const dropdown = item.querySelector('.nav__dropdown');
                        if (dropdown) {
                            dropdown.classList.toggle('active');
                        }
                        return false; // Prevent any further processing
                    }
                }, true); // Use capture phase - runs FIRST
            }
        });
        
        // NO handlers on regular nav links - they navigate naturally
        // Only dropdown parents have handlers (handled above)
        
        // Close menu when user navigates away (page unloads)
        window.addEventListener('beforeunload', function() {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when page becomes hidden (user navigated)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && nav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on pagehide (for better browser support)
        window.addEventListener('pagehide', function() {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on window resize if it becomes desktop size
        window.addEventListener('resize', function() {
            if (!isMobileDevice() && nav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Testimonials Slider
    initTestimonialSlider();

    // Static Testimonials for About page
    initStaticTestimonials();

    // FAQ Toggle Functionality
    initFaqToggle();
});

// Testimonial Slider Functionality
function initTestimonialSlider() {
    // Only apply to testimonial sliders (not the grid on the home page)
    const sliders = document.querySelectorAll('.testimonials--about .testimonials-slider, .testimonials-slider--pharmacy');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.testimonial-cards-container');
        // Check if we're dealing with testimonial-card or testimonial elements
        const cards = slider.querySelectorAll('.testimonial-card, .testimonial');
        const dotsContainer = slider.querySelector('.testimonial-dots');
        const prevArrow = slider.querySelector('.testimonial-arrow--prev');
        const nextArrow = slider.querySelector('.testimonial-arrow--next');
        let currentIndex = 0;
        
        // Skip if no cards or container
        if (!container || cards.length === 0) return;
        
        // Clear existing dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            
            // Create new dots
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        // Set initial styles to show one slide at a time
        container.style.width = `${cards.length * 100}%`;
        cards.forEach(card => {
            card.style.width = `${100 / cards.length}%`;
            
            // Ensure text fits within the card
            const content = card.querySelector('.testimonial-card__content, .testimonial__content');
            if (content) {
                content.style.overflow = 'visible';
                content.style.width = '100%';
                
                // Ensure paragraphs wrap properly
                const paragraphs = content.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.whiteSpace = 'normal';
                    p.style.overflowWrap = 'break-word';
                    p.style.wordWrap = 'break-word';
                });
            }
        });
        
        // Navigation
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateSlider();
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        // Update slider position with smooth transition
        function updateSlider() {
            container.style.transform = `translateX(-${currentIndex * (100 / cards.length)}%)`;
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.testimonial-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }
        
        // Optional: Auto-advance
        let interval;
        function startAutoSlide() {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            }, 8000); // Change slide every 8 seconds to give more time to read
        }
        
        function stopAutoSlide() {
            clearInterval(interval);
        }
        
        // Start auto-sliding and pause on hover
        startAutoSlide();
        
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Handle touch events
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide(); // Stop auto-sliding on touch
        }, { passive: true });
        
        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide(); // Restart auto-sliding after touch
        }, { passive: true });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // Swipe left, go to next
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right, go to previous
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateSlider();
            }
        }
    });
}

// Static Testimonials for About page
function initStaticTestimonials() {
    const container = document.querySelector('.testimonial-static');
    if (!container) return;
    
    const testimonials = Array.from(container.querySelectorAll('.testimonial-static__card'));
    const dots = Array.from(container.querySelectorAll('.testimonial-static__dot'));
    const prevBtn = container.querySelector('.testimonial-static__prev');
    const nextBtn = container.querySelector('.testimonial-static__next');
    
    let currentIndex = 0;
    
    // Update active testimonial and dot
    function updateActive(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Show current testimonial
        testimonials[index].style.display = 'block';
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Event listeners for navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateActive(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % testimonials.length;
            updateActive(newIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateActive(index);
        });
    });
    
    // Auto-advance (optional)
    let interval;
    
    function startAutoAdvance() {
        interval = setInterval(() => {
            const newIndex = (currentIndex + 1) % testimonials.length;
            updateActive(newIndex);
        }, 8000);
    }
    
    function stopAutoAdvance() {
        clearInterval(interval);
    }
    
    // Start auto-advance and pause on hover
    startAutoAdvance();
    
    container.addEventListener('mouseenter', stopAutoAdvance);
    container.addEventListener('mouseleave', startAutoAdvance);
    
    // Initialize first testimonial
    updateActive(0);
}

// FAQ Toggle Functionality
function initFaqToggle() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.maxHeight = null;
            });
            
            document.querySelectorAll('.faq-toggle i').forEach(icon => {
                icon.className = 'fas fa-plus';
            });
            
            // Toggle current FAQ
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.querySelector('.faq-toggle i').className = 'fas fa-minus';
            }
        });
    });
}

// Image Lightbox Functionality with Gallery Support
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav--prev');
    const lightboxNext = document.querySelector('.lightbox-nav--next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const newsImages = document.querySelectorAll('.news-img');
    
    // Define galleries - each gallery is an array of image objects
    const galleries = {
        'ps24-gallery': [
            { src: 'images/24 hour collection leaflet.png', alt: '24 Hour Prescription Collection Point' },
            { src: 'images/ps24 image.jpg', alt: 'PS24 Prescription Collection Machine' },
            { src: 'images/ps24 image 2.jpg', alt: 'PS24 Prescription Collection Machine' }
        ]
    };
    
    let currentGallery = null;
    let currentIndex = 0;
    
    if (lightbox && lightboxImage && newsImages.length > 0) {
        // Open lightbox when clicking on news images
        newsImages.forEach(img => {
            img.addEventListener('click', () => {
                const galleryName = img.getAttribute('data-gallery');
                const galleryIndex = parseInt(img.getAttribute('data-gallery-index')) || 0;
                
                if (galleryName && galleries[galleryName]) {
                    // Open as gallery
                    currentGallery = galleries[galleryName];
                    currentIndex = galleryIndex;
                    showGalleryImage();
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    // Open as single image
                    currentGallery = null;
                    lightboxImage.src = img.src;
                    lightboxImage.alt = img.alt;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    if (lightboxCounter) lightboxCounter.style.display = 'none';
                    if (lightboxPrev) lightboxPrev.style.display = 'none';
                    if (lightboxNext) lightboxNext.style.display = 'none';
                }
            });
        });
        
        // Show current gallery image
        function showGalleryImage() {
            if (currentGallery && currentGallery[currentIndex]) {
                lightboxImage.src = currentGallery[currentIndex].src;
                lightboxImage.alt = currentGallery[currentIndex].alt;
                
                // Update counter
                if (lightboxCounter) {
                    lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
                    lightboxCounter.style.display = 'block';
                }
                
                // Show navigation arrows
                if (lightboxPrev) lightboxPrev.style.display = 'flex';
                if (lightboxNext) lightboxNext.style.display = 'flex';
            }
        }
        
        // Navigate to previous image
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentGallery) {
                    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                    showGalleryImage();
                }
            });
        }
        
        // Navigate to next image
        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentGallery) {
                    currentIndex = (currentIndex + 1) % currentGallery.length;
                    showGalleryImage();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active') && currentGallery) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                    showGalleryImage();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % currentGallery.length;
                    showGalleryImage();
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            } else if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
        
        // Close lightbox function
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            currentGallery = null;
            currentIndex = 0;
        }
        
        // Close lightbox when clicking close button
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});