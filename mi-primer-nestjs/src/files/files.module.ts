// Decorador Module de NestJS para definir módulos
import { Module } from "@nestjs/common";
// Servicio que maneja la lógica de negocio de archivos
import { FilesService } from "./files.service";
// Controlador que maneja las rutas HTTP de archivos
import { FilesController } from "./files.controller";

// Módulo que encapsula toda la funcionalidad de gestión de archivos
@Module({
    controllers: [FilesController], // Controladores que pertenecen a este módulo
    providers: [FilesService],      // Servicios que pertenecen a este módulo
    exports: [FilesService]         // Servicios que otros módulos pueden importar y usar
})

export class FilesModule {}