# Usar imagen oficial de Node.js como imagen base
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm ci && npm cache clean --force

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación NestJS
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar package.json y instalar solo dependencias de producción
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar build desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Crear usuario no-root por seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Cambiar ownership de archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer el Puerto
EXPOSE 3000

# Comando para ejecutar la aplicacion
CMD [ "node", "dist/main" ]