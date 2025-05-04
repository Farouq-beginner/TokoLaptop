  
// Get buttons that open the modals
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

// When the user clicks on the hamburger menu, toggle the nav menu
hamburgerMenu.onclick = function() {
    mainNav.classList.toggle('active');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
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

// Initialize the model viewer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
        } else {
            entry.target.classList.remove("visible");
            entry.target.classList.add("hidden");
        }
    });
}, { threshold: 0.3 }); // Elemen terdeteksi saat 30% masuk viewport

document.querySelectorAll(".model-viewer-container").forEach(el => observer.observe(el));