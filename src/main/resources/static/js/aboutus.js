// JavaScript for sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Get buttons that open the modals
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

// When the user clicks on the hamburger menu, toggle the nav menu
hamburgerMenu.onclick = function () {
    mainNav.classList.toggle('active');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // Close the nav menu if clicked outside
    if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
}
// Check window size and adjust nav accordingly
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
$(document).ready(function () {
    // Initialize AOS
    AOS.init();

    // Smooth scrolling
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Hamburger menu toggle
    $('.hamburger').on('click', function () {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
    });
});


// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, options);

revealElements.forEach(element => {
    observer.observe(element);
});