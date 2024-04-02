document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        fetchProductDetails(productId);
    } else {
        document.getElementById('product-details').innerHTML = '<p>Prodotto non trovato.</p>';
    }
});

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA3Zjc4OGViYzE5NzAwMTk4ZWQxMzYiLCJpYXQiOjE3MTE4MjcyNzksImV4cCI6MTcxMzAzNjg3OX0.M9fdiJ-HnAxznIU04GThi2RuXIoMOxSAKQQnouOmwwY";

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${apiUrl}${productId}`, {
            headers: {
                "Authorization": token
            }
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error("Errore nel recupero dei dettagli del prodotto:", error);
        alert('Si è verificato un errore durante il recupero dei dettagli del prodotto.');
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.imageUrl}" alt="${product.name}" class="img-fluid">
        <p>${product.description}</p>
        <p><strong>Marca:</strong> ${product.brand}</p>
        <p><strong>Prezzo:</strong> €${product.price}</p>
    `;
}
