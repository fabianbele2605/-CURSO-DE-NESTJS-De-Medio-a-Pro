// Decorador Injectable de NestJS para inyección de dependencias
import { Injectable, BadRequestException } from "@nestjs/common";
// Funciones del sistema de archivos de Node.js
import { writeFileSync, existsSync, mkdirSync } from "fs";
// Utilidades para manejo de rutas de archivos
import { join, extname } from "path";

// Servicio que maneja la lógica de negocio para la gestión de archivos
@Injectable()
export class FilesService {
    // Directorio base donde se almacenan todos los archivos subidos
    private readonly uploadPath = './uploads';

    // Constructor que inicializa el servicio y crea el directorio de uploads
    constructor() {
        this.ensureUploadDirectoryExists();
    }

    // Método privado que asegura que el directorio de uploads exista
    private ensureUploadDirectoryExists() {
        // Si el directorio no existe, lo crea recursivamente
        if (!existsSync(this.uploadPath)) {
            mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    // Método principal para guardar archivos con validación
    saveFile(file: Express.Multer.File, folder: string): string {
        // Lista de extensiones de archivo permitidas (solo imágenes)
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        // Extrae la extensión del archivo y la convierte a minúsculas
        const fileExtension = extname(file.originalname).toLowerCase();

        // Valida que la extensión del archivo esté permitida
        if (!validExtensions.includes(fileExtension)) {
            throw new BadRequestException('invalid file type');
        }

        // Genera un nombre único usando timestamp y número aleatorio
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
        // Construye la ruta completa de la carpeta destino
        const folderPath = join(this.uploadPath, folder);

        // Crea la carpeta destino si no existe
        if (!existsSync(folderPath)) {
            mkdirSync(folderPath, { recursive: true });
        }

        // Construye la ruta completa del archivo
        const filePath = join(folderPath, fileName);
        // Escribe el archivo al sistema de archivos
        writeFileSync(filePath, file.buffer);

        // Retorna la ruta relativa del archivo guardado
        return `${folder}/${fileName}`;
    }
}