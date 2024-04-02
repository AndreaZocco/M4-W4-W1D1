document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.getElementById('product-form').addEventListener('submit', handleAddProduct);
    document.getElementById('product-edit-form').addEventListener('submit', handleEditProduct);
});

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjA3Zjc4OGViYzE5NzAwMTk4ZWQxMzYiLCJpYXQiOjE3MTE4MjcyNzksImV4cCI6MTcxMzAzNjg3OX0.M9fdiJ-HnAxznIU04GThi2RuXIoMOxSAKQQnouOmwwY";

async function handleAddProduct(e) {
    e.preventDefault();
    const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: document.getElementById('price').value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        alert('Prodotto aggiunto con successo!');
        document.getElementById('product-form').reset();
        fetchProducts();
    } catch (error) {
        console.error('Errore nell\'aggiunta del prodotto:', error);
        alert('Si è verificato un errore durante l\'aggiunta del prodotto.');
    }
}

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": token,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        const products = await response.json();
        const productsList = document.getElementById('products-list');
        productsList.innerHTML = '';
        products.forEach(product => {
            productsList.innerHTML += `
            <div class="product-item mb-3" id="product-${product._id}">
                <h5>${product.name}</h5>
                <p>${product.description}</p>
                <button onclick="showEditForm('${product._id}')" class="btn btn-sm btn-primary">Modifica</button>
                <button onclick="deleteProduct('${product._id}')" class="btn btn-sm btn-danger">Cancella</button>
            </div>`;
        });
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
        alert('Si è verificato un errore durante il recupero dei prodotti.');
    }
}

function showEditForm(productId) {
    fetch(`${apiUrl}${productId}`, {
        headers: {
            "Authorization": token,
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
    })
    .then(product => {
        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-description').value = product.description;
        document.getElementById('edit-brand').value = product.brand;
        document.getElementById('edit-imageUrl').value = product.imageUrl;
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-id').value = product._id;

        document.getElementById('product-edit-form').classList.remove('d-none');
    })
    .catch(error => {
        console.error('Errore nel caricamento del prodotto:', error);
        alert('Si è verificato un errore durante il caricamento dei dettagli del prodotto per la modifica.');
    });
}

async function deleteProduct(productId) {
    if (!confirm('Sei sicuro di voler cancellare questo prodotto?')) {
        return;
    }
    try {
        const response = await fetch(`${apiUrl}${productId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": token,
            },
        });
        if (!response.ok) throw new Error('Errore durante la cancellazione del prodotto.');
        alert('Prodotto cancellato con successo');
        fetchProducts();
    } catch (error) {
        console.error('Errore nella cancellazione del prodotto:', error);
        alert('Si è verificato un errore durante la cancellazione del prodotto.');
    }
}

async function handleEditProduct(e) {
    e.preventDefault();
    const productId = document.getElementById('edit-id').value;
    const updatedProductData = {
        name: document.getElementById('edit-name').value,
        description: document.getElementById('edit-description').value,
        brand: document.getElementById('edit-brand').value,
        imageUrl: document.getElementById('edit-imageUrl').value,
        price: document.getElementById('edit-price').value,
    };

    try {
        const response = await fetch(`${apiUrl}${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token,
            },
            body: JSON.stringify(updatedProductData),
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        alert('Prodotto modificato con successo!');
        document.getElementById('product-edit-form').classList.add('d-none');
        fetchProducts();
    } catch (error) {
        console.error('Errore nella modifica del prodotto:', error);
        alert('Si è verificato un errore durante la modifica del prodotto.');
    }
}
