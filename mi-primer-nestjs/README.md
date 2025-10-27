# 🚀 NestJS Blog API - Curso Completo

Sistema completo de blog con NestJS implementando funcionalidades avanzadas.

## 🛠️ Tecnologías

- **NestJS 11.x** - Framework principal
- **PostgreSQL + TypeORM** - Base de datos
- **JWT + Passport** - Autenticación
- **Socket.IO** - WebSockets
- **GraphQL + Apollo** - API alternativa
- **Multer** - File upload
- **Cache Manager** - Caching
- **Jest** - Testing

## 📦 Instalación

```bash
npm install
cp .env.example .env
npm run start:dev
```

## 🔧 Variables de Entorno

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestjs_curso
JWT_SECRET=tu_jwt_secret
```

## 📡 Endpoints

### REST API
- `POST /auth/login` - Login
- `GET /users` - Usuarios (protegido)
- `GET /posts` - Posts
- `POST /files/upload/avatar` - Upload avatar (protegido)
- `GET /external-apis/weather/:city` - Clima (protegido)

### GraphQL
- Playground: `http://localhost:3000/graphql`

### WebSocket
- Chat: `ws://localhost:3000`

## 🧪 Testing

```bash
npm run test        # Todos los tests
npm run test:cov    # Con cobertura
```

**Resultados**: 13 suites, 29 tests ✅

## 🏗️ Módulos

- **Auth** - Autenticación JWT
- **Users** - Gestión usuarios
- **Posts** - Sistema blog
- **Files** - Upload archivos
- **Chat** - WebSocket chat
- **External APIs** - APIs externas + cache
- **GraphQL** - API GraphQL

## 🐳 Docker

```bash
npm run docker:prod
npm run docker:run
```

## 📊 Características

- ✅ Autenticación completa
- ✅ File upload con validación
- ✅ Chat tiempo real
- ✅ GraphQL + REST
- ✅ Cache inteligente
- ✅ 100% test coverage
- ✅ Documentación completa
- ✅ Docker ready

---
⭐ Proyecto educativo - NestJS de Medio a Profesional