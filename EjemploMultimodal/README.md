# 🤝 Asesor de Impacto Social Multimodal con Gemini AI

Una aplicación web avanzada que conecta con la API de Gemini para proporcionar asesoramiento personalizado sobre proyectos de impacto social con **soporte para imágenes**.

## 🚀 Características Multimodales

- **🖼️ Análisis de imágenes**: Sube fotos de tu proyecto, comunidad o contexto
- **💬 Procesamiento de texto**: Describe tu proyecto social en detalle
- **🤖 IA multimodal**: Gemini analiza tanto texto como imágenes juntos
- **📱 Interface responsive**: Diseño moderno que funciona en todos los dispositivos
- **🔄 Drag & Drop**: Arrastra y suelta imágenes fácilmente
- **📊 Respuestas estructuradas**: JSON con consejos, pasos y recursos

## 📋 Requisitos

- Node.js (v14 o superior)
- API Key de Gemini (obtén una en: https://makersuite.google.com/app/apikey)
- Navegador web moderno

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

5. **Probar parsing JSON** (opcional, para solucionar problemas):
   ```bash
   node test-json-parsing.js
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
EjemploMultimodal/
├── public/
│   └── index.html          # Frontend multimodal con upload de imágenes
├── .env.example            # Plantilla para variables de entorno
├── .env                    # Variables de entorno (crear desde .env.example)
├── .gitignore              # Archivos a ignorar en Git
├── package.json           # Dependencias y scripts del proyecto
├── package-lock.json      # Versiones exactas de dependencias
├── server.js              # Servidor con soporte para imágenes
├── test-setup.js          # Script de verificación de configuración
├── test-json-parsing.js   # Script para probar parsing de JSON
└── README.md              # Este archivo
```

## 🔗 Endpoints

### POST /api/consultar (Multimodal)
Recibe consultas con texto y opcionalmente imágenes.

**Form Data:**
- `prompt`: Pregunta o consulta (texto)
- `contextoSocial`: Contexto del proyecto (texto)
- `imagen`: Archivo de imagen (opcional)

**Response:**
```json
{
  "respuesta": "Consejo personalizado...",
  "pasos_a_seguir": ["Paso 1", "Paso 2"],
  "recursos_sugeridos": ["Recurso 1", "Recurso 2"],
  "analisis_imagen": "Análisis de la imagen si se proporcionó"
}
```

### POST /api/consultar-texto (Solo texto)
Endpoint optimizado para consultas sin imágenes (usa gemini-2.5-flash).

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
  "endpoints": ["/api/consultar", "/api/consultar-texto"],
  "features": ["text", "image-upload", "multimodal"]
}
```

### GET /api/image-info
Información sobre formatos de imagen soportados.

**Response:**
```json
{
  "supportedFormats": ["JPEG", "PNG", "GIF", "BMP", "WEBP"],
  "maxSize": "10MB",
  "maxDimensions": "No specific limit (recommended: < 2048x2048)"
}
```

## 🎯 Uso Avanzado

### 1. **Subida de Imágenes**
- **Formatos soportados**: JPEG, PNG, GIF, BMP, WEBP
- **Tamaño máximo**: 10MB
- **Métodos**: Click para seleccionar o arrastrar y soltar

### 2. **Casos de Uso con Imágenes**
- 📸 **Fotos del proyecto**: Muestra tu espacio de trabajo
- 👥 **Comunidad**: Comparte imágenes de las personas que atiendes
- 🏗️ **Infraestructura**: Sube fotos de tus instalaciones
- 📊 **Documentos**: Capturas de pantallas de métricas o reportes

### 3. **Ejemplos de Consultas**

**Con imagen de un espacio comunitario:**
```
Contexto: Espacio comunitario en zona rural
Pregunta: ¿Cómo puedo optimizar este espacio para talleres educativos?
```

**Con imagen de un evento:**
```
Contexto: Organización de eventos benéficos
Pregunta: ¿Qué mejoras sugieres para el próximo evento basándote en esta foto?
```

## 🛡️ Seguridad y Validación

- **Validación de archivos**: Solo se permiten imágenes
- **Límite de tamaño**: Máximo 10MB por archivo
- **Manejo de errores**: Robusto con mensajes claros
- **API Key protegida**: Variables de entorno

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de API Key**: 
   - Verifica que tu API Key de Gemini sea válida
   - Asegúrate de haber creado el archivo `.env` desde `.env.example`
   - Obtén tu API key en: https://makersuite.google.com/app/apikey

2. **Error al subir imagen**:
   - Verifica el formato (debe ser imagen: JPEG, PNG, GIF, BMP, WEBP)
   - Confirma el tamaño (< 10MB)
   - Revisa conexión a internet

3. **Error de conexión**: Asegúrate de tener conexión a internet

4. **Error de módulos**: Ejecuta `npm install` para instalar dependencias

5. **Error de JSON**: Si hay problemas con el parsing, ejecuta `node test-json-parsing.js`

### Verificación de instalación:

```bash
# Verificar que Node.js funciona
node --version

# Verificar que las dependencias están instaladas
npm list

# Probar configuración
node test-setup.js

# Probar parsing JSON (si hay problemas)
node test-json-parsing.js
```

### Logs de error:
Los errores se muestran en la consola del servidor para facilitar el debugging.

## 📝 Notas Técnicas

- **Modelo multimodal**: `gemini-1.5-flash` para texto + imágenes
- **Modelo texto**: `gemini-2.5-flash` para solo texto (más económico)
- **Upload**: Usando `multer` para manejo de archivos
- **Base64**: Las imágenes se convierten a base64 para la API
- **Frontend**: Vanilla JavaScript con drag & drop

## 🌟 Mejoras vs Versión Simple

| Característica | Simple | Multimodal |
|---|---|---|
| 📝 Procesamiento de texto | ✅ | ✅ |
| 🖼️ Análisis de imágenes | ❌ | ✅ |
| 🔄 Drag & Drop | ❌ | ✅ |
| 📱 Vista previa de imágenes | ❌ | ✅ |
| 🤖 Modelos especializados | 1 | 2 |
| 📊 Análisis contextual | Básico | Avanzado |

## 🚀 Siguientes Pasos

1. **Prueba con diferentes tipos de imágenes**
2. **Experimenta con consultas específicas**
3. **Combina múltiples contextos**
4. **Mide el impacto de las recomendaciones**
