
# 🚀 CURSO DE NESTJS: De Medio a Pro

## 🧠 Requisitos previos
Antes de comenzar, asegúrate de:
- Conocer **JavaScript/TypeScript** básico-intermedio.
- Tener experiencia con **Node.js y Express**.
- Tener instalado:
  - Node.js v18+
  - npm o yarn
  - PostgreSQL o MySQL (según tus preferencias)
  - Postman o Insomnia

---

## 📘 MÓDULO 1: Fundamentos de NestJS

### 🎯 Objetivo
Entender la estructura del framework, crear tu primer proyecto y comprender sus principios (Inyección de dependencias, modularidad y arquitectura MVC).

#### Temas
1. ¿Qué es NestJS y por qué usarlo?
2. Instalación del CLI de NestJS  
   ```bash
   npm i -g @nestjs/cli
   nest new mi-proyecto
   ```
3. Estructura del proyecto (`main.ts`, `app.module.ts`, `controllers`, `services`)
4. Creación de un **módulo**, **controlador** y **servicio**  
   ```bash
   nest g module users
   nest g controller users
   nest g service users
   ```
5. Tipado con **DTOs** y **TypeScript interfaces**
6. Validaciones con `class-validator` y `class-transformer`

🧩 **Mini proyecto:** API de usuarios básica con CRUD.

---

## 🧱 MÓDULO 2: Persistencia con Base de Datos

### 🎯 Objetivo
Aprender a conectar NestJS con una base de datos y usar ORM.

#### Temas
1. Configuración de **TypeORM** o **Prisma** (usaremos TypeORM primero)
   ```bash
   npm install --save @nestjs/typeorm typeorm pg
   ```
2. Creación de entidades (`UserEntity`)
3. Repositorios y consultas
4. Relaciones (OneToMany, ManyToMany)
5. Migraciones automáticas
6. Uso de `ConfigModule` para variables de entorno (.env)

🧩 **Mini proyecto:** Añadir persistencia al CRUD de usuarios.

---

## 🔐 MÓDULO 3: Autenticación y Autorización

### 🎯 Objetivo
Implementar seguridad con JWT y Guards personalizados.

#### Temas
1. Instalación y configuración de `@nestjs/passport` y `@nestjs/jwt`
2. Login y registro con hashing (bcrypt)
3. Creación de un **AuthGuard** personalizado
4. Protección de rutas con `@UseGuards()`
5. Roles y permisos con decoradores (`@Roles()`, `@SetMetadata()`)

🧩 **Mini proyecto:** Sistema de autenticación con login/register y roles.

---

## 🧩 MÓDULO 4: Relaciones y Casos de Uso Avanzados

### 🎯 Objetivo
Conectar varios módulos y manejar lógica de negocio compleja.

#### Temas
1. Relaciones entre módulos (por ejemplo, `Users` ↔ `Posts`)
2. Lazy loading y `relations` en TypeORM
3. Controladores y servicios interconectados
4. Patrón Repository y Service Layer
5. Pipes personalizados
6. Filtros de excepciones globales (`@Catch()`)

🧩 **Mini proyecto:** Blog con usuarios y publicaciones (posts + comentarios).

---

## 🧰 MÓDULO 5: Arquitectura y Buenas Prácticas

### 🎯 Objetivo
Estructurar proyectos escalables con buenas prácticas.

#### Temas
1. Modularización avanzada
2. Uso de `ConfigService` y entornos (dev, prod, test)
3. Patrón **Domain Driven Design (DDD)** en NestJS
4. Introducción a CQRS (Command Query Responsibility Segregation)
5. Logs, interceptores y middlewares

🧩 **Mini proyecto:** Refactor del blog con arquitectura limpia.

---

## 🧪 MÓDULO 6: Testing

### 🎯 Objetivo
Aprender a probar controladores, servicios y módulos.

#### Temas
1. Pruebas unitarias con `Jest`
2. Mocking de dependencias
3. Pruebas e2e con `Supertest`
4. Cobertura y CI

🧩 **Mini proyecto:** Pruebas unitarias para el módulo de usuarios y auth.

---

## 🌐 MÓDULO 7: Deploy y DevOps

### 🎯 Objetivo
Aprender a llevar tu app NestJS a producción.

#### Temas
1. Variables de entorno y configuración de producción
2. Build optimizado (`npm run build`)
3. Deploy en:
   - Render
   - Railway
   - Docker
4. Monitoreo y logs (Winston, Sentry)

🧩 **Mini proyecto:** Deploy del blog con Docker + PostgreSQL.

---

## 🧠 MÓDULO 8: Integraciones y APIs Avanzadas

### 🎯 Objetivo
Ampliar tu proyecto con APIs y microservicios.

#### Temas
1. Subir y servir archivos (FileUploadModule)
2. Integrar APIs externas (ej: Stripe, OpenAI)
3. WebSockets y Gateways en tiempo real
4. Microservicios con Redis o RabbitMQ
5. GraphQL con `@nestjs/graphql`

🧩 **Mini proyecto:** Notificaciones en tiempo real + integración con API externa.
