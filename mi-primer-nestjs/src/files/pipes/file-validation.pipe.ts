// Importaciones de NestJS para crear pipes personalizados
import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

// Pipe personalizado para validar archivos subidos antes de procesarlos
@Injectable()
export class FileValidationPipe implements PipeTransform {
    // Tamaño máximo permitido para archivos (5MB en bytes)
    private readonly maxSize = 5 * 1024 * 1024; // 5MB
    // Tipos MIME permitidos para archivos de imagen
    private readonly allowedMimeTypes = [
        'image/jpeg', // Formato JPEG
        'image/jpg',  // Formato JPG (alternativo)
        'image/png',  // Formato PNG
        'image/gif'   // Formato GIF
    ];

    // Método principal del pipe que valida el archivo
    transform(file: Express.Multer.File) {
        // Verifica que se haya proporcionado un archivo
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        // Verifica que el tamaño del archivo no exceda el límite
        if (file.size > this.maxSize) {
            throw new BadRequestException('File size exceeds the maximum limit of 5MB');
        }

        // Verifica que el tipo MIME del archivo esté en la lista permitida
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
        }

        // Si todas las validaciones pasan, retorna el archivo
        return file;
    }
}