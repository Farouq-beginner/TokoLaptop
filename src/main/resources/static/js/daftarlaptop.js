 // JavaScript for sticky header
 window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger-menu');
const nav = document.getElementById('main-nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
});

// Search modal
const searchIcon = document.getElementById('search-icon');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');

searchIcon.addEventListener('click', function() {
    searchModal.style.display = 'block';
    document.querySelector('.search-bar input').focus();
});

searchClose.addEventListener('click', function() {
    searchModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === searchModal) {
        searchModal.style.display = 'none';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});