class TecnoChileStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.config = {};
        this.filteredProducts = [];
        this.currentView = 'store';
        this.cartOpen = false;
        this.filters = {
            category: '',
            search: '',
            maxPrice: 2000000
        };
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
            this.loadProductsFromStorage();
            this.setupEventListeners();
            this.setupFilters();
            this.setupNavigation();
            this.setupCartEventListeners();
            this.loadCartFromStorage();
            this.applyFilters();
            this.updateCartDisplay();
        } catch (error) {
            this.showNotification('Error al cargar los productos', 'error');
        }
    }

    initEmailJS() {
        if (typeof emailjs !== 'undefined' && this.emailConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
            emailjs.init(this.emailConfig.publicKey);
        }
    }

    loadProductsFromStorage() {
        const storedProducts = localStorage.getItem('tecnoChileProducts');
        if (storedProducts) {
            try {
                const productsData = JSON.parse(storedProducts);
                this.products = productsData.products || this.products;
                this.config = { ...this.config, ...productsData.config };
            } catch (error) {
            }
        }
    }

    saveProductsToStorage() {
        try {
            const productsData = {
                products: this.products,
                config: {
                    ...this.config,
                    lastUpdated: new Date().toISOString().split('T')[0]
                }
            };
            localStorage.setItem('tecnoChileProducts', JSON.stringify(productsData));
        } catch (error) {
        }
    }

    setupNavigation() {
        const storeBtn = document.getElementById('store-btn');
        const adminBtn = document.getElementById('admin-btn');

        storeBtn?.addEventListener('click', () => this.switchView('store'));
        adminBtn?.addEventListener('click', () => this.switchView('admin'));
    }

    switchView(view) {
        this.currentView = view;
        const storeView = document.getElementById('store-view');
        const adminView = document.getElementById('admin-view');
        const storeBtn = document.getElementById('store-btn');
        const adminBtn = document.getElementById('admin-btn');

        if (view === 'store') {
            storeView.style.display = 'block';
            adminView.style.display = 'none';
            storeBtn.classList.add('active');
            adminBtn.classList.remove('active');
        } else {
            storeView.style.display = 'none';
            adminView.style.display = 'block';
            storeBtn.classList.remove('active');
            adminBtn.classList.add('active');
            this.renderAdminTable();
        }
    }

    setupFilters() {
        this.populateCategoryFilter();
        this.setupFilterEventListeners();
    }

    populateCategoryFilter() {
        const categorySelect = document.getElementById('category-filter');
        const productCategorySelect = document.getElementById('product-category');
        
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Todas las categorías</option>';
            this.config.categories?.forEach(category => {
                categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        }

        if (productCategorySelect) {
            productCategorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
            this.config.categories?.forEach(category => {
                productCategorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        }
    }

    setupFilterEventListeners() {
        const categoryFilter = document.getElementById('category-filter');
        const searchFilter = document.getElementById('search-filter');
        const priceFilter = document.getElementById('price-filter');
        const priceDisplay = document.getElementById('price-display');
        const clearFiltersBtn = document.getElementById('clear-filters');

        categoryFilter?.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.applyFilters();
        });

        searchFilter?.addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        priceFilter?.addEventListener('input', (e) => {
            this.filters.maxPrice = parseInt(e.target.value);
            if (priceDisplay) {
                priceDisplay.textContent = `$${this.formatPrice(this.filters.maxPrice)}`;
            }
            this.applyFilters();
        });

        clearFiltersBtn?.addEventListener('click', () => this.clearFilters());
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            const matchesCategory = !this.filters.category || product.category === this.filters.category;
            const matchesPrice = product.price <= this.filters.maxPrice;
            const matchesSearch = !this.filters.search || this.searchInProduct(product, this.filters.search);

            return matchesCategory && matchesPrice && matchesSearch;
        });

        this.renderProducts();
        this.updateResultsCount();
    }

    searchInProduct(product, searchTerm) {
        const searchFields = [
            product.name,
            product.description,
            product.brand,
            product.category,
            ...(product.tags || [])
        ];

        return searchFields.some(field => 
            field && field.toLowerCase().includes(searchTerm)
        );
    }

    clearFilters() {
        this.filters = {
            category: '',
            search: '',
            maxPrice: 2000000
        };

        const categoryFilter = document.getElementById('category-filter');
        const searchFilter = document.getElementById('search-filter');
        const priceFilter = document.getElementById('price-filter');
        const priceDisplay = document.getElementById('price-display');

        if (categoryFilter) categoryFilter.value = '';
        if (searchFilter) searchFilter.value = '';
        if (priceFilter) priceFilter.value = 2000000;
        if (priceDisplay) priceDisplay.textContent = '$2.000.000';

        this.applyFilters();
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            const total = this.filteredProducts.length;
            const totalProducts = this.products.length;
            
            if (total === totalProducts) {
                resultsCount.textContent = `Mostrando todos los productos (${total})`;
            } else {
                resultsCount.textContent = `Mostrando ${total} de ${totalProducts} productos`;
            }
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
            this.config.categories = data.categories || [];
        } catch (error) {
            this.products = [];
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.showNotification('Error: Usa un servidor local para abrir el proyecto', 'error');
            } else {
                this.showNotification('Error al cargar productos', 'error');
            }
        }
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        const productsToShow = this.filteredProducts.length > 0 ? this.filteredProducts : this.products;
        
        if (this.products.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    <i class="fas fa-exclamation-triangle"></i>
                    No se pudieron cargar los productos
                    <br><br>
                    <strong>Para solucionarlo:</strong><br>
                    1. Usar un servidor local<br>
                    2. No abrir el archivo directamente<br>
                    3. Verificar que los productos estén disponibles
                </div>
            `;
            return;
        }

        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div class="loading">
                    <i class="fas fa-search"></i>
                    No se encontraron productos que coincidan con los filtros
                    <br><br>
                    <button onclick="store.clearFilters()" style="padding: 10px 20px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 15px;">
                        Limpiar Filtros
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="products-grid">
                ${productsToShow.map(product => this.renderProductCard(product)).join('')}
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
        
        setTimeout(() => {
            this.openCart();
        }, 500);
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
        const cartBadge = document.getElementById('cart-badge');
        const cartTotal = document.getElementById('cart-total');
        const totalAmount = document.getElementById('total-amount');
        const totalItems = document.getElementById('total-items');
        const clearBtn = document.getElementById('clear-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Actualizar badge del botón flotante
        if (cartBadge) {
            cartBadge.textContent = itemCount.toString();
            cartBadge.style.display = itemCount > 0 ? 'flex' : 'none';
        }

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <small>Agrega productos para comenzar</small>
                </div>
            `;
            if (cartTotal) cartTotal.style.display = 'none';
            if (clearBtn) clearBtn.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
            return;
        }

        const totalValue = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${this.formatPrice(item.price)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="store.updateCartQuantity(${item.id}, ${item.quantity + 1})"
                                ${item.quantity >= item.maxStock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-btn" onclick="store.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        if (totalAmount) totalAmount.textContent = this.formatPrice(totalValue);
        if (totalItems) totalItems.textContent = itemCount;
        if (cartTotal) cartTotal.style.display = 'block';
        if (clearBtn) clearBtn.style.display = 'block';
        if (checkoutBtn) checkoutBtn.style.display = 'block';
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
                this.applyFilters();
                if (this.currentView === 'admin') {
                    this.renderAdminTable();
                }
            }, 1000);
            
        } catch (error) {
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
        
        this.saveProductsToStorage();
        
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
                    this.showNotification('Error al enviar email, pero la alerta fue guardada', 'warning');
                }
            }
            
            if (!emailSent) {
                this.showNotification(`Alerta guardada: ${outOfStockProducts.length} productos sin stock. Configura el email para envío automático.`, 'warning');
                this.createMailtoLink(emailData);
            }
            
        } catch (error) {
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
        }
    }

    renderAdminTable() {
        const tbody = document.getElementById('admin-products-tbody');
        if (!tbody) return;

        tbody.innerHTML = this.products.map(product => {
            const categoryName = this.config.categories?.find(cat => cat.id === product.category)?.name || product.category;
            
            return `
                <tr>
                    <td>${product.id}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="${product.image}" style="color: #7c3aed;"></i>
                            ${product.name}
                        </div>
                    </td>
                    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${product.description}</td>
                    <td style="font-weight: 600; color: #059669;">$${this.formatPrice(product.price)}</td>
                    <td>${categoryName}</td>
                    <td>
                        <span style="padding: 4px 8px; border-radius: 4px; font-weight: 600; 
                              background: ${product.stock > this.config.lowStockThreshold ? '#dcfce7' : product.stock > 0 ? '#fef3c7' : '#fed7d7'};
                              color: ${product.stock > this.config.lowStockThreshold ? '#166534' : product.stock > 0 ? '#92400e' : '#c53030'};">
                            ${product.stock}
                        </span>
                    </td>
                    <td>
                        <button class="action-btn edit-btn" onclick="store.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="action-btn delete-btn" onclick="store.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    setupAdminEventListeners() {
        const addProductBtn = document.getElementById('add-product-btn');
        const closeModalBtn = document.getElementById('close-modal');
        const cancelFormBtn = document.getElementById('cancel-form');
        const productForm = document.getElementById('product-form');
        const modal = document.getElementById('product-form-modal');

        addProductBtn?.addEventListener('click', () => this.showProductForm());
        closeModalBtn?.addEventListener('click', () => this.hideProductForm());
        cancelFormBtn?.addEventListener('click', () => this.hideProductForm());
        
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideProductForm();
            }
        });

        productForm?.addEventListener('submit', (e) => this.handleProductSubmit(e));
    }

    showProductForm(productId = null) {
        const modal = document.getElementById('product-form-modal');
        const modalTitle = document.getElementById('modal-title');
        const form = document.getElementById('product-form');
        
        if (!modal || !form) return;

        this.populateCategoryFilter();

        if (productId) {
            const product = this.products.find(p => p.id === productId);
            if (!product) return;

            modalTitle.textContent = 'Editar Producto';
            this.populateForm(product);
        } else {
            modalTitle.textContent = 'Agregar Producto';
            form.reset();
            document.getElementById('product-id').value = '';
        }

        modal.style.display = 'flex';
    }

    hideProductForm() {
        const modal = document.getElementById('product-form-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    populateForm(product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-brand').value = product.brand;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-tags').value = (product.tags || []).join(', ');
    }

    async handleProductSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const productData = {
            name: document.getElementById('product-name').value.trim(),
            price: parseInt(document.getElementById('product-price').value),
            category: document.getElementById('product-category').value,
            stock: parseInt(document.getElementById('product-stock').value),
            description: document.getElementById('product-description').value.trim(),
            brand: document.getElementById('product-brand').value.trim(),
            image: document.getElementById('product-image').value,
            tags: document.getElementById('product-tags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
        };

        if (!this.validarDatos(productData)) {
            return;
        }

        const productId = document.getElementById('product-id').value;
        
        if (productId) {
            this.updateProduct(parseInt(productId), productData);
        } else {
            this.createProduct(productData);
        }

        this.hideProductForm();
        this.saveProductsToStorage();
        this.renderAdminTable();
        this.applyFilters();
    }

    validarDatos(data) {
        const requiredFields = ['name', 'price', 'category', 'stock', 'description', 'brand', 'image'];
        
        for (const field of requiredFields) {
            if (!data[field] && data[field] !== 0) {
                this.showNotification(`Tienes que llenar el campo ${field}`, 'error');
                return false;
            }
        }

        if (data.price <= 0) {
            this.showNotification('El precio debe ser mayor a 0', 'error');
            return false;
        }

        if (data.stock < 0) {
            this.showNotification('El stock no puede ser negativo', 'error');
            return false;
        }

        return true;
    }

    createProduct(productData) {
        const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
        const newProduct = {
            id: newId,
            ...productData
        };

        this.products.push(newProduct);
        this.showNotification('Producto creado exitosamente', 'success');
    }

    updateProduct(id, productData) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            this.showNotification('Producto no encontrado', 'error');
            return;
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...productData
        };

        this.showNotification('Producto actualizado exitosamente', 'success');
    }

    editProduct(id) {
        this.showProductForm(id);
    }

    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            this.showNotification('Producto no encontrado', 'error');
            return;
        }

        const confirmMessage = `¿Estás seguro de que quieres eliminar "${product.name}"?\n\nEsta acción no se puede deshacer.`;
        
        if (confirm(confirmMessage)) {
            this.products = this.products.filter(p => p.id !== id);
            this.cart = this.cart.filter(item => item.id !== id);
            
            this.saveProductsToStorage();
            this.saveCartToStorage();
            this.renderAdminTable();
            this.applyFilters();
            this.updateCartDisplay();
            
            this.showNotification('Producto eliminado exitosamente', 'success');
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

        this.setupAdminEventListeners();
    }

    setupCartEventListeners() {
        const cartToggleBtn = document.getElementById('cart-toggle-btn');
        const closeCartBtn = document.getElementById('close-cart-btn');
        const cartOverlay = document.getElementById('cart-overlay');

        cartToggleBtn?.addEventListener('click', () => this.toggleCart());
        closeCartBtn?.addEventListener('click', () => this.closeCart());
        cartOverlay?.addEventListener('click', () => this.closeCart());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartOpen) {
                this.closeCart();
            }
        });
    }

    toggleCart() {
        if (this.cartOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('active');
            this.cartOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('active');
            this.cartOpen = false;
            document.body.style.overflow = '';
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