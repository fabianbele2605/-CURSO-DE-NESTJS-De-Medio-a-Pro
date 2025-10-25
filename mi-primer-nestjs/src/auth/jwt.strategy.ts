// Decorador Injectable de NestJS
import { Injectable } from "@nestjs/common";
// Clase base para crear estrategias de Passport en NestJS
import { PassportStrategy } from "@nestjs/passport";
// Utilidades y estrategia JWT de passport-jwt
import { ExtractJwt, Strategy } from "passport-jwt";

// Estrategia JWT personalizada para validar tokens en requests autenticados
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Constructor que configura la estrategia JWT
    constructor() {
        super({
            // Especifica cómo extraer el JWT del request (desde el header Authorization como Bearer token)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // No ignora la expiración del token (tokens expirados serán rechazados)
            ignoreExpiration: false,
            // Clave secreta para verificar la firma del token
            secretOrKey: process.env.JWT_SECRET || 'cristianoronaldosiuu'
        })
    }

    // Método que se ejecuta cuando el token es válido
    // El payload contiene la información decodificada del JWT
    async validate(payload: any) {
        // Retorna el objeto usuario que se adjuntará al request
        // 'sub' es el estándar JWT para el ID del usuario
        return { id: payload.sub, email: payload.email }
    }
}