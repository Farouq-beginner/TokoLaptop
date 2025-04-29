// Get modal elements
const searchModal = document.getElementById('search-modal');
const loginModal = document.getElementById('login-modal');
const laptopSection = document.getElementById('laptop-section');

// Get buttons that open the modals
const searchIcon = document.getElementById('search-icon');
const profileIcon = document.getElementById('profile-icon');
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');
const laptopLink = document.getElementById('laptop-link');

// Get elements that close the modals
const searchClose = document.getElementById('search-close');
const loginClose = document.getElementById('login-close');

// When the user clicks on the hamburger menu, toggle the nav menu
hamburgerMenu.onclick = function () {
    mainNav.classList.toggle('active')
}

// When the user clicks on the Laptop Link, show the Laptop section
laptopLink.onclick = function(e) {
    e.preventDefault();
    laptopSection.style.display = "block";
    // Hide the nav menu on mobile after clicking
    if (window.innerWidth < 768) {
        mainNav.classList.remove('active');
    }
}

// When the user clicks on the icon, open the modal
searchIcon.onclick = function () {
    searchModal.style.display = "block";
}

profileIcon.onclick = function () {
    loginModal.style.display = "block";
}

// When the user clicks on close button, close the modal
searchClose.onclick = function () {
    searchModal.style.display = "none";
}

loginClose.onclick = function () {
    loginModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == searchModal) {
        searchModal.style.display = "none";
    }
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    // Close the nav menu if clicked outside
    if (!event.target.closet('.nav') && !event.target.closet('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
}

// Close nav menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768 && link.id !== 'laptop-link') {
            mainNav.classList.remove('active');
            // Hide laptop section when clicking on other nav links
            laptopSection.style.display = "none";
        }
    });
});

// Check window size and adjust nav accordingly
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});