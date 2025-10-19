# 🧠 Curso de NestJS — Nivel Intermedio a Profesional  
**Base de datos:** PostgreSQL  
**Proyecto Final:** Sistema de Reservas Profesional  
**Objetivo:** Dominar NestJS desde los fundamentos arquitectónicos hasta prácticas profesionales de despliegue, seguridad, testing y microservicios.

---

## 📘 Introducción al Curso

NestJS es un framework progresivo para construir aplicaciones del lado del servidor con Node.js.  
Su arquitectura modular, su enfoque en TypeScript y su adherencia a principios SOLID lo convierten en una herramienta ideal para desarrollar proyectos escalables, mantenibles y profesionales.

En este curso aprenderás no solo a usar NestJS, sino a **pensar como un arquitecto backend**, aplicando **patrones de diseño, principios SOLID, DDD y buenas prácticas**.

---

## 🏗️ MÓDULO 1 – Fundamentos Profesionales de NestJS

### Objetivo
Comprender cómo funciona NestJS internamente y cómo su arquitectura impulsa la escalabilidad y mantenibilidad.

### Temas
- Concepto de **arquitectura modular**.
- Ciclo de vida de una aplicación NestJS.
- Estructura base de carpetas y organización del proyecto.
- Rol de los controladores, servicios, módulos y decoradores.
- Principios **SOLID** y cómo Nest los implementa.
- Uso de inyección de dependencias y su importancia.

### Buenas prácticas
- Mantener cada módulo independiente y autocontenido.  
- Evitar lógica en controladores (solo deben orquestar servicios).  
- Nombrar de forma consistente las clases y archivos.  
- Aplicar el principio de responsabilidad única en cada componente.

---

## ⚙️ MÓDULO 2 – Inyección de Dependencias y Configuración Global

### Objetivo
Dominar el sistema de inyección de dependencias (DI) y la configuración global de la aplicación.

### Temas
- Concepto de **providers** y ciclo de vida de los servicios.  
- Alcance de los servicios: `default`, `request`, `transient`.  
- Configuración global con variables de entorno.  
- Separación de entornos (desarrollo, producción, pruebas).  
- Creación de servicios reutilizables y modulares.

### Buenas prácticas
- Centralizar la configuración en un módulo global (`ConfigModule`).  
- Nunca exponer claves ni contraseñas en el código fuente.  
- Definir interfaces para los servicios críticos (desacoplamiento).  
- Mantener los valores configurables en `.env` y documentarlos.

---

## 🧩 MÓDULO 3 – Arquitectura Limpia y Conexión con PostgreSQL

### Objetivo
Aplicar principios de **Arquitectura Limpia (Clean Architecture)** y **Domain-Driven Design (DDD)** usando TypeORM con PostgreSQL.

### Temas
- Separación en capas: dominio, aplicación e infraestructura.  
- Concepto de entidades, DTOs y repositorios.  
- Patrón **Repository** y ventajas frente a consultas directas.  
- Mapear entidades de dominio con la base de datos.  
- Relaciones entre modelos: uno a muchos, muchos a muchos.  
- Estrategias de migración y sincronización.

### Buenas prácticas
- No exponer directamente las entidades en las respuestas HTTP.  
- Mantener los DTOs como contratos de comunicación.  
- Definir interfaces para los repositorios.  
- Desacoplar la lógica de negocio de la capa de infraestructura.

---

## 🔐 MÓDULO 4 – Autenticación y Autorización Profesional

### Objetivo
Aprender a implementar autenticación y autorización seguras basadas en JWT y roles de usuario.

### Temas
- Fundamentos de **JWT (JSON Web Tokens)**.  
- Diferencia entre autenticación y autorización.  
- Estrategias de autenticación: local y JWT.  
- Implementación de roles y permisos.  
- Control de acceso basado en guardias y decoradores personalizados.  
- Tokens de acceso y de refresco.

### Buenas prácticas
- Cifrar siempre las contraseñas antes de almacenarlas.  
- No incluir datos sensibles dentro del token.  
- Establecer tiempos de expiración razonables para los JWT.  
- Usar `Guards` para validar roles o permisos en las rutas.  
- Implementar un sistema de revocación de tokens (lista negra o expiración anticipada).

---

## 🌐 MÓDULO 5 – Validación, Transformación y Manejo de Errores

### Objetivo
Gestionar correctamente los datos de entrada y salida, aplicando validación, transformación y manejo uniforme de errores.

### Temas
- Validación de DTOs y sanitización de datos.  
- Pipes globales para transformar y validar automáticamente.  
- Filtros de excepciones (`Exception Filters`) para control centralizado de errores.  
- Interceptores para medir tiempos o modificar respuestas.  
- Middleware para control de flujos.

### Buenas prácticas
- Implementar un filtro global de excepciones para respuestas coherentes.  
- Validar todos los datos que ingresan al sistema.  
- Utilizar DTOs en todos los controladores.  
- Evitar exponer mensajes técnicos de error en producción.  
- Registrar todos los errores críticos.

---

## 🧠 MÓDULO 6 – Microservicios y Comunicación Asíncrona

### Objetivo
Comprender cómo dividir la aplicación en microservicios que se comuniquen mediante eventos o mensajería.

### Temas
- Introducción a microservicios y beneficios frente a la arquitectura monolítica.  
- Protocolos compatibles en NestJS: TCP, Redis, RabbitMQ, Kafka, gRPC.  
- Enrutamiento de mensajes y patrones de publicación/suscripción.  
- Diseño de un microservicio de notificaciones.  
- Comunicación entre módulos mediante eventos internos.

### Buenas prácticas
- Mantener los microservicios independientes y desplegables por separado.  
- Centralizar los contratos de comunicación (DTOs compartidos).  
- Implementar patrones de resiliencia (reintentos, timeouts).  
- Usar logs estructurados entre servicios.  
- Documentar los eventos emitidos y escuchados.

---

## 🧪 MÓDULO 7 – Testing y Calidad del Código

### Objetivo
Aprender a aplicar pruebas unitarias, de integración y end-to-end en proyectos NestJS.

### Temas
- Pruebas unitarias con Jest.  
- Mocks y spies para servicios y dependencias.  
- Pruebas de integración con módulos reales.  
- Estrategia de pruebas end-to-end (e2e).  
- Medición de cobertura de pruebas.  
- Enfoque TDD (Test Driven Development).

### Buenas prácticas
- Mantener una cobertura mínima del 80 %.  
- Probar la lógica crítica y flujos de negocio, no solo endpoints.  
- Usar mocks controlados para dependencias externas.  
- Automatizar las pruebas en CI/CD.  
- Documentar los casos de prueba más relevantes.

---

## 🧰 MÓDULO 8 – Seguridad y Buenas Prácticas Avanzadas

### Objetivo
Proteger la aplicación contra ataques comunes y fortalecer su estructura interna.

### Temas
- Seguridad HTTP: Helmet, CORS, rate limiting.  
- Prevención de inyección SQL y XSS.  
- Sanitización y serialización de respuestas.  
- Control de logs y auditorías.  
- Mecanismos de trazabilidad y monitoreo.  
- Versionado de API.

### Buenas prácticas
- No revelar información de stack en los encabezados HTTP.  
- Limitar el número de solicitudes por usuario o IP.  
- Registrar todas las operaciones administrativas.  
- Mantener una política de contraseñas y expiración de tokens.  
- Versionar la API para evitar rupturas entre clientes.

---

## 🚀 MÓDULO 9 – Despliegue, Docker y CI/CD

### Objetivo
Implementar prácticas profesionales de despliegue, automatización y escalabilidad.

### Temas
- Contenerización con Docker y Docker Compose.  
- Configuración de entornos para producción.  
- Integración continua (CI) y entrega continua (CD).  
- Logs centralizados y monitoreo.  
- Despliegue en plataformas como Render, Railway o AWS.  
- Estrategias de rollback y backups.

### Buenas prácticas
- Mantener archivos `.env` separados por entorno.  
- Nunca incluir variables de entorno en el repositorio.  
- Versionar los scripts de despliegue.  
- Automatizar los test previos al deploy.  
- Utilizar imágenes livianas y actualizadas.

---

## 🧩 MÓDULO 10 – Proyecto Final: Sistema de Reservas Profesional

### Objetivo
Aplicar todos los conceptos aprendidos para construir un sistema modular, escalable y seguro.

### Componentes principales
- **Módulo Usuarios:** registro, autenticación y roles.  
- **Módulo Reservas:** creación, modificación y gestión de citas.  
- **Módulo Servicios:** catálogo de servicios disponibles.  
- **Módulo Notificaciones:** microservicio con Redis o eventos.  
- **Módulo Administración:** control de usuarios, reportes y auditorías.

### Funcionalidades clave
- Autenticación JWT con roles (admin, cliente).  
- Validación y control de reservas por disponibilidad.  
- Notificaciones automáticas.  
- Logging y manejo centralizado de errores.  
- Documentación con Swagger.

### Buenas prácticas finales
- Dividir el proyecto en dominios y submódulos.  
- Aplicar principios SOLID y DDD.  
- Mantener contratos estables entre módulos.  
- Automatizar pruebas antes de cada despliegue.  
- Revisar métricas de rendimiento y optimización.

---

## 🏁 Conclusión

Este curso te lleva de nivel intermedio a profesional, combinando teoría sólida con buenas prácticas de arquitectura, seguridad y escalabilidad.  
Al dominar estos conceptos podrás diseñar, mantener y escalar proyectos NestJS de nivel empresarial, con una base sólida y sostenible.

> 💡 **Recomendación:** Acompaña este documento con prácticas guiadas y lectura del repositorio oficial de NestJS, su documentación y ejemplos en TypeORM y Docker.

---

**Fin del curso — NestJS Intermedio a Profesional**  
📚 *Creado para desarrolladores que buscan construir software backend profesional, modular y escalable.*
