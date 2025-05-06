window.onload = function () {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('product-list');
      data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        const imageSrc = product.image || 'https://via.placeholder.com/300x200?text=No+Image';
        div.innerHTML = `
          <img src="${imageSrc}" alt="${product.name}" />
          <div class="product-content">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
          </div>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
};
