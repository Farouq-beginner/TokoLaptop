  const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

hamburgerMenu.onclick = function() {
    mainNav.classList.toggle('active');
}
window.onclick = function(event) {
    if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
}
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});

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
}, { threshold: 0.3 });

document.querySelectorAll(".model-viewer-container").forEach(el => observer.observe(el));