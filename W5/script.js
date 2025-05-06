// Products data as JSON
const products = [
    {
        id: 1,
        name: "Ceramic Mug 11oz",
        brand: "Generic brand",
        price: 4.40,
        premiumPrice: 3.39,
        image: "images/ceramic-mug-white.jpg",
        badge: "bestseller",
        details: "1 size · District Photo"
    },
    {
        id: 2,
        name: "Accent Coffee Mug, 11oz",
        brand: "Generic brand",
        price: 5.52,
        premiumPrice: 4.25,
        image: "images/accent-mug.jpg",
        badge: "bestseller",
        details: "1 size · 5 colors · District Photo"
    },
    {
        id: 3,
        name: "Ceramic Mug 15oz",
        brand: "Generic brand",
        price: 5.66,
        premiumPrice: 4.36,
        image: "images/ceramic-mug-15oz.jpg",
        badge: "",
        details: "1 size · District Photo"
    },
    {
        id: 4,
        name: "White Ceramic Mug",
        brand: "ORCA Coatings",
        price: 6.88,
        premiumPrice: 5.30,
        image: "images/white-ceramic-mug.jpg",
        badge: "",
        details: "2 sizes · MyLocker"
    },
    {
        id: 5,
        name: "Mug 11oz",
        brand: "Generic brand",
        price: 5.84,
        premiumPrice: 4.49,
        image: "images/mug-11oz.jpg",
        badge: "",
        details: "1 size · 2 print positions"
    },
    {
        id: 6,
        name: "Black Ceramic Mug 11oz",
        brand: "Generic brand",
        price: 5.99,
        premiumPrice: 4.60,
        image: "images/black-mug.jpg",
        badge: "new",
        details: "1 size · District Photo"
    }
];

// Function to create product cards and add them to the DOM
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    
    products.forEach(product => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.className = 'col';
        
        // Set badge HTML if product has a badge
        let badgeHTML = '';
        if (product.badge === 'bestseller') {
            badgeHTML = '<span class="bestseller-badge">Bestseller</span>';
        } else if (product.badge === 'new') {
            badgeHTML = '<span class="new-badge">New</span>';
        }
        
        // Construct the card HTML
        productCard.innerHTML = `
            <div class="card h-100">
                <div class="position-relative">
                    ${badgeHTML}
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted small">By ${product.brand}</p>
                    <div class="pricing">
                        <p class="mb-0">From USD ${product.price.toFixed(2)}</p>
                        <p class="text-success small mb-0">From USD ${product.premiumPrice.toFixed(2)} with Printify Premium</p>
                    </div>
                    <p class="small text-muted mt-2">${product.details}</p>
                </div>
            </div>
        `;
        
        // Add the card to the container
        productsContainer.appendChild(productCard);
    });
}

// Basic JS functionality for collapsing filter sections on mobile
document.addEventListener('DOMContentLoaded', function() {
    // Render products when the page loads
    renderProducts();
    
    // This is a minimal script that just ensures the dropdowns work
    // No additional filter functionality is implemented as per requirements
});