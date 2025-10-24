export async function login(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'usuario1@mitienda.com' && credentials.password === 'password') {
        resolve({
          success: true,
          user: {
            id: 1,
            email: credentials.email,
            name: credentials.name || 'Usuario'
          }
        })
      } else {
        reject(new Error('Credenciales incorrectas'))
      }
    }, 1000)
  })
}