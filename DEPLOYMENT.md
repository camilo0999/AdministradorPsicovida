# Instrucciones de Despliegue en Netlify

## Preparación del Proyecto

Tu proyecto ya está configurado para desplegar en Netlify. Los archivos necesarios han sido creados:

- `netlify.toml` - Configuración de Netlify
- `public/_redirects` - Manejo de rutas de React Router
- `vite.config.js` - Configuración optimizada para producción

## Pasos para Desplegar

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**

   ```bash
   git add .
   git commit -m "Preparado para despliegue en Netlify"
   git push origin main
   ```

2. **Conecta con Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Crea una cuenta o inicia sesión
   - Haz clic en "New site from Git"
   - Selecciona tu repositorio de GitHub
   - Configuración automática:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Haz clic en "Deploy site"

### Opción 2: Despliegue Manual

1. **Construye tu proyecto:**

   ```bash
   npm run build
   ```

2. **Sube a Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - Arrastra la carpeta `dist` a la zona de deploy
   - Tu sitio estará disponible en una URL como `https://random-name.netlify.app`

## Configuración de Variables de Entorno (si es necesario)

Si tu aplicación usa variables de entorno, puedes configurarlas en Netlify:

1. Ve a tu sitio en Netlify
2. Site settings > Environment variables
3. Agrega las variables necesarias

## Verificación

Después del despliegue, verifica que:

- ✅ La página principal carga correctamente
- ✅ Las rutas de React Router funcionan (navega entre páginas)
- ✅ El login funciona
- ✅ Todas las funcionalidades están operativas

## Solución de Problemas Comunes

### Error 404 en rutas

- Verifica que el archivo `public/_redirects` existe
- Asegúrate de que el `netlify.toml` tiene la configuración de redirects

### Error de build

- Verifica que todas las dependencias están en `package.json`
- Revisa los logs de build en Netlify

### Problemas de rutas

- Asegúrate de que usas `BrowserRouter` (que ya tienes configurado)
- Verifica que las rutas están bien definidas en tu `App.jsx`

## URLs Personalizadas

Para usar un dominio personalizado:

1. Ve a Site settings > Domain management
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones de Netlify
