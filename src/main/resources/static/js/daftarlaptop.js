
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


window.onclick = function (event) {
    if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
};


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mainNav.classList.remove('active');
    }
});


function formatPrice(price) {
    return "Rp. " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
            <div class="button-group">
                <button class="add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="buy-now-btn">
                    <span>Buy Now</span>
                </button>
                
            </div>
        `;

        const addToCartButton = productCard.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', () => {
            const productId = addToCartButton.dataset.id;
            addToCart(productId);
        });

        productsGrid.appendChild(productCard);
    });
}


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
                return a.limited === b.limited ? 0 : a.limited ? -1 : 1;
            });
            break;
        default:
            
            break;
    }

    return filtered;
}


async function fetchAndRenderLaptops() {
    try {
        const response = await fetch('/api/laptops');
        const laptops = await response.json();

        renderProducts(laptops);

   
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

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderLaptops();
    fetchCartCount();
});




async function addToCart(productId) {
    try {
        const response = await fetch('/cart/add/' + productId, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }

        const result = await response.json();

        if (result.success) {
            updateCartCount(result.totalItems);
            alert("Laptop added to cart successfully!");
        } else {
            alert("LOGIN DULU KINGG.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Sepertinya ada kesalahan saat menambahkan ke keranjang. kingg");
    }
}


function updateCartCount(count) {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

async function fetchCartCount() {
    try {
        const response = await fetch('/cart/total-items');
        if (response.ok) {
            const totalItems = await response.json();
            updateCartCount(totalItems);
        }
    } catch (error) {
        console.error('Failed to fetch cart count:', error);
    }
}
