# 🎓 B2 English Coach · DoncelProject

Aplicación de aprendizaje de inglés nivel B2 con IA integrada. 16 semanas de contenido estructurado con temas de sanidad, autocaravana y uso general.

## Stack
- React 18 + Vite
- Web Speech API (audio y reconocimiento de voz)
- Claude API (feedback, escenarios, conversación)
- localStorage (progreso persistente)

## Funcionalidades por semana
- 📜 20 frases clave con audio
- 📖 15 palabras con flashcards y audio
- 📐 5 reglas de gramática explicadas en español
- 🎙 Práctica oral con feedback de IA
- 🎭 Simulación de escenarios reales
- 💬 Conversación libre con corrección suave
- ✅ Mini examen con puntuación guardada

## Instalación local
```bash
npm install
npm run dev
```

## Despliegue en Netlify
1. Conecta este repositorio en Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

O arrastra la carpeta `dist` tras hacer `npm run build` al dashboard de Netlify.

## Nota sobre la API
La app usa `https://api.anthropic.com/v1/messages` directamente desde el cliente.
Esto funciona en el entorno Claude.ai. Para despliegue público independiente,
necesitarás un backend proxy que gestione la API key de forma segura.

---
Desarrollado por DoncelProject · doncel.project@gmail.com
