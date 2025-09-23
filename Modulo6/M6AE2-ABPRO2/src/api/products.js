export async function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "MacBook Pro 14",
          price: 2499990,
          stock: 8,
          image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
          description: "Laptop profesional con chip M3 Pro"
        },
        {
          id: 2,
          name: "iPhone 15 Pro",
          price: 1299990,
          stock: 3,
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
          description: "Smartphone premium con cámara avanzada"
        },
        {
          id: 3,
          name: "iPad Air",
          price: 849990,
          stock: 12,
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
          description: "Tablet versátil para trabajo y entretenimiento"
        },
        {
          id: 4,
          name: "AirPods Pro",
          price: 349990,
          stock: 0,
          image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400",
          description: "Auriculares inalámbricos con cancelación de ruido"
        },
        {
          id: 5,
          name: "Samsung Galaxy S24",
          price: 1199990,
          stock: 6,
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
          description: "Smartphone Android con IA integrada"
        }
      ])
    }, 500)
  })
}