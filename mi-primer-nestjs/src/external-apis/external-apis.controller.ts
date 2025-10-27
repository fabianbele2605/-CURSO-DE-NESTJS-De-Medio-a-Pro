// Importaciones de decoradores de NestJS para controladores
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
// Guard de autenticación JWT
import { AuthGuard } from '@nestjs/passport';
// Servicio que maneja la lógica de integración con APIs externas
import { ExternalApisService, WeatherData, QuoteData } from './external-apis.service';

// Controlador que maneja las rutas HTTP para integración con APIs externas
// Todas las rutas requieren autenticación JWT
@Controller('external-apis')
@UseGuards(AuthGuard('jwt'))
export class ExternalApisController {
    // Constructor que inyecta el servicio de APIs externas
    constructor(private readonly externalApisService: ExternalApisService) {}

    // Endpoint para obtener información del clima de una ciudad específica
    @Get('weather/:city')
    async getWeather(@Param('city') city: string): Promise<WeatherData> {
        return this.externalApisService.getWeather(city);
    }

    // Endpoint para obtener una cita aleatoria
    @Get('quote')
    async getRandomQuote(): Promise<QuoteData> {
        return this.externalApisService.getRandomQuote();
    }

    // Endpoint para obtener información de un país por su código
    @Get('country/:countryCode')
    async getCountryInfo(@Param('countryCode') countryCode: string) {
        return this.externalApisService.getCountryInfo(countryCode);
    }
}
