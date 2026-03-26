# 🚀 Guía Rápida de Configuración

## Para ambos proyectos (EjemploSimple y EjemploMultimodal)

### 1. Preparar el entorno
```bash
# Verificar Node.js instalado
node --version  # Debe ser v14 o superior

# Navegar al directorio del proyecto
cd [nombre-del-proyecto]
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar API Key
```bash
# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tu API Key
# Obtén tu API key en: https://makersuite.google.com/app/apikey
```

### 4. Verificar configuración
```bash
# Probar configuración básica
node test-setup.js

# Para EjemploMultimodal, también probar JSON parsing
node test-json-parsing.js
```

### 5. Iniciar aplicación
```bash
npm start
# o
node server.js
```

### 6. Acceder a la aplicación
Abre tu navegador en: http://localhost:3000

## 🆘 Si algo no funciona:

1. **Error de API Key**: Revisa que tu API key sea válida
2. **Error de módulos**: Ejecuta `npm install` nuevamente
3. **Error de puerto**: Cambia el puerto en server.js
4. **Error de JSON** (solo Multimodal): Ejecuta `node test-json-parsing.js`

## 📞 Soporte:

- Revisa el README.md completo de cada proyecto
- Los errores aparecen en la consola del servidor
- Ambos proyectos incluyen scripts de prueba para diagnóstico

---

**¡Listo!** Tu asesor de impacto social con Gemini AI está funcionando. 🎉
