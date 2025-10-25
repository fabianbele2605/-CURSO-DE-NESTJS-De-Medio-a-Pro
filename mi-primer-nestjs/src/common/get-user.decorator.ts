// Importaciones para crear decoradores personalizados de parámetros
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Decorador personalizado para extraer información del usuario autenticado
// Se usa en controladores para obtener datos del usuario desde el token JWT
export const GetUser = createParamDecorator(
    // Parámetros: data = propiedad específica a extraer, ctx = contexto de ejecución
    (data: string | undefined, ctx: ExecutionContext) => {
        // Obtiene el objeto request HTTP del contexto de ejecución
        const request = ctx.switchToHttp().getRequest();
        // Extrae el usuario del request (colocado ahí por el AuthGuard JWT)
        const user = request.user;

        // Si se especifica una propiedad (data), retorna solo esa propiedad
        // Si no, retorna el objeto usuario completo
        // Ejemplo: @GetUser('id') retorna solo user.id
        // Ejemplo: @GetUser() retorna todo el objeto user
        return data ? user?.[data] : user;
    }
)
