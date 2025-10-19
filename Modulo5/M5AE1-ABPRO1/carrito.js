class TecnoChileStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.config = {};
        this.emailConfig = {
            serviceId: 'service_tecnochile',
            templateId: 'template_stock_alert',
            publicKey: 'YOUR_PUBLIC_KEY_HERE'
        };
        this.init();
    }

    async init() {
        try {
            this.initEmailJS();
            await this.loadProducts();
            this.renderProducts();
            this.setupEventListeners();
            this.loadCartFromStorage();
            this.updateCartDisplay();
        } catch (error) {
            this.showNotification('Error al cargar los productos', 'error');
            console.error('Error initializing store:', error);
        }
    }

    initEmailJS() {
        if (typeof emailjs !== 'undefined' && this.emailConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
            emailjs.init(this.emailConfig.publicKey);
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('productos.json');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - No se pudieron cargar los productos`);
            }
            const data = await response.json();
            this.products = data.products || [];
            this.config = data.config || {};
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.showNotification('Error: Abre el proyecto desde http://localhost:8000', 'error');
            } else {
                this.showNotification('Error al cargar productos', 'error');
            }
        }
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        
        if (this.products.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    <i class="fas fa-exclamation-triangle"></i>
                    No se pudieron cargar los productos
                    <br><br>
                    <strong>Solución:</strong><br>
                    1. Usar Live Server o servidor HTTP<br>
                    2. No abrir directamente el archivo HTML<br>
                    3. Verificar que productos.json esté disponible
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="products-grid">
                ${this.products.map(product => this.renderProductCard(product)).join('')}
            </div>
        `;
    }

    renderProductCard(product) {
        const stockInfo = this.getStockInfo(product);
        const isOutOfStock = product.stock === 0;
        
        return `
            <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}">
                <div class="product-image">
                    <i class="${product.image}"></i>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${this.formatPrice(product.price)}</div>
                <div class="stock-info ${stockInfo.class}">
                    ${stockInfo.message}
                </div>
                <div class="product-controls">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="store.changeQuantity(${product.id}, -1)" ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" id="qty-${product.id}" 
                               value="1" min="1" max="${product.stock}" ${isOutOfStock ? 'disabled' : ''}>
                        <button class="quantity-btn" onclick="store.changeQuantity(${product.id}, 1)" ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="add-to-cart-btn" onclick="store.addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Agotado' : 'Agregar'}
                    </button>
                </div>
            </div>
        `;
    }

    getStockInfo(product) {
        if (product.stock === 0) {
            return {
                class: 'stock-out',
                message: 'AGOTADO - Sin stock disponible'
            };
        } else if (product.stock === 1) {
            return {
                class: 'stock-last',
                message: 'ÚLTIMO PRODUCTO - Solo queda 1 unidad'
            };
        } else if (product.stock < this.config.lowStockThreshold) {
            return {
                class: 'stock-low',
                message: `STOCK BAJO - Solo quedan ${product.stock} unidades`
            };
        } else {
            return {
                class: 'stock-available',
                message: `Disponible - ${product.stock} unidades en stock`
            };
        }
    }

    changeQuantity(productId, delta) {
        const input = document.getElementById(`qty-${productId}`);
        const product = this.products.find(p => p.id === productId);
        
        if (!input || !product || product.stock === 0) return;

        let newValue = parseInt(input.value) + delta;
        newValue = Math.max(1, Math.min(newValue, product.stock));
        input.value = newValue;
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const quantityInput = document.getElementById(`qty-${productId}`);
        
        if (!product || !quantityInput) return;

        const quantity = parseInt(quantityInput.value);
        
        if (product.stock === 0) {
            this.showNotification('Producto agotado', 'error');
            return;
        }

        if (quantity > product.stock) {
            this.showNotification(`Solo hay ${product.stock} unidades disponibles`, 'warning');
            return;
        }

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                this.showNotification(`No puedes agregar más de ${product.stock} unidades`, 'warning');
                return;
            }
            existingItem.quantity = newQuantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                maxStock: product.stock
            });
        }

        quantityInput.value = 1;
        this.updateCartDisplay();
        this.saveCartToStorage();
        this.showNotification(`${product.name} agregado al carrito`, 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.saveCartToStorage();
        this.showNotification('Producto eliminado del carrito', 'success');
    }

    updateCartQuantity(productId, newQuantity) {
        const cartItem = this.cart.find(item => item.id === productId);
        const product = this.products.find(p => p.id === productId);
        
        if (!cartItem || !product) return;

        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        if (newQuantity > product.stock) {
            this.showNotification(`Solo hay ${product.stock} unidades disponibles`, 'warning');
            return;
        }

        cartItem.quantity = newQuantity;
        this.updateCartDisplay();
        this.saveCartToStorage();
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const totalAmount = document.getElementById('total-amount');
        const totalItems = document.getElementById('total-items');
        const clearBtn = document.getElementById('clear-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart" style="font-size: 3em; color: #d1d5db; margin-bottom: 15px;"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            cartCount.textContent = '0';
            cartTotal.style.display = 'none';
            clearBtn.style.display = 'none';
            checkoutBtn.style.display = 'none';
            return;
        }

        const totalValue = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                    <span class="cart-item-price">$${this.formatPrice(item.price)} c/u</span>
                    <span>Subtotal: $${this.formatPrice(item.price * item.quantity)}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="quantity-input" value="${item.quantity}" 
                               min="1" max="${item.maxStock}"
                               onchange="store.updateCartQuantity(${item.id}, parseInt(this.value))">
                        <button class="quantity-btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity + 1})"
                                ${item.quantity >= item.maxStock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" onclick="store.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `).join('');

        cartCount.textContent = itemCount.toString();
        totalAmount.textContent = this.formatPrice(totalValue);
        totalItems.textContent = itemCount;
        cartTotal.style.display = 'block';
        clearBtn.style.display = 'block';
        checkoutBtn.style.display = 'block';
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
            this.cart = [];
            this.updateCartDisplay();
            this.saveCartToStorage();
            this.showNotification('Carrito limpiado', 'success');
        }
    }

    async checkout() {
        if (this.cart.length === 0) {
            this.showNotification('El carrito está vacío', 'warning');
            return;
        }

        const totalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        const confirmMessage = `¿Confirmar compra?
        
Total: $${this.formatPrice(totalAmount)}
Productos: ${itemCount} unidades

Esta acción no se puede deshacer.`;

        if (!confirm(confirmMessage)) return;

        try {
            this.showNotification('Procesando compra...', 'success');
            
            await this.processOrder();
            
            this.showNotification('¡Compra realizada con éxito!', 'success');
            
            this.cart = [];
            this.updateCartDisplay();
            this.saveCartToStorage();
            
            setTimeout(() => {
                this.renderProducts();
            }, 1000);
            
        } catch (error) {
            console.error('Error processing checkout:', error);
            this.showNotification('Error al procesar la compra', 'error');
        }
    }

    async processOrder() {
        const outOfStockProducts = [];
        
        for (const cartItem of this.cart) {
            const product = this.products.find(p => p.id === cartItem.id);
            
            if (!product) continue;
            
            if (product.stock < cartItem.quantity) {
                throw new Error(`Stock insuficiente para ${product.name}`);
            }
            
            const previousStock = product.stock;
            product.stock -= cartItem.quantity;
            
            if (product.stock === 0) {
                outOfStockProducts.push({
                    id: product.id,
                    name: product.name,
                    previousStock: previousStock
                });
            }
        }
        
        await this.updateProductsFile();
        
        if (outOfStockProducts.length > 0) {
            await this.sendOutOfStockAlert(outOfStockProducts);
        }
    }

    async updateProductsFile() {
        try {
            const updatedData = {
                products: this.products,
                config: {
                    ...this.config,
                    lastUpdated: new Date().toISOString().split('T')[0]
                }
            };
            

            
        } catch (error) {
            console.error('Error updating products file:', error);
        }
    }

    async sendOutOfStockAlert(outOfStockProducts) {
        try {
            const currentDate = new Date().toLocaleString('es-CL');
            const productList = outOfStockProducts.map(product => `
- ${product.name} (ID: ${product.id})
  Stock anterior: ${product.previousStock} unidades
  Stock actual: 0 unidades`).join('');

            const alertMessage = `
ALERTA DE STOCK AGOTADO - Tecno Chile

Los siguientes productos se han agotado después de la última venta:
${productList}

Fecha: ${currentDate}
Sistema: Carrito de Compras Tecno Chile

Por favor, revisar el inventario y realizar pedidos de reposición.
            `;

            const emailData = {
                to: this.config.adminEmail,
                subject: 'ALERTA: Productos sin stock - Tecno Chile',
                body: alertMessage,
                products: outOfStockProducts,
                timestamp: currentDate
            };
            
            localStorage.setItem('lastOutOfStockAlert', JSON.stringify({
                timestamp: new Date().toISOString(),
                products: outOfStockProducts,
                emailData: emailData
            }));
            
            // Intentar enviar email real con EmailJS
            let emailSent = false;
            if (typeof emailjs !== 'undefined' && this.emailConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
                try {
                    const templateParams = {
                        to_email: this.config.adminEmail,
                        to_name: 'Administrador Tecno Chile',
                        from_name: 'Sistema Tecno Chile',
                        subject: 'ALERTA: Productos sin stock - Tecno Chile',
                        message: alertMessage,
                        product_count: outOfStockProducts.length,
                        date: currentDate,
                        product_list: productList
                    };

                    const response = await emailjs.send(
                        this.emailConfig.serviceId,
                        this.emailConfig.templateId,
                        templateParams
                    );

                    if (response.status === 200) {
                        emailSent = true;
                        this.showNotification(`Email enviado al administrador: ${outOfStockProducts.length} productos sin stock`, 'success');
                    }
                } catch (emailError) {
                    console.error('Error al enviar email con EmailJS:', emailError);
                    this.showNotification('Error al enviar email, pero la alerta fue guardada', 'warning');
                }
            }
            
            if (!emailSent) {
                this.showNotification(`Alerta guardada: ${outOfStockProducts.length} productos sin stock. Configure EmailJS para envio automatico.`, 'warning');
                this.createMailtoLink(emailData);
            }
            
        } catch (error) {
            console.error('Error sending out of stock alert:', error);
            this.showNotification('Error al procesar alerta de stock', 'error');
        }
    }

    createMailtoLink(emailData) {
        try {
            const subject = encodeURIComponent(emailData.subject);
            const body = encodeURIComponent(emailData.body);
            const mailtoLink = `mailto:${emailData.to}?subject=${subject}&body=${body}`;
            const emailButton = document.createElement('button');
            emailButton.innerHTML = '<i class="fas fa-envelope"></i> Abrir Email';
            emailButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #dc3545;
                color: white;
                border: none;
                padding: 15px 20px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                z-index: 1001;
                box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
            `;
            
            emailButton.onclick = () => {
                window.open(mailtoLink);
                emailButton.remove();
            };
            
            document.body.appendChild(emailButton);
            
            setTimeout(() => {
                if (emailButton.parentNode) {
                    emailButton.remove();
                }
            }, 30000);
            
        } catch (error) {
            console.error('Error creating mailto link:', error);
        }
    }

    setupEventListeners() {
        const clearBtn = document.getElementById('clear-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCart());
        }
        
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    saveCartToStorage() {
        localStorage.setItem('tecnoChileCart', JSON.stringify(this.cart));
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem('tecnoChileCart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                
                this.cart = this.cart.filter(item => {
                    const product = this.products.find(p => p.id === item.id);
                    if (!product) return false;
                    
                    if (item.quantity > product.stock) {
                        item.quantity = product.stock;
                    }
                    
                    item.maxStock = product.stock;
                    return product.stock > 0;
                });
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            this.cart = [];
        }
    }

    formatPrice(price) {
        return new Intl.NumberFormat('es-CL').format(price);
    }

    showNotification(message, type = 'success') {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                          type === 'error' ? 'fa-exclamation-circle' : 
                          'fa-exclamation-triangle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

const store = new TecnoChileStore();

window.addEventListener('beforeunload', () => {
    store.saveCartToStorage();
});