//boleh diedit
// Bisa digunakan untuk efek animasi nanti, atau tracking klik layanan
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    alert('Fitur layanan ini akan segera tersedia.');
  });
});
//terakhir diedit

// JavaScript for sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
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