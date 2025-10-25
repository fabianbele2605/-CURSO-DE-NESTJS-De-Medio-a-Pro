// Importaciones para crear interceptores personalizados
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
// Observable de RxJS para manejar streams asíncronos
import { Observable } from "rxjs";
// Operador tap de RxJS para efectos secundarios sin modificar el stream
import { tap } from "rxjs/operators";

// Interceptor para registrar información de todas las peticiones HTTP
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    // Logger para registrar información con el nombre de la clase
    private readonly logger = new Logger(LoggingInterceptor.name);

    // Método que se ejecuta antes y después de cada petición HTTP
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Extrae información del request HTTP
        const request = context.switchToHttp().getRequest();
        const method = request.method;  // Método HTTP (GET, POST, etc.)
        const url = request.url;        // URL de la petición
        const now = Date.now();         // Timestamp de inicio para medir duración

        // Continúa con la ejecución del handler y aplica logging al finalizar
        return next.handle().pipe(
            // tap ejecuta código sin modificar la respuesta
            tap(() => {
                // Extrae información del response HTTP
                const response = context.switchToHttp().getResponse();
                const delay = Date.now() - now; // Calcula el tiempo de respuesta
                
                // Registra información completa de la petición: método, URL, status y tiempo
                this.logger.log(`[${method}] ${url} ${response.statusCode} ${delay}ms`);
            })
        )
    }
}