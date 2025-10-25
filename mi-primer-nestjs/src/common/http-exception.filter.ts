// Importaciones para crear filtros de excepciones personalizados
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";
// Tipos de Express para request y response
import { Request, Response } from "express";

// Decorador que especifica qué tipo de excepciones captura este filtro
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // Logger para registrar errores con el nombre de la clase
    private readonly logger = new Logger(HttpExceptionFilter.name);

    // Método que se ejecuta cuando se captura una HttpException
    catch(exception: HttpException, host: ArgumentsHost) {
        // Obtiene el contexto HTTP de la excepción
        const ctx = host.switchToHttp();
        // Extrae el objeto response de Express
        const response = ctx.getResponse<Response>();
        // Extrae el objeto request de Express
        const request = ctx.getRequest<Request>();
        // Obtiene el código de estado HTTP de la excepción
        const status = exception.getStatus();

        // Crea un objeto de respuesta de error estandarizado
        const errorResponse = {
            statusCode: status,                    // Código de estado HTTP
            timestamp: new Date().toISOString(),  // Timestamp del error
            path: request.url,                    // URL donde ocurrió el error
            method: request.method,               // Método HTTP usado
            message: exception.message || null,   // Mensaje de error
        };

        // Registra el error en los logs para debugging
        this.logger.error(`
            ${request.method} ${request.url}`,
            JSON.stringify(errorResponse),
            'HttpExceptionFilter',
        );

        // Envía la respuesta de error estandarizada al cliente
        response.status(status).json(errorResponse)
    }
}