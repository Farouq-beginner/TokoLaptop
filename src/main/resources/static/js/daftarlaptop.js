// JavaScript for sticky header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 50);
});


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

// Define laptop product data
const laptopProducts = [
    {
        id: 1,
        name: "MacBook Pro M2",
        price: 26999000,
        image: "/images/contoh_laptop1.png",
        isLimited: false
    },
    {
        id: 2,
        name: "ASUS ROG Strix G15",
        price: 17499000,
        image: "/images/laptop2.png",
        isLimited: false
    },
    {
        id: 3,
        name: "Lenovo Legion 5 Pro",
        price: 19999000,
        image: "/images/laptop3.png",
        isLimited: true
    },
    {
        id: 4,
        name: "HP Spectre x360",
        price: 21899000,
        image: "/images/laptop4.png",
        isLimited: false
    },
    {
        id: 5,
        name: "Dell XPS 13 Plus",
        price: 22599000,
        image: "/images/laptop5.png",
        isLimited: false
    },
    {
        id: 6,
        name: "Razer Blade 15",
        price: 24899000,
        image: "/api/placeholder/220/220",
        isLimited: true
    },
    {
        id: 7,
        name: "Acer Predator Helios",
        price: 18299000,
        image: "/api/placeholder/220/220",
        isLimited: false
    },
    {
        id: 8,
        name: "MSI Stealth 15M",
        price: 18999000,
        image: "/api/placeholder/220/220",
        isLimited: false
    },
    {
        id: 9,
        name: "ASUS ZenBook Pro Duo",
        price: 25499000,
        image: "/api/placeholder/220/220",
        isLimited: true
    },
    {
        id: 10,
        name: "Microsoft Surface Laptop",
        price: 17899000,
        image: "/api/placeholder/220/220",
        isLimited: false
    },
    {
        id: 11,
        name: "Alienware m17 R5",
        price: 28999000,
        image: "/api/placeholder/220/220",
        isLimited: true
    },
    {
        id: 12,
        name: "LG Gram 17",
        price: 20499000,
        image: "/api/placeholder/220/220",
        isLimited: false
    }
];

// Function to format price in Indonesian Rupiah
function formatPrice(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to render product cards
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
                ${product.isLimited ? '<div class="hand-icon"><img src="/images/LimitedEdition.png"></div>' : ''}
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

// Function to filter products by search term
function filterProducts(searchTerm, sortOption) {
    let filtered = [...laptopProducts];

    // Apply search filter if there's a search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(term)
        );
    }

    // Apply sorting
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
            // Default sorting (featured) - already in the order we want
            break;
    }

    return filtered;
}

// Initial render of all products
document.addEventListener('DOMContentLoaded', function () {
    // Render all products on page load
    renderProducts(laptopProducts);

    // Add event listeners for search and sort
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');

    function updateProducts() {
        const searchTerm = searchInput.value;
        const sortOption = sortSelect.value;
        const filteredProducts = filterProducts(searchTerm, sortOption);
        renderProducts(filteredProducts);
    }
    searchInput.addEventListener('input', updateProducts);
    sortSelect.addEventListener('change', updateProducts);

    // Add event listener for search icon
    const searchIcon = document.getElementById('search-icon');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    searchIcon.addEventListener('click', function () {
        searchModal.style.display = 'block';
    });
    searchClose.addEventListener('click', function () {
        searchModal.style.display = 'none';
    });
});