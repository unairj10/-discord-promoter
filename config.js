require('dotenv').config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  projects: [
    {
      id: 'portfolio',
      name: 'Portfolio Web',
      emoji: '💼',
      description: 'Mi portfolio profesional con todos mis proyectos',
      url: 'https://tu-portfolio.com',
      color: '#5865F2',
      category: 'Proyectos',
      image: null
    },
    {
      id: 'comunidad',
      name: 'Asistente de Comunidad',
      emoji: '👥',
      description: 'Herramienta para gestionar comunidades online',
      url: 'https://tu-comunidad.com',
      color: '#57F287',
      category: 'Herramientas',
      image: null
    },
    {
      id: 'ediciones',
      name: 'Ediciones y Montajes',
      emoji: '🎬',
      description: 'Servicios de edición de vídeo y montaje',
      url: 'https://tu-ediciones.com',
      color: '#FEE75C',
      category: 'Contenido',
      image: null
    },
    {
      id: 'tareas',
      name: 'App de Tareas',
      emoji: '✅',
      description: 'Aplicación para gestionar tareas y productividad',
      url: 'https://tu-tareas.com',
      color: '#EB459E',
      category: 'Herramientas',
      image: null
    },
    {
      id: 'memoria',
      name: 'Juego de Memoria',
      emoji: '🧠',
      description: 'Juego interactivo para entrenar la memoria',
      url: 'https://tu-juego.com',
      color: '#ED4245',
      category: 'Contenido',
      image: null
    },
    {
      id: 'landing',
      name: 'Landing para Negocio Local',
      emoji: '🏪',
      description: 'Landing page optimizada para negocios locales',
      url: 'https://tu-landing.com',
      color: '#57F287',
      category: 'Marketing',
      image: null
    },
    {
      id: 'recetas',
      name: 'Web de Recetas',
      emoji: '🍳',
      description: 'Blog de recetas con buscador inteligente',
      url: 'https://tu-recetas.com',
      color: '#FEE75C',
      category: 'Contenido',
      image: null
    },
    {
      id: 'imagenes',
      name: 'Editor de Imágenes',
      emoji: '🖼️',
      description: 'Editor de imágenes online con IA',
      url: 'https://tu-editor.com',
      color: '#5865F2',
      category: 'Herramientas',
      image: null
    },
    {
      id: 'blog',
      name: 'Blog Personal',
      emoji: '📝',
      description: 'Mi blog con artículos sobre tecnología y desarrollo',
      url: 'https://tu-blog.com',
      color: '#EB459E',
      category: 'Contenido',
      image: null
    },
    {
      id: 'branding',
      name: 'Branding de Marca',
      emoji: '🎨',
      description: 'Identidad visual y branding profesional',
      url: 'https://tu-branding.com',
      color: '#5865F2',
      category: 'Marketing',
      image: null
    },
    {
      id: 'calculadora',
      name: 'Calculadora de Presupuestos',
      emoji: '💰',
      description: 'Herramienta para calcular presupuestos de proyectos',
      url: 'https://tu-calculadora.com',
      color: '#57F287',
      category: 'Herramientas',
      image: null
    },
    {
      id: 'galeria',
      name: 'Galería Fotográfica',
      emoji: '📸',
      description: 'Galería de mis mejores fotografías',
      url: 'https://tu-galeria.com',
      color: '#FEE75C',
      category: 'Contenido',
      image: null
    },
    {
      id: 'videos',
      name: 'Vídeos de Marca',
      emoji: '🎥',
      description: 'Canal de vídeos promocionales y de marca',
      url: 'https://tu-videos.com',
      color: '#ED4245',
      category: 'Marketing',
      image: null
    }
  ],
  roles: [
    { name: 'Desarrollo', color: '#5865F2', emoji: '💻' },
    { name: 'Diseño', color: '#EB459E', emoji: '🎨' },
    { name: 'Marketing', color: '#57F287', emoji: '📈' },
    { name: 'Contenido', color: '#FEE75C', emoji: '✍️' },
    { name: 'Notificaciones', color: '#ED4245', emoji: '🔔' }
  ]
};
