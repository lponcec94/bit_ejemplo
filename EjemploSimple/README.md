# 🤝 Asesor de Impacto Social con Gemini AI

Una aplicación web que conecta con la API de Gemini para proporcionar asesoramiento personalizado sobre proyectos de impacto social.

## 🚀 Características

- **Interfaz web moderna** con diseño responsive
- **API RESTful** con Express.js
- **Integración con Gemini AI** para generar respuestas estructuradas
- **Manejo de errores** robusto
- **Endpoint de health check** para monitoreo

## 📋 Requisitos

- Node.js (v14 o superior)
- API Key de Gemini (obtén una en: https://makersuite.google.com/app/apikey)

## 🛠️ Instalación y Configuración

1. **Descomprimir el proyecto** (si recibiste un archivo .zip)

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env
   
   # Editar el archivo .env con tu API Key
   # Obtén tu API key en: https://makersuite.google.com/app/apikey
   ```

4. **Verificar la configuración** (opcional):
   ```bash
   node test-setup.js
   ```

## 🏃‍♂️ Ejecutar la aplicación

1. **Iniciar el servidor**:
   ```bash
   npm start
   # o
   node server.js
   ```

2. **Acceder a la aplicación**:
   Abre tu navegador en: http://localhost:3000

## 📁 Estructura del proyecto

```
EjemploSimple/
├── public/
│   └── index.html          # Frontend de la aplicación
├── .env.example            # Plantilla para variables de entorno
├── .env                    # Variables de entorno (crear desde .env.example)
├── .gitignore              # Archivos a ignorar en Git
├── package.json           # Dependencias y scripts del proyecto
├── package-lock.json      # Versiones exactas de dependencias
├── server.js              # Servidor backend con Express
├── test-setup.js          # Script de verificación de configuración
└── README.md              # Este archivo
```

## 🔗 Endpoints

### POST /api/consultar
Recibe consultas y devuelve asesoramiento personalizado.

**Body:**
```json
{
  "prompt": "¿Cómo puedo mejorar mi fundraising?",
  "contextoSocial": "Soy una ONG que trabaja con niños en situación de vulnerabilidad"
}
```

**Response:**
```json
{
  "respuesta": "Consejo personalizado...",
  "pasos_a_seguir": ["Paso 1", "Paso 2"],
  "recursos_sugeridos": ["Recurso 1", "Recurso 2"]
}
```

### GET /api/health
Endpoint para verificar el estado del servidor.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "endpoint": "/api/consultar"
}
```

## 🎯 Uso

1. Abre la aplicación en tu navegador
2. Describe el contexto de tu proyecto social
3. Formula tu pregunta o consulta
4. Recibe asesoramiento personalizado con pasos a seguir y recursos sugeridos

## 🛡️ Seguridad

- La API Key está protegida mediante variables de entorno
- Se implementa manejo de errores robusto
- Validación de entrada en el servidor

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de API Key**: 
   - Verifica que tu API Key de Gemini sea válida
   - Asegúrate de haber creado el archivo `.env` desde `.env.example`
   - Obtén tu API key en: https://makersuite.google.com/app/apikey

2. **Error de conexión**: Asegúrate de tener conexión a internet

3. **Puerto en uso**: Cambia el puerto en `server.js` si el 3000 está ocupado

4. **Error de módulos**: Ejecuta `npm install` para instalar dependencias

### Verificación de instalación:

```bash
# Verificar que Node.js funciona
node --version

# Verificar que las dependencias están instaladas
npm list

# Probar configuración
node test-setup.js
```

### Logs de error:
Los errores se muestran en la consola del servidor para facilitar el debugging.

## 📝 Notas

- La aplicación utiliza el modelo `gemini-2.5-flash` por su balance costo-velocidad
- Las respuestas se estructuran en formato JSON para mejor procesamiento
- El frontend incluye animaciones y estados de carga para mejor UX
