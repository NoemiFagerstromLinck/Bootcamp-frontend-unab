# Configuracion EmailJS para Tecno Chile

## Que es EmailJS
EmailJS es un servicio que permite enviar correos electrónicos directamente desde el navegador sin necesidad de un servidor backend.

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ir a https://www.emailjs.com/
2. Crear una cuenta gratuita
3. Confirmar email

### 2. Configurar un servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Anota el **Service ID** que se genera

### 3. Crear un template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template:

```
Subject: {{subject}}

Estimado {{to_name}},

{{message}}

---
Detalles de la alerta:
- Productos afectados: {{product_count}}
- Fecha: {{date}}

Productos sin stock:
{{product_list}}

---
Sistema automatizado de {{from_name}}
```

4. Guarda el template y anota el **Template ID**

### 4. Obtener la clave pública
1. Ve a "Account" en el menú
2. Busca la sección "API Keys"
3. Copia tu **Public Key**

### 5. Configurar en el proyecto
En el archivo `carrito.js`, reemplaza las siguientes líneas:

```javascript
this.emailConfig = {
    serviceId: 'TU_SERVICE_ID_AQUI',     // Reemplaza con tu Service ID
    templateId: 'TU_TEMPLATE_ID_AQUI',   // Reemplaza con tu Template ID  
    publicKey: 'TU_PUBLIC_KEY_AQUI'      // Reemplaza con tu Public Key
};
```

### 6. Configurar email del administrador
En el archivo `productos.json`, actualiza el campo:
```json
"config": {
    "adminEmail": "tu-email@tecnochile.cl"
}
```

## Ejemplo de configuración completa:

```javascript
this.emailConfig = {
    serviceId: 'service_abc123',
    templateId: 'template_def456', 
    publicKey: 'ghi789jkl012'
};
```

## Alternativas si no configuras EmailJS:

1. **Enlace mailto**: El sistema creará automáticamente un enlace que abre tu cliente de email por defecto
2. **Consola del navegador**: Todas las alertas se muestran en la consola del navegador
3. **LocalStorage**: Las alertas se guardan localmente en el navegador

## Limites del plan gratuito
- 200 emails por mes
- Adecuado para este proyecto de demostracion

## Soporte
Para problemas, consultar la documentacion oficial: https://www.emailjs.com/docs/