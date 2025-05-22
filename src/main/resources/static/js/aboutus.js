window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

hamburgerMenu.onclick = function () {
    mainNav.classList.toggle('active');
}

window.onclick = function (event) {
    if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});

$(document).ready(function () {
    AOS.init();

    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    $('.hamburger').on('click', function () {
        $('.nav-links').toggleClass('active');
        $(this).toggleClass('active');
    });
});

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