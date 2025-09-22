let productos = [
    {
        id: 1,
        nombre: "MacBook Pro 14",
        precio: 2499990,
        categoria: "computadoras",
        imagen: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        descripcion: "Laptop profesional con chip M3 Pro"
    },
    {
        id: 2,
        nombre: "iPhone 15 Pro",
        precio: 1299990,
        categoria: "smartphones",
        imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        descripcion: "Smartphone premium con cámara avanzada"
    },
    {
        id: 3,
        nombre: "iPad Air",
        precio: 849990,
        categoria: "tablets",
        imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
        descripcion: "Tablet versátil para trabajo y entretenimiento"
    },
    {
        id: 4,
        nombre: "AirPods Pro",
        precio: 349990,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
        descripcion: "Auriculares inalámbricos con cancelación de ruido"
    },
    {
        id: 5,
        nombre: "Samsung Galaxy S24",
        precio: 1199990,
        categoria: "smartphones",
        imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        descripcion: "Smartphone Android con IA integrada"
    },
    {
        id: 6,
        nombre: "Dell XPS 13",
        precio: 1899990,
        categoria: "computadoras",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        descripcion: "Ultrabook elegante y potente"
    },
    {
        id: 7,
        nombre: "Magic Mouse",
        precio: 129990,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
        descripcion: "Mouse inalámbrico con superficie táctil"
    },
    {
        id: 8,
        nombre: "Monitor 4K LG",
        precio: 599990,
        categoria: "monitores",
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        descripcion: "Monitor profesional 27 pulgadas 4K"
    },
    {
        id: 9,
        nombre: "Mechanical Keyboard",
        precio: 199990,
        categoria: "accesorios",
        imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        descripcion: "Teclado mecánico RGB para gaming"
    },
    {
        id: 10,
        nombre: "Nintendo Switch",
        precio: 449990,
        categoria: "gaming",
        imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        descripcion: "Consola híbrida para jugar en casa o portátil"
    }
];

let carrito = [];
let cliente = null;

function formatearPrecio(precio) {
    return precio.toLocaleString('es-CL');
}

function renderizarProductos(productosAMostrar = productos) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    if (productosAMostrar.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center" style="color: #a855f7; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h4>No se encontraron productos 🥺</h4>
                <p>Intenta con otra búsqueda ✨</p>
            </div>
        `;
        return;
    }

    productosAMostrar.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-lg-3 mb-4';
        
        col.innerHTML = `
            <div class="card product-card h-100">
                <img src="${producto.imagen}" class="product-img" alt="${producto.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title" style="color: #8b5cf6;">${producto.nombre}</h5>
                    <p class="card-text text-muted">${producto.descripcion}</p>
                    <div class="mt-auto">
                        <div class="price-tag">$${formatearPrecio(producto.precio)}</div>
                        <button class="btn btn-primary w-100 mt-2" onclick="agregarAlCarrito(${producto.id})" 
                                data-bs-toggle="tooltip" title="Agregar ${producto.nombre} al carrito">
                            🛒 Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });

    reinicializarTooltips();
}

function reinicializarTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        if (tooltipTriggerEl._tooltip) {
            tooltipTriggerEl._tooltip.dispose();
        }
    });
    
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function filtrarProductos() {
    const busqueda = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (busqueda === '') {
        renderizarProductos(productos);
        return;
    }

    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.categoria.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
    );

    renderizarProductos(productosFiltrados);
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) {
        alert('Producto no encontrado 🥺');
        return;
    }

    const itemExistente = carrito.find(item => item.id === idProducto);
    
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito 💖`);
    
    // Abrir el carrito automáticamente
    setTimeout(() => {
        openCart();
    }, 500);
}

function eliminarDelCarrito(idProducto) {
    const indice = carrito.findIndex(item => item.id === idProducto);
    
    if (indice !== -1) {
        const nombreProducto = carrito[indice].nombre;
        carrito.splice(indice, 1);
        actualizarCarrito();
        mostrarNotificacion(`${nombreProducto} eliminado del carrito 🗑️`);
    }
}

function actualizarCantidad(idProducto, nuevaCantidad) {
    const item = carrito.find(item => item.id === idProducto);
    
    if (item && nuevaCantidad > 0) {
        item.cantidad = nuevaCantidad;
        actualizarCarrito();
    } else if (item && nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
    }
}

function actualizarCarrito() {
    const cartItemsSidebar = document.getElementById('cartItemsSidebar');
    const cartCount = document.getElementById('cartCount');
    const cartFooter = document.getElementById('cartFooter');
    const totalPriceSidebar = document.getElementById('totalPriceSidebar');

    cartCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

    if (carrito.length === 0) {
        cartItemsSidebar.innerHTML = `
            <div class="empty-cart-sidebar">
                <i class="fas fa-shopping-cart"></i>
                <h4>Tu carrito está vacío 🥺</h4>
                <p>¡Agrega algunos productos para empezar! ✨</p>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }

    let cartHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        cartHTML += `
            <div class="cart-item">
                <div class="d-flex align-items-center mb-2">
                    <img src="${item.imagen}" class="img-fluid rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1" style="color: #8b5cf6; font-size: 0.9rem;">${item.nombre}</h6>
                        <small class="text-muted">$${formatearPrecio(item.precio)}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarDelCarrito(${item.id})" 
                            data-bs-toggle="tooltip" title="Eliminar producto">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="input-group input-group-sm" style="width: 120px;">
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                        <input type="text" class="form-control text-center" value="${item.cantidad}" readonly>
                        <button class="btn btn-outline-secondary" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                    </div>
                    <strong style="color: #059669; font-size: 0.9rem;">$${formatearPrecio(subtotal)}</strong>
                </div>
            </div>
        `;
    });

    cartItemsSidebar.innerHTML = cartHTML;
    totalPriceSidebar.textContent = formatearPrecio(total);
    cartFooter.style.display = 'block';

    reinicializarTooltips();
}

function clearCart() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito ya está vacío 🥺');
        return;
    }

    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito? 🥺')) {
        carrito = [];
        actualizarCarrito();
        mostrarNotificacion('Carrito vaciado exitosamente 🗑️✨');
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function proceedToCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío 🥺');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const nombreCliente = cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente';
    
    mostrarNotificacion(`¡Gracias ${nombreCliente}! Tu compra por $${formatearPrecio(total)} está siendo procesada 💳✨`);
    
    setTimeout(() => {
        carrito = [];
        actualizarCarrito();
        closeCart();
        mostrarNotificacion('¡Compra realizada exitosamente! 🎉');
    }, 2000);
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffc1e3, #e1c4ff);
        color: #8b5cf6;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(255, 192, 227, 0.5);
        z-index: 9999;
        font-weight: 600;
        border: 2px solid rgba(255, 255, 255, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    notificacion.innerHTML = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

function guardarCliente() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    if (!nombre || !apellido) {
        mostrarNotificacion('Por favor completa todos los campos 🥺');
        return;
    }

    cliente = { nombre, apellido };
    
    document.getElementById('customerName').textContent = `${nombre} ${apellido}`;
    document.getElementById('welcomeMessage').style.display = 'block';
    
    mostrarNotificacion(`¡Bienvenido/a ${nombre}! 🌸`);
    
    document.getElementById('customerForm').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos();
    
    document.getElementById('searchInput').addEventListener('input', filtrarProductos);
    
    document.getElementById('customerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarCliente();
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;
window.clearCart = clearCart;
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.proceedToCheckout = proceedToCheckout;