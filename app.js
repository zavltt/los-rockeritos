// Estado de la aplicación
let currentUser = null;
let cart = [];
let productsData = [...products]; // Copia de los productos para poder modificarlos

// Elementos del DOM
const loginBtn = document.getElementById('loginBtn');
const cartBtn = document.getElementById('cartBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const closeModal = document.querySelector('.close-modal');
const productsContainer = document.getElementById('productsContainer');
const adminPanel = document.getElementById('adminPanel');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const adminTableBody = document.getElementById('adminTableBody');
const addProductBtn = document.getElementById('addProductBtn');
const refreshProductsBtn = document.getElementById('refreshProductsBtn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    
    // Event listeners
    loginBtn.addEventListener('click', showLoginModal);
    cartBtn.addEventListener('click', toggleCart);
    closeModal.addEventListener('click', hideLoginModal);
    loginForm.addEventListener('submit', handleLogin);
    addProductBtn.addEventListener('click', showAddProductForm);
    refreshProductsBtn.addEventListener('click', refreshProducts);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            hideLoginModal();
        }
    });
});

// Mostrar modal de login
function showLoginModal() {
    if (currentUser) {
        logout();
    } else {
        loginModal.classList.remove('hidden');
        loginForm.reset();
        hideMessage();
    }
}

// Ocultar modal de login
function hideLoginModal() {
    loginModal.classList.add('hidden');
    hideMessage();
}

// Manejar inicio de sesión
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Validar credenciales
    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role
    );
    
    if (user) {
        currentUser = user;
        showMessage(`Bienvenido, ${user.name}`, 'success');
        updateUIForUser();
        setTimeout(() => {
            hideLoginModal();
        }, 1500);
    } else {
        showMessage('Credenciales incorrectas. Por favor, intente nuevamente.', 'error');
    }
}

// Cerrar sesión
function logout() {
    currentUser = null;
    updateUIForUser();
    showMessage('Sesión cerrada correctamente', 'success');
}

// Actualizar UI según el usuario
function updateUIForUser() {
    if (currentUser) {
        loginBtn.textContent = `Cerrar Sesión (${currentUser.name})`;
        
        if (currentUser.role === 'administrador') {
            adminPanel.classList.remove('hidden');
            cartPanel.classList.add('hidden');
            renderAdminTable();
        } else {
            adminPanel.classList.add('hidden');
            cartPanel.classList.remove('hidden');
        }
        
        cartBtn.classList.remove('hidden');
    } else {
        loginBtn.textContent = 'Iniciar Sesión';
        adminPanel.classList.add('hidden');
        cartPanel.classList.add('hidden');
        cartBtn.classList.add('hidden');
    }
    
    renderProducts();
}

// Mostrar mensajes
function showMessage(text, type) {
    loginMessage.textContent = text;
    loginMessage.className = `message ${type}`;
    loginMessage.classList.remove('hidden');
}

function hideMessage() {
    loginMessage.classList.add('hidden');
}

// Renderizar productos
function renderProducts() {
    productsContainer.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.icon}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-stock">Disponible: ${product.stock}</div>
                <div class="product-actions">
                    ${currentUser && currentUser.role === 'comprador' ? 
                        `<button class="btn-add-to-cart" data-id="${product.id}">Agregar al Carrito</button>` : 
                        ''}
                    ${currentUser && currentUser.role === 'administrador' ? 
                        `<button class="btn-edit" data-id="${product.id}">Editar</button>
                         <button class="btn-delete" data-id="${product.id}">Eliminar</button>` : 
                        ''}
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Agregar event listeners
    if (currentUser && currentUser.role === 'comprador') {
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
    
    if (currentUser && currentUser.role === 'administrador') {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                editProduct(productId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                deleteProduct(productId);
            });
        });
    }
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (product && product.stock > 0) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('No hay suficiente stock disponible');
                return;
            }
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartUI();
        showMessage(`${product.name} agregado al carrito`, 'success');
    } else {
        alert('Producto no disponible');
    }
}

// Actualizar carrito
function updateCartUI() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    ${item.icon}
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
                <button class="remove-item" data-id="${item.id}">🗑️</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Event listeners para controles del carrito
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Actualizar cantidad en carrito
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = productsData.find(p => p.id === productId);
    
    if (item && product) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else if (newQuantity > product.stock) {
            alert('No hay suficiente stock disponible');
        } else {
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showMessage('Producto eliminado del carrito', 'success');
}

// Mostrar/ocultar carrito
function toggleCart() {
    if (currentUser && currentUser.role === 'comprador') {
        cartPanel.classList.toggle('hidden');
    }
}

// Renderizar tabla de administración
function renderAdminTable() {
    adminTableBody.innerHTML = '';
    
    productsData.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn-edit" data-id="${product.id}">Editar</button>
                <button class="btn-delete" data-id="${product.id}">Eliminar
