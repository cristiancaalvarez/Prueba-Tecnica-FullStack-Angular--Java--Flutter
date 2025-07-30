# ⚡ COMANDOS RÁPIDOS PARA LA PRESENTACIÓN

## 🚀 Comandos Esenciales

### Iniciar la aplicación
```bash
cd "c:\Users\jhomy\Downloads\PRUEBA TECNICA CRISTIAN CAMILO AYA\Frontend\cat-app"
npm start
```

### Si hay problemas
```bash
# Limpiar e instalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Puerto alternativo
ng serve --port 4201

# Build de desarrollo
ng build --configuration development
```

---

## 🎯 URLs Importantes

- **Aplicación Local**: `http://localhost:4200`
- **TheCatAPI**: `https://api.thecatapi.com/v1/breeds`
- **Bootstrap Icons**: `https://icons.getbootstrap.com/`

---

## 📊 Datos de Demo

### Usuario de Prueba
```
Usuario: demo_user
Email: demo@catapp.com
Contraseña: Demo123!
Nombre: Demo
Apellido: User
```

### Razas Recomendadas para Demo
- **Bengal** - Exóticas, muy visuales
- **Persian** - Conocidas, mucha info
- **Maine Coon** - Grandes, interesantes
- **Sphynx** - Únicas, sin pelo
- **Siamese** - Clásicas, elegantes

---

## 🔍 Verificaciones Rápidas

### Antes de Empezar
```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Angular CLI (opcional)
ng version

# Verificar puerto libre
netstat -an | findstr :4200
```

### Durante la Demo
- Abrir DevTools (F12)
- Activar Responsive Design (Ctrl+Shift+M)
- Verificar Network tab para API calls

---

## 🎨 Breakpoints para Responsive Demo

### Desktop
```
Ancho: 1920px
Mostrar: Navbar completa, dual view side-by-side
```

### Tablet
```
Ancho: 768px
Mostrar: Navbar colapsada, vistas apiladas
```

### Mobile
```
Ancho: 375px
Mostrar: Diseño compacto, navegación optimizada
```

---

## 🐛 Solución Rápida de Errores

### Error: "Puerto 4200 en uso"
```bash
ng serve --port 4201
```

### Error: "Cannot find module"
```bash
npm install
```

### Error: "API no responde"
- Verificar internet
- Comprobar: `https://api.thecatapi.com/v1/breeds`

### Error: "Angular CLI not found"
```bash
npm install -g @angular/cli
```

---

## 📱 Dispositivos para Probar (Chrome DevTools)

1. **iPhone SE** (375x667) - Mobile
2. **iPad** (768x1024) - Tablet  
3. **Desktop** (1920x1080) - Full
4. **Galaxy S20** (360x800) - Android

---

## ⌨️ Atajos de Teclado Útiles

### Chrome DevTools
- **F12** - Abrir/cerrar DevTools
- **Ctrl+Shift+M** - Toggle responsive mode
- **Ctrl+Shift+C** - Element selector
- **Ctrl+R** - Reload page

### VS Code
- **Ctrl+Shift+P** - Command palette
- **Ctrl+`** - Toggle terminal
- **Ctrl+Shift+E** - Explorer panel

---

## 🎬 Secuencia de Demo Optimizada

1. **Mostrar código** (VS Code - 1 min)
2. **Iniciar app** (`npm start` - 30 seg)
3. **Demo desktop** (5 min)
4. **Demo responsive** (2 min)
5. **Mostrar arquitectura** (2 min)

Total: ~10 minutos

---

**¡Todo listo para una presentación exitosa! 🌟**
