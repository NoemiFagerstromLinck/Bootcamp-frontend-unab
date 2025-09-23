export async function login(credentials) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        resolve({
          success: true,
          user: {
            id: 1,
            username: credentials.username,
            name: 'Administrador'
          }
        })
      } else {
        resolve({
          success: false,
          message: 'Credenciales incorrectas'
        })
      }
    }, 1000)
  })
}