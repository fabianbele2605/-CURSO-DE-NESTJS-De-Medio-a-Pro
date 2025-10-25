# 🚀 Curso NestJS: De Medio a Profesional - Proyecto Completo

## 📋 Descripción General
Proyecto educativo completo que implementa un **sistema de blog con autenticación JWT** usando NestJS, siguiendo las mejores prácticas de desarrollo backend profesional. Este proyecto abarca desde fundamentos hasta arquitectura avanzada con testing completo.

## 🎯 Objetivos del Curso
- Dominar la arquitectura modular de NestJS
- Implementar autenticación y autorización robusta
- Aplicar patrones de diseño profesionales
- Desarrollar con TypeORM y PostgreSQL
- Crear testing unitario y de integración completo
- Aplicar principios SOLID y Clean Architecture

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
- **Framework:** NestJS 11+ con TypeScript
- **Base de Datos:** PostgreSQL con TypeORM
- **Autenticación:** JWT + Passport Strategy
- **Validación:** class-validator + DTOs
- **Testing:** Jest con cobertura completa
- **Seguridad:** bcrypt + Guards + Pipes

### Principios Aplicados
- **SOLID Principles**
- **Clean Architecture**
- **Repository Pattern**
- **Dependency Injection**
- **Strategy Pattern**

## 📁 Estructura del Proyecto

```
src/
├── auth/                           # 🔐 Módulo de Autenticación
│   ├── auth.controller.ts          # Endpoints login/register
│   ├── auth.service.ts             # Lógica JWT + validación
│   ├── auth.module.ts              # Configuración Passport + JWT
│   ├── jwt.strategy.ts             # Estrategia de autenticación
│   └── *.spec.ts                   # Tests unitarios
│
├── users/                          # 👥 Módulo de Usuarios  
│   ├── users.controller.ts         # CRUD de usuarios
│   ├── users.service.ts            # Lógica de negocio + bcrypt
│   ├── users.module.ts             # Configuración del módulo
│   ├── entities/user.entity.ts     # Entidad TypeORM con relaciones
│   ├── dto/create-user.dto.ts      # Validaciones con decoradores
│   └── *.spec.ts                   # Tests unitarios
│
├── posts/                          # 📝 Módulo de Posts
│   ├── posts.controller.ts         # CRUD con autenticación requerida
│   ├── posts.service.ts            # Lógica con relaciones complejas
│   ├── posts.module.ts             # Configuración del módulo
│   ├── entities/post.entity.ts     # Entidad con timestamps automáticos
│   ├── dto/create-post.dto.ts      # Validaciones de entrada
│   └── *.spec.ts                   # Tests unitarios
│
├── common/                         # 🛠️ Utilidades Compartidas
│   ├── interceptors/
│   │   └── logging.interceptor.ts  # Logging automático de requests
│   ├── pipes/
│   │   └── parse-positive-int.pipe.ts # Validación numérica personalizada
│   ├── get-user.decorator.ts       # Decorador para extraer usuario JWT
│   └── http-exception.filter.ts    # Manejo global de errores HTTP
│
├── app.module.ts                   # 🏠 Módulo raíz con configuración BD
└── main.ts                         # 🚀 Bootstrap con pipes/filters globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos
```bash
Node.js v18+
PostgreSQL 12+
npm o yarn
```

### Pasos de Instalación
```bash
# 1. Clonar repositorio
git clone [URL-DEL-REPO]
cd mi-primer-nestjs

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos
createdb nestjs_curso

# 4. Configurar variables de entorno
cp .env.example .env
```

### Variables de Entorno (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestjs_curso

# Application Configuration  
APP_PORT=3000
APP_ENV=development

# JWT Configuration
JWT_SECRET=tu-secreto-super-seguro
JWT_EXPIRES_IN=24h
```

### Ejecutar Aplicación
```bash
# Desarrollo con hot reload
npm run start:dev

# Producción
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 🧪 Testing Completo

### Ejecutar Tests
```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests e2e
npm run test:e2e

# Tests en modo watch
npm run test:watch

# Test específico
npm run test users.service.spec.ts
```

### Cobertura Actual
- **Cobertura Total:** 100%
- **Servicios:** 100% (AuthService, UsersService, PostsService)
- **Controladores:** 100% (AuthController, UsersController, PostsController)
- **Patrones:** Mocking completo de dependencias

## 📡 API Documentation

### 🔐 Autenticación

#### Registrar Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com", 
  "age": 25,
  "password": "password123"
}

Response: 201 Created
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "age": 25
}
```

#### Iniciar Sesión
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 👥 Usuarios

#### Obtener Todos los Usuarios
```http
GET /users

Response: 200 OK
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "age": 25,
    "posts": []
  }
]
```

#### Obtener Usuario por ID
```http
GET /users/1

Response: 200 OK
{
  "id": 1,
  "name": "Juan Pérez", 
  "email": "juan@example.com",
  "age": 25,
  "posts": [...]
}
```

### 📝 Posts (Requiere Autenticación)

#### Crear Post
```http
POST /posts
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Mi Primer Post",
  "content": "Este es el contenido de mi post..."
}

Response: 201 Created
{
  "id": 1,
  "title": "Mi Primer Post",
  "content": "Este es el contenido de mi post...",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "author": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### Obtener Todos los Posts
```http
GET /posts

Response: 200 OK
[
  {
    "id": 1,
    "title": "Mi Primer Post",
    "content": "Este es el contenido...",
    "createdAt": "2024-01-15T10:30:00Z",
    "author": {
      "id": 1,
      "name": "Juan Pérez"
    }
  }
]
```

#### Obtener Posts por Autor
```http
GET /posts/author/1

Response: 200 OK
[
  {
    "id": 1,
    "title": "Mi Primer Post",
    "author": {
      "id": 1,
      "name": "Juan Pérez"
    }
  }
]
```

## 🎓 Módulos del Curso

### Módulo 1: Fundamentos de NestJS
**Conceptos:** Arquitectura modular, Inyección de dependencias, Principios SOLID
- ✅ Controladores y servicios básicos
- ✅ Decoradores y metadata
- ✅ Módulos autocontenidos

### Módulo 2: Persistencia con Base de Datos  
**Conceptos:** TypeORM, Entidades, Repositorios, Migraciones
- ✅ Configuración PostgreSQL
- ✅ Entidades con decoradores
- ✅ Repository Pattern

### Módulo 3: Autenticación y Autorización
**Conceptos:** JWT, Passport, Guards, Estrategias
- ✅ Sistema de login/register
- ✅ Encriptación con bcrypt
- ✅ Guards de protección de rutas

### Módulo 4: Relaciones y Casos Avanzados
**Conceptos:** Relaciones TypeORM, Lazy Loading, Casos de uso complejos
- ✅ Relaciones OneToMany/ManyToOne
- ✅ Consultas con joins
- ✅ Timestamps automáticos

### Módulo 5: Arquitectura y Buenas Prácticas
**Conceptos:** Interceptores, Filtros, Pipes, Testing, Documentación
- ✅ Interceptores de logging
- ✅ Filtros de excepciones globales
- ✅ Pipes de validación personalizados
- ✅ Testing unitario completo
- ✅ Documentación profesional

## 🔧 Características Técnicas Avanzadas

### Seguridad Implementada
- ✅ **Contraseñas encriptadas** con bcrypt (salt rounds: 10)
- ✅ **JWT con expiración** configurable
- ✅ **Guards de autenticación** en rutas protegidas
- ✅ **Validación robusta** con DTOs y class-validator
- ✅ **Sanitización de datos** automática

### Manejo de Errores
- ✅ **Filtro global** de excepciones HTTP
- ✅ **Respuestas estandarizadas** con timestamp y detalles
- ✅ **Logging automático** de errores para debugging
- ✅ **Validación de entrada** con mensajes descriptivos

### Performance y Monitoring
- ✅ **Logging de requests** con tiempo de respuesta
- ✅ **Interceptores no intrusivos** para métricas
- ✅ **Validación eficiente** con pipes optimizados

### Base de Datos
- ✅ **Relaciones optimizadas** con lazy loading
- ✅ **Timestamps automáticos** (createdAt, updatedAt)
- ✅ **Migraciones automáticas** en desarrollo
- ✅ **Consultas tipadas** con TypeORM

## 🧩 Patrones de Diseño Implementados

### Repository Pattern
```typescript
// Abstracción de acceso a datos
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
}
```

### Strategy Pattern (Passport)
```typescript
// Estrategia intercambiable de autenticación
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
```

### Decorator Pattern
```typescript
// Decorador personalizado para extraer usuario
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  }
);
```

## 🚀 Próximos Pasos y Extensiones

### Funcionalidades Sugeridas
- [ ] Paginación en endpoints de listado
- [ ] Sistema de roles y permisos granulares
- [ ] Upload de archivos e imágenes
- [ ] Cache con Redis
- [ ] Rate limiting
- [ ] Documentación con Swagger/OpenAPI
- [ ] Logs estructurados con Winston
- [ ] Métricas con Prometheus
- [ ] Containerización con Docker

### Mejoras de Arquitectura
- [ ] CQRS Pattern
- [ ] Event Sourcing
- [ ] Microservicios con NestJS
- [ ] GraphQL API
- [ ] WebSockets para tiempo real

## 🤝 Contribución y Desarrollo

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
test: tests
refactor: refactoring de código
```

### Flujo de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📚 Recursos Adicionales

### Documentación Oficial
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Passport.js Documentation](http://www.passportjs.org/)

### Conceptos Clave
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

## 📄 Licencia
MIT License - Ver archivo LICENSE para más detalles.

---

## 🎯 Resumen del Proyecto

Este proyecto representa un **curso completo de NestJS nivel intermedio a profesional**, implementando:

- ✅ **Arquitectura escalable** con módulos independientes
- ✅ **Seguridad robusta** con JWT y encriptación
- ✅ **Base de datos relacional** con TypeORM
- ✅ **Testing completo** con 100% de cobertura
- ✅ **Código documentado** siguiendo estándares profesionales
- ✅ **Buenas prácticas** de desarrollo backend

**Ideal para desarrolladores que buscan dominar NestJS y aplicar patrones profesionales en proyectos reales.**

---
**Desarrollado como parte del Curso NestJS: De Medio a Profesional** 🎓  
**Estado: Completado con éxito** ✅  
**Cobertura de Tests: 100%** 🧪  
**Documentación: Completa** 📚