// Importaciones de decoradores de NestJS para controladores
import { 
    Controller,        // Decorador para definir controladores
    Post,             // Decorador para endpoints POST
    UseInterceptors,  // Decorador para aplicar interceptors
    UploadedFile,     // Decorador para extraer archivos subidos
    UseGuards,        // Decorador para aplicar guards de autenticación
    Get,              // Decorador para endpoints GET
    Param,            // Decorador para extraer parámetros de ruta
    Res,              // Decorador para acceder al objeto Response
    BadRequestException // Excepción para errores de petición
} from "@nestjs/common";
// Interceptor de NestJS para manejar archivos con Multer
import { FileInterceptor } from "@nestjs/platform-express";
// Guard de autenticación JWT
import { AuthGuard } from "@nestjs/passport";
// Servicio que maneja la lógica de negocio de archivos
import { FilesService } from "./files.service";
// Tipo Response de Express
import type { Response } from "express";
// Utilidad para construir rutas de archivos
import { join } from "path";
// Pipe personalizado para validar archivos
import { FileValidationPipe } from "./pipes/file-validation.pipe";

// Controlador que maneja las rutas HTTP para la gestión de archivos
// Todas las rutas requieren autenticación JWT
@Controller('files')
@UseGuards(AuthGuard('jwt'))
export class FilesController {
    // Constructor que inyecta el servicio de archivos
    constructor(private readonly filesService: FilesService) {}

    // Endpoint para subir avatares de usuario
    @Post('upload/avatar')
    @UseInterceptors(FileInterceptor('file')) // Intercepta archivos con nombre 'file'
    uploadAvatar(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
        // Guarda el archivo en la carpeta 'avatars'
        const filePath = this.filesService.saveFile(file, 'avatars');
        return { message: 'Avatar uploaded successfully', filePath};
    }

    // Endpoint para subir imágenes de posts
    @Post('upload/post-image')
    @UseInterceptors(FileInterceptor('file')) // Intercepta archivos con nombre 'file'
    uploadPostImage(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
        // Guarda el archivo en la carpeta 'posts'
        const filePath = this.filesService.saveFile(file, 'posts');
        return { message: 'Post image uploaded successfully', filePath};
    }
    
    // Endpoint para servir archivos estáticos
    @Get(':folder/:filename')
    getFile(@Param('folder') folder: string, @Param('filename') filename: string, @Res() res: Response) {
        // Construye la ruta completa del archivo
        const filePath = join(process.cwd(), 'uploads', folder, filename);
        // Envía el archivo como respuesta
        return res.sendFile(filePath);
    }
}