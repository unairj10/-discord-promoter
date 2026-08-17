# Discord Portfolio Promoter 🚀

Bot de Discord para promocionar tu portfolio de proyectos web con embeds interactivos, comandos slash y sistema de roles.

## Características

- **13 proyectos** organizados por categorías
- **Comandos slash** interactivos
- **Sistema de roles** por intereses
- **Embeds bonitos** con colores y emojis
- **Auto-post** de proyectos
- **Mensaje de bienvenida** automático

## Estructura del Servidor

```
INFORMACIÓN/
  ├── bienvenida
  ├── reglas
  ├── anuncios
  └── proyectos

PORTFOLIO/
  ├── portfolio-web
  ├── branding
  └── galeria-fotografica

HERRAMIENTAS/
  ├── asistente-comunidad
  ├── app-tareas
  ├── calculadora-presupuestos
  └── editor-imagenes

CONTENIDO/
  ├── ediciones-montajes
  ├── juego-memoria
  ├── web-recetas
  └── blog-personal

MARKETING/
  ├── landing-negocio
  └── videos-marca

COMUNIDAD/
  ├── chat-general
  ├── chat-proyectos
  └── sugerencias

ROLES/
  └── seleccionar-roles
```

## Instalación

### 1. Crear Bot en Discord Developer Portal

1. Ve a https://discord.com/developers/applications
2. Click "New Application" → Ponle nombre → "Create"
3. Ve a "Bot" → Click "Reset Token" → Copia el token
4. Activa "Message Content Intent" en Privileged Gateway Intents
5. Ve a "OAuth2" → "URL Generator"
6. En Scopes selecciona: `bot`, `applications.commands`
7. En Bot Permissions selecciona: `Administrator`
8. Copia la URL generada y ábrela para invitar el bot a tu servidor

### 2. Configurar el Proyecto

```bash
# Clonar o descargar el proyecto
cd discord-promoter

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus datos
# DISCORD_TOKEN=tu_token
# CLIENT_ID=tu_client_id
# GUILD_ID=tu_guild_id
```

### 3. Configurar el Servidor

```bash
# Ejecutar setup para crear canales y roles
npm run setup
```

Esto creará automáticamente:
- Todas las categorías y canales
- Los roles de intereses
- Mensajes de bienvenida y roles

### 4. Iniciar el Bot

```bash
# Iniciar bot
npm start

# O en modo desarrollo (con auto-reload)
npm run dev
```

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `/portfolio` | Muestra el portfolio completo |
| `/proyecto [nombre]` | Muestra un proyecto específico |
| `/proyectos` | Lista todos los proyectos |
| `/roles` | Sistema de roles por intereses |

## Proyectos Incluidos

| Emoji | Proyecto | Categoría |
|-------|----------|-----------|
| 💼 | Portfolio Web | Proyectos |
| 👥 | Asistente de Comunidad | Herramientas |
| 🎬 | Ediciones y Montajes | Contenido |
| ✅ | App de Tareas | Herramientas |
| 🧠 | Juego de Memoria | Contenido |
| 🏪 | Landing para Negocio Local | Marketing |
| 🍳 | Web de Recetas | Contenido |
| 🖼️ | Editor de Imágenes | Herramientas |
| 📝 | Blog Personal | Contenido |
| 🎨 | Branding de Marca | Marketing |
| 💰 | Calculadora de Presupuestos | Herramientas |
| 📸 | Galería Fotográfica | Contenido |
| 🎥 | Vídeos de Marca | Marketing |

## Personalización

### Cambiar URLs de proyectos

Edita `config.js` y cambia las URLs en el array `projects`:

```javascript
{
  id: 'portfolio',
  name: 'Portfolio Web',
  emoji: '💼',
  description: 'Mi portfolio profesional',
  url: 'https://tu-nueva-url.com',  // ← Cambiar aquí
  color: '#5865F2',
  category: 'Proyectos'
}
```

### Cambiar colores

Cada proyecto tiene un color hexadecimal. Cambia el valor `color` en `config.js`.

### Añadir nuevos proyectos

Añade un nuevo objeto al array `projects` en `config.js`:

```javascript
{
  id: 'nuevo-proyecto',
  name: 'Nuevo Proyecto',
  emoji: '🆕',
  description: 'Descripción del proyecto',
  url: 'https://nuevo-proyecto.com',
  color: '#FF5733',
  category: 'Proyectos'
}
```

### Cambiar roles

Edita el array `roles` en `config.js`:

```javascript
roles: [
  { name: 'MiRol', color: '#FF5733', emoji: '🎯' },
]
```

## Comandos Útiles

```bash
# Iniciar bot en producción
npm start

# Iniciar en desarrollo con auto-reload
npm run dev

# Solo configurar servidor (sin iniciar bot)
npm run setup
```

## Solución de Problemas

### "Bot no responde comandos"
- Verifica que el token sea correcto en `.env`
- Asegúrate de que el bot tiene permisos de `Administrator`
- Ejecuta `npm run setup` para registrar comandos

### "Canales no se crean"
- Verifica que el `GUILD_ID` sea correcto
- El bot necesita permisos para gestionar canales

### "Roles no aparecen"
- Ejecuta `npm run setup` para crear los roles
- Verifica que el bot tiene permisos para gestionar roles

## Licencia

ISC
