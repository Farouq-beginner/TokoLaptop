// JavaScript for sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Get hamburger menu
const hamburgerMenu = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

// Toggle nav menu
hamburgerMenu.onclick = function () {
    mainNav.classList.toggle('active');
};

// Close nav menu if clicked outside
window.onclick = function (event) {
    if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
};

// Adjust nav on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});

// Format price to Rupiah
function formatPrice(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Render product cards
function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No laptops found. Try a different search term.';
        productsGrid.appendChild(noResults);
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.limited == true || product.isLimited === "true" ? '<div class="hand-icon"><img src="/images/LimitedEdition.png"></div>' : ''}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <button class="buy-now-btn">
                <span>Buy Now</span>
            </button>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Filter and sort products
function filterProducts(products, searchTerm, sortOption) {
    let filtered = [...products];

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(term)
        );
    }

    switch (sortOption) {
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'limited':
            filtered.sort((a, b) => {
                if (a.isLimited === b.isLimited) return 0;
                return a.isLimited ? -1 : 1;
            });
            break;
        default:
            // Do nothing
            break;
    }

    return filtered;
}

// Fetch data from API and render
async function fetchAndRenderLaptops() {
    try {
        const response = await fetch('/api/laptops');
        const laptops = await response.json();

        renderProducts(laptops);

        // Handle search and sort
        const searchInput = document.getElementById('search-input');
        const sortSelect = document.getElementById('sort-select');

        function updateFilteredProducts() {
            const searchTerm = searchInput.value;
            const sortOption = sortSelect.value;
            const filtered = filterProducts(laptops, searchTerm, sortOption);
            renderProducts(filtered);
        }

        searchInput.addEventListener('input', updateFilteredProducts);
        sortSelect.addEventListener('change', updateFilteredProducts);

    } catch (error) {
        console.error("Failed to fetch laptops:", error);
        const productsGrid = document.getElementById('products-grid');
        productsGrid.innerHTML = '<p class="error">Failed to load laptops. Please try again later.</p>';
    }
}

// Init on page load
document.addEventListener('DOMContentLoaded', fetchAndRenderLaptops);
