let cart = [];
let cartCount = 0;
let cartTotal = 0;

const currentProduct = {
    id: 1,
    name: "Hydrating Vitamin C Serum",
    price: 6.96,
    originalPrice: 8.35,
    image: "../../assets/images/products/hydrating vitamin c serum.jpg"
};

function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

function increaseQuantity() {
    const qty = document.getElementById('quantity');
    qty.value = parseInt(qty.value) + 1;
    qty.classList.add('pulse');
    setTimeout(() => qty.classList.remove('pulse'), 200);
}

function decreaseQuantity() {
    const qty = document.getElementById('quantity');
    if (parseInt(qty.value) > 1) {
        qty.value = parseInt(qty.value) - 1;
        qty.classList.add('pulse');
        setTimeout(() => qty.classList.remove('pulse'), 200);
    }
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tab-content');
    const tabbuttons = document.getElementsByClassName('tab-button');
    
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: quantity,
            image: currentProduct.image
        });
    }
    
    updateCartUI();
    showNotification(`${quantity} item(s) added to cart!`, 'success');
}

function updateCartUI() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    document.getElementById('cartCount').textContent = cartCount;
    document.getElementById('cartItemsCount').textContent = cartCount;
    document.getElementById('cartTotal').textContent = cartTotal.toFixed(2);
    
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>€${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-total">
                    €${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Item removed from cart', 'info');
}

function toggleCart() {
    const dropdown = document.getElementById('cartDropdown');
    dropdown.classList.toggle('show');
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    showNotification('Proceeding to checkout...', 'success');
    // Add checkout logic here
}

function addToWishlist() {
    showNotification('Added to wishlist!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)' : 
                   type === 'error' ? '#ff6b6b' : '#6c757d',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '50px',
        fontWeight: '600',
        zIndex: '10000',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.opacity = '1'; }, 100);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => { notification.remove(); }, 300);
    }, 3000);
}

document.addEventListener('click', function(event) {
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer && !cartContainer.contains(event.target)) {
        document.getElementById('cartDropdown').classList.remove('show');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    const style = document.createElement('style');
    style.textContent = `
    .pulse {
        animation: pulse-qty 0.2s;
    }
    @keyframes pulse-qty {
        0% { box-shadow: 0 0 0 0 #d4a574; }
        100% { box-shadow: 0 0 0 8px rgba(212, 165, 116, 0); }
    }
    `;
    document.head.appendChild(style);
    
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.q.value.trim();
            if (query) {
                showNotification(`Searching for: ${query}`, 'info');
            } else {
                showNotification('Please enter a search term.', 'error');
            }
        });
    }
});