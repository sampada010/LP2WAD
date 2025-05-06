
// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 7999,
        description: "Noise-cancelling over-ear headphones with premium sound quality and 30-hour battery life.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 2,
        name: "Smartwatch",
        price: 12999,
        description: "Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 2499,
        description: "Ergonomic gaming mouse with RGB lighting and programmable buttons.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 4,
        name: "Laptop Stand",
        price: 1999,
        description: "Adjustable aluminum laptop stand for better ergonomics and cooling.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        price: 3499,
        description: "Portable waterproof Bluetooth speaker with 360° sound.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 4999,
        description: "RGB mechanical keyboard with blue switches for tactile feedback.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 7,
        name: "External SSD",
        price: 6499,
        description: "500GB external SSD with USB-C connectivity and fast transfer speeds.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 8,
        name: "Wireless Charger",
        price: 1499,
        description: "10W fast wireless charging pad compatible with all Qi-enabled devices.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 9,
        name: "Gaming Headset",
        price: 5999,
        description: "Surround sound gaming headset with noise-cancelling microphone.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 10,
        name: "USB-C Hub",
        price: 2999,
        description: "7-in-1 USB-C hub with HDMI, USB-A, and SD card reader ports.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 11,
        name: "Webcam",
        price: 3999,
        description: "1080p HD webcam with built-in microphone and auto light correction.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 12,
        name: "Graphics Tablet",
        price: 8999,
        description: "Drawing tablet with 8192 pressure levels and customizable shortcut keys.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 13,
        name: "Monitor Stand",
        price: 2499,
        description: "Dual monitor stand with height adjustment and cable management.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 14,
        name: "Power Bank",
        price: 1799,
        description: "20000mAh power bank with fast charging support for multiple devices.",
        image: "/api/placeholder/200/200"
    },
    {
        id: 15,
        name: "WiFi Router",
        price: 4499,
        description: "Dual-band WiFi 6 router with parental controls and wide coverage.",
        image: "/api/placeholder/200/200"
    }
];

// Pagination variables
let currentPage = 1;
const productsPerPage = 5;
let filteredProducts = [...products];

// DOM elements
const productTableBody = document.getElementById('productTableBody');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Function to format price with thousand separator
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to display products for current page
function displayProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Clear table
    productTableBody.innerHTML = '';
    
    // Add products to table
    currentProducts.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td data-label="Product Image"><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td data-label="Product Name" class="product-name">${product.name}</td>
            <td data-label="Price" class="product-price">₹${formatPrice(product.price)}</td>
            <td data-label="Description" class="product-desc">${product.description}</td>
        `;
        
        productTableBody.appendChild(row);
    });
    
    updatePagination();
}

// Function to update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Event listeners for pagination
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Event listener for search
searchBtn.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    currentPage = 1;
    displayProducts();
}

// Initialize the page
displayProducts();
