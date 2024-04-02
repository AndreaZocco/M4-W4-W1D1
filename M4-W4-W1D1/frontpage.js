document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA3Zjc4OGViYzE5NzAwMTk4ZWQxMzYiLCJpYXQiOjE3MTE4MjcyNzksImV4cCI6MTcxMzAzNjg3OX0.M9fdiJ-HnAxznIU04GThi2RuXIoMOxSAKQQnouOmwwY";

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": token
            }
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        const products = await response.json();
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            productsContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <a href="product.html?id=${product._id}" class="btn btn-primary">Vedi Dettagli</a>
                    </div>
                </div>
            </div>`;
        });
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        alert('Si è verificato un errore durante il recupero dei prodotti.');
    }
}
