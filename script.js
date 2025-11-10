// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU FUNCTIONALITY ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ========== PARALLAX BACKGROUND SLIDER ==========
    const slides = document.querySelectorAll('.parallax-slide');
    let currentSlide = 0;
    
    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 7 seconds
    setInterval(changeSlide, 7000);
    
    // ========== TYPEWRITER EFFECT ==========
    const typewriterText = document.querySelector('.typewriter-text');
    const texts = [
        'සංවේදනයෙන් සුළගේ පාවී යන සුසුමන් හිත් තුල හඬනගනවා',
        'ජීවත් වන කලාව තුල පුද්ගලයින්ගේ හදවත් තුල ගැබ්ව ඇති වේදනාව සුසුමකින් පා කර හරිමුද?',
        'විටෙක කවියක ඔබේ කතාවද කිමිද ඇති බව නිසැකයි',
        
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 50;
                setTimeout(typeWriter, 2000); // Pause at end
                return;
            }
        } else {
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 100;
                setTimeout(typeWriter, 500); // Pause before next text
                return;
            }
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect
    if (typewriterText) {
        setTimeout(typeWriter, 1000);
    }
    
    // ========== ANIMATED COUNTER FOR STATS ==========
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Intersection Observer for Stats Counter
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        statsObserver.observe(statsRow);
    }
    
    // ========== OPTIMIZED PARALLAX EFFECT FOR MOBILE ==========
    function setupParallax() {
        if (window.innerWidth > 768) {
            // Desktop parallax
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSlides = document.querySelectorAll('.parallax-slide');
                const heroContent = document.querySelector('.hero-content-wrapper');
                
                parallaxSlides.forEach(slide => {
                    slide.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
                });
                
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / 800);
                }
            });
        } else {
            // Mobile - reduced parallax or none
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content-wrapper');
                
                if (heroContent) {
                    // Much less opacity change on mobile
                    heroContent.style.opacity = 1 - (scrolled / 1200);
                }
            });
        }
    }
    
    setupParallax();
    window.addEventListener('resize', setupParallax);
    
    // ========== HEADER BACKGROUND CHANGE ON SCROLL ==========
    const header = document.querySelector('.modern-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 83, 78, 1)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(0, 83, 78, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.modern-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== FLOATING BOOK ANIMATION ON MOUSE MOVE (DESKTOP ONLY) ==========
    const bookPreview = document.querySelector('.book-3d');
    if (bookPreview && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            bookPreview.style.transform = `
                translateY(${y * -20}px) 
                translateX(${x * -20}px) 
                rotateY(${x * -10}deg)
            `;
        });
    }
    
    // Reset book position on window resize
    window.addEventListener('resize', function() {
        const bookPreview = document.querySelector('.book-3d');
        if (bookPreview && window.innerWidth <= 768) {
            bookPreview.style.transform = '';
        }
    });
    
    // ========== PARTICLE INTERACTIONS ON MOUSE MOVE (DESKTOP ONLY) ==========
    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const particles = particlesContainer.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const rect = particle.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(x - particleX, 2) + Math.pow(y - particleY, 2)
                );
                
                if (distance < 100) {
                    const angle = Math.atan2(y - particleY, x - particleX);
                    const force = (100 - distance) / 100;
                    const moveX = Math.cos(angle) * force * -50;
                    const moveY = Math.sin(angle) * force * -50;
                    
                    particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force})`;
                } else {
                    particle.style.transform = 'translate(0, 0) scale(1)';
                }
            });
        });
    }
    
    // ========== BUTTON HOVER EFFECTS WITH RIPPLE ==========
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only show ripple effect on desktop or if not on touch device
            if (window.innerWidth > 768 || !('ontouchstart' in window)) {
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.left = e.offsetX - 50 + 'px';
                ripple.style.top = e.offsetY - 50 + 'px';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'ripple 0.6s ease-out';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
    
    // Add CSS for ripple animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px' // Smaller margin for mobile
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply observer to animated elements
    document.querySelectorAll('.feature-tags, .hero-description, .hero-cta-group, .stats-row').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========== SOCIAL BUBBLES FUNCTIONALITY ==========
    const whatsappBubble = document.getElementById('whatsapp-bubble');
    const telegramBubble = document.getElementById('telegram-bubble');
    const instagramBubble = document.getElementById('instagram-bubble');
    
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const telegramPopup = document.getElementById('telegram-popup');
    const instagramPopup = document.getElementById('instagram-popup');
    
    let activePopup = null;
    
    function closeAllPopups() {
        if (whatsappPopup) whatsappPopup.classList.remove('active');
        if (telegramPopup) telegramPopup.classList.remove('active');
        if (instagramPopup) instagramPopup.classList.remove('active');
        activePopup = null;
    }
    
    if (whatsappBubble) {
        whatsappBubble.addEventListener('click', function(e) {
            e.stopPropagation();
            if (activePopup === whatsappPopup) {
                closeAllPopups();
            } else {
                closeAllPopups();
                whatsappPopup.classList.add('active');
                activePopup = whatsappPopup;
            }
        });
    }
    
    if (telegramBubble) {
        telegramBubble.addEventListener('click', function(e) {
            e.stopPropagation();
            if (activePopup === telegramPopup) {
                closeAllPopups();
            } else {
                closeAllPopups();
                telegramPopup.classList.add('active');
                activePopup = telegramPopup;
            }
        });
    }
    
    if (instagramBubble) {
        instagramBubble.addEventListener('click', function(e) {
            e.stopPropagation();
            if (activePopup === instagramPopup) {
                closeAllPopups();
            } else {
                closeAllPopups();
                instagramPopup.classList.add('active');
                activePopup = instagramPopup;
            }
        });
    }
    
    // Close popups when clicking outside
    document.addEventListener('click', function() {
        closeAllPopups();
    });
    
    // Prevent popup close when clicking inside the popup
    const popups = document.querySelectorAll('.social-popup');
    popups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // ========== PURCHASE FORM MODAL FUNCTIONALITY ==========
    const purchaseModal = document.getElementById('purchase-modal');
    const openPurchaseFormBtn = document.getElementById('open-purchase-form');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Function to close purchase modal
    function closePurchaseModal() {
        if (purchaseModal) {
            purchaseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Open modal when clicking the purchase button
    if (openPurchaseFormBtn) {
        openPurchaseFormBtn.addEventListener('click', function() {
            if (purchaseModal) {
                purchaseModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    }
    
    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closePurchaseModal);
    }
    
    // Close modal when clicking outside the modal content
    if (purchaseModal) {
        purchaseModal.addEventListener('click', function(e) {
            if (e.target === purchaseModal) {
                closePurchaseModal();
            }
        });
    }
    
    // ========== FORM SUBMISSION FUNCTIONALITY ==========
    const scriptURL = "https://script.google.com/macros/s/AKfycbz0zAuwWHj6RWchOcIPtnkKvACHc3Q1dVxOBTM7-AzJNfl6cq5EGDu4TlTyB1Y3YlC58g/exec";
    const form = document.forms["submit-to-google-sheet"];
    
    if (form) {
        // Add animation to form elements
        const formControls = document.querySelectorAll('.form-control, .btn-submit');
        formControls.forEach((control, index) => {
            control.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Add button animation
            const submitBtn = document.querySelector('.btn-submit');
            submitBtn.classList.add('success-animation');
            setTimeout(() => submitBtn.classList.remove('success-animation'), 600);
            
            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Show beautiful loading popup
            Swal.fire({
                title: 'Submitting...',
                html: '<div class="pulse-text">Please wait while we process your form</div>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showConfirmButton: false,
                customClass: {
                    popup: 'loading-popup',
                    title: 'swal2-title-black'
                },
                didOpen: () => {
                    Swal.showLoading();
                },
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                backdrop: 'rgba(0,0,0,0.4)'
            });
            
            var formData = new FormData(form);
            
            console.log("Form Data being sent:");
            for (let [key, value] of formData.entries()) {
                console.log(key + ": " + value);
            }

            // Add timeout for the fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

            fetch(scriptURL, { 
                method: "POST", 
                body: formData,
                signal: controller.signal
            })
            .then((response) => {
                clearTimeout(timeoutId);
                console.log('Response received:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data:', data);
                Swal.close();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Form';
                
                if (data.result === 'success') {
                    // Close the modal first
                    closePurchaseModal();
                    
                    // Then show success message after a short delay to ensure modal is closed
                    setTimeout(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Submitted Successfully. Thanks for your Submission You will receive a Whatsapp message from the Publications soon...',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            allowOutsideClick: true,
                            allowEscapeKey: true,
                            allowEnterKey: true,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            customClass: {
                                confirmButton: 'swal2-confirm',
                                title: 'swal2-title-black'
                            }
                        });
                    }, 300);
                    
                    // Reset the form
                    form.reset();
                    
                } else {
                    throw new Error('Server returned error');
                }
            })
            .catch((error) => {
                clearTimeout(timeoutId);
                console.error('Error:', error);
                Swal.close();
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Form';
                
                let errorMessage = 'Something went wrong. Please try again!';
                
                if (error.name === 'AbortError') {
                    errorMessage = 'Request timed out. Please check your internet connection and try again.';
                } else if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Network error. Please check your internet connection and try again.';
                }
                
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    allowOutsideClick: true,
                    allowEscapeKey: true,
                    allowEnterKey: true,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    customClass: {
                        confirmButton: 'swal2-confirm',
                        title: 'swal2-title-black'
                    }
                });
            });
        });
        
        // Add focus effects to form controls
        const formControls2 = document.querySelectorAll('.form-control');
        formControls2.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // ========== MOBILE-SPECIFIC OPTIMIZATIONS ==========
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // Ensure hero content is always visible on mobile
        if (isMobile) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'none';
            }
        }
        
        // Adjust book size for different mobile screens
        const bookImage = document.querySelector('.book-3d img');
        if (bookImage && isMobile) {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 480) {
                bookImage.style.maxWidth = '260px';
            } else if (screenWidth <= 768) {
                bookImage.style.maxWidth = '300px';
            }
        }
    }
    
    // Run optimizations on load and resize
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);
    
    // Force visible content on mobile after a short delay
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }, 1000);
    
    // ========== AUTHOR IMAGE SLIDER ==========
    const authorSlides = document.querySelectorAll('.author-slide');
    const authorDots = document.querySelectorAll('.author-slider-dots .dot');
    let currentAuthorSlide = 0;
    
    function changeAuthorSlide(slideIndex) {
        // Remove active class from all slides and dots
        authorSlides.forEach(slide => slide.classList.remove('active'));
        authorDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (authorSlides[slideIndex]) {
            authorSlides[slideIndex].classList.add('active');
        }
        if (authorDots[slideIndex]) {
            authorDots[slideIndex].classList.add('active');
        }
    }
    
    function nextAuthorSlide() {
        currentAuthorSlide = (currentAuthorSlide + 1) % authorSlides.length;
        changeAuthorSlide(currentAuthorSlide);
    }
    
    // Auto slide every 4 seconds
    if (authorSlides.length > 0) {
        let authorSliderInterval = setInterval(nextAuthorSlide, 4000);
        
        // Manual slide control with dots
        authorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentAuthorSlide = index;
                changeAuthorSlide(currentAuthorSlide);
                
                // Reset interval when manually changing slides
                clearInterval(authorSliderInterval);
                authorSliderInterval = setInterval(nextAuthorSlide, 4000);
            });
        });
    }
    
    console.log('Website Initialized Successfully! 🎉');
});