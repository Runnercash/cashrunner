document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    
    if (track && slides.length && nextButton && prevButton) {
        let currentIndex = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
        const slideDistance = slideWidth + (slideMargin * 2);
        
        track.style.width = `${slideDistance * slides.length}px`;
        
        arrangeSlides();
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        });
        
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(currentIndex);
        });
        
        function moveToSlide(index) {
            track.style.transform = `translateX(-${slideDistance * index}px)`;
        }
        
        function arrangeSlides() {
            slides.forEach((slide, index) => {
                slide.style.left = `${slideDistance * index}px`;
            });
        }
        
        let autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveToSlide(currentIndex);
        }, 5000);
        
        const carousel = document.querySelector('.screenshot-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    moveToSlide(currentIndex);
                }, 5000);
            });
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const revealElements = document.querySelectorAll('.feature-card, .support-card');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            } else {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
            }
        });
    };
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    const counterElement = document.querySelector('.counter');
    if (counterElement) {
        const targetCount = parseInt(counterElement.textContent);
        let count = 0;
        const duration = 2000;
        const interval = 50;
        const increment = targetCount / (duration / interval);
        
        counterElement.textContent = '0+';
        
        const timer = setInterval(() => {
            count += increment;
            
            if (count >= targetCount) {
                counterElement.textContent = targetCount + '+';
                clearInterval(timer);
            } else {
                counterElement.textContent = Math.floor(count) + '+';
            }
        }, interval);
    }
});