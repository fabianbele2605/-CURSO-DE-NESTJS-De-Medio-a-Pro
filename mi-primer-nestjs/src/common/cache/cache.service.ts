// Importaciones de NestJS para inyección de dependencias
import { Injectable, Inject } from "@nestjs/common";
// Token de inyección para el gestor de cache
import { CACHE_MANAGER } from "@nestjs/cache-manager";
// Interfaz del gestor de cache
import type { Cache } from "cache-manager";

// Servicio que proporciona una interfaz simplificada para operaciones de cache
@Injectable()
export class CacheService {
    // Constructor que inyecta el gestor de cache de Redis
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    // Método para obtener un valor del cache por su clave
    async get<T>(key: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(key);
    }

    // Método para almacenar un valor en el cache con TTL opcional
    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl );
    }

    // Método para eliminar un valor específico del cache
    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    // Método para limpiar todo el cache
    async reset(): Promise<void> {
        // Nota: reset no está disponible en todas las implementaciones de cache
        // await this.cacheManager.reset();
    }
    
}