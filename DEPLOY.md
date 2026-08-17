# Guía de Despliegue en Render

## Paso 1: Crear cuenta en Render
1. Ve a https://render.com
2. Click **"Get Started for Free"**
3. Regístrate con GitHub, Google o email

## Paso 2: Subir código a GitHub
1. Crea un repositorio en GitHub: https://github.com/new
2. Nombre: `discord-promoter`
3. Sigue las instrucciones para subir tu código:
```bash
cd discord-promoter
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/discord-promoter.git
git push -u origin main
```

## Paso 3: Crear servicio en Render
1. En Render, click **"New +"** → **"Web Service"**
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `discord-promoter`
4. Configura:
   - **Name**: `discord-bot`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node render.js`
   - **Plan**: `Free`

## Paso 4: Agregar variables de entorno
En la sección **"Environment Variables"** agrega:

| Key | Value |
|-----|-------|
| `DISCORD_TOKEN` | Tu token de Discord |
| `CLIENT_ID` | `1538744479434145812` |
| `GUILD_ID` | `1538744281211346974` |

## Paso 5: Desplegar
1. Click **"Create Web Service"**
2. Espera a que termine el build
3. ¡Tu bot estará online 24/7!

## Paso 6: Verificar
1. Ve a tu servidor de Discord
2. Escribe `/portfolio` o `/ticket`
3. El bot debería responder

## Comandos útiles en Render
- **Manual Deploy**: Click en "Manual Deploy" → "Deploy latest commit"
- **Logs**: Click en "Logs" para ver errores
- **Restart**: Click en "Restart" para reiniciar el bot

## Notas importantes
- El plan **Free** de Render apaga el servicio después de 15 minutos de inactividad
- El bot se reiniciará automáticamente cuando alguien lo use
- Si necesitas 24/7 sin interrupciones, considera el plan **Paid** ($7/mes)

## Solución de problemas
- **Bot no conecta**: Verifica que el token sea correcto
- **Errores en logs**: Revisa la pestaña "Logs" en Render
- **Bot se desconecta**: Normal en plan Free, se reinicia solo
