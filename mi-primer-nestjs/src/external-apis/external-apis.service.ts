// Importaciones de NestJS para servicios y manejo de errores
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// Servicio HTTP de NestJS basado en Axios
import { HttpService } from '@nestjs/axios';
// Utilidad de RxJS para convertir Observables a Promises
import { firstValueFrom } from 'rxjs';
// Decorador para inyección de dependencias
import { Inject } from '@nestjs/common';
// Token de inyección para el gestor de cache
import { CACHE_MANAGER } from '@nestjs/cache-manager';
// Interfaz del gestor de cache
import type { Cache } from 'cache-manager';

// Interfaz que define la estructura de datos del clima
export interface WeatherData {
    location: string,     // Nombre de la ciudad
    temperature: number,  // Temperatura en grados Celsius
    description: string,  // Descripción del clima
    humidity: number,     // Porcentaje de humedad
    windSpeed: number     // Velocidad del viento
}

// Interfaz que define la estructura de datos de una cita
export interface QuoteData {
    text: string,      // Texto de la cita
    author: string,    // Autor de la cita
    category: string,  // Categoría de la cita
}

// Servicio que maneja integraciones con APIs externas y caching
@Injectable()
export class ExternalApisService {
    // Constructor que inyecta el servicio HTTP y el gestor de cache
    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    // Método para obtener información del clima con caching
    async getWeather(city: string): Promise<WeatherData> {
        // Genera clave de cache única para la ciudad
        const cacheKey = `weather-${city.toLowerCase()}`;

        // Intenta obtener datos del cache primero
        const cacheData = await this.cacheManager.get<WeatherData>(cacheKey);
            if (cacheData) {
                return cacheData; // Retorna datos cacheados si existen
            }
        try{
            // Configuración de la API de OpenWeatherMap
            const apiKey = process.env.OPENWEATHER_API_KEY || 'ApiKey';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            
            // Realiza la petición HTTP y convierte Observable a Promise
            const response = await firstValueFrom(
                this.httpService.get(url)
            );

            // Mapea la respuesta de la API al formato interno
            const weatherData = {
                location: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed
            };

            // Guarda en cache por 10 minutos (600 segundos)
            await this.cacheManager.set(cacheKey, weatherData, 600);

            return weatherData;
            } catch (error) {
                // Lanza excepción HTTP en caso de error
                throw new HttpException(
                    'Failed to fetch weather data', 
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        // Método para obtener una cita aleatoria con caching
        async getRandomQuote(): Promise<QuoteData> {
            // Clave de cache fija para citas aleatorias
            const cacheKey = 'random-quote';

            // Intenta obtener cita del cache (TTL corto para variedad)
            const cacheData = await this.cacheManager.get<QuoteData>(cacheKey);
            if (cacheData) {
                return cacheData; // Retorna cita cacheada si existe
            }

            try {
                // URL de la API pública de citas de Quotable
                const url = 'https://api.quotable.io/random';

                // Realiza la petición HTTP
                const response = await firstValueFrom(
                    this.httpService.get(url)
                );

                // Mapea la respuesta al formato interno
                const quoteData = {
                    text: response.data.content,
                    author: response.data.author,
                    category: response.data.tags[0] || 'general', // Usa primera etiqueta o 'general'
                };

                // Guarda en cache por 1 minuto (60 segundos) para permitir variedad
                await this.cacheManager.set(cacheKey, quoteData, 60);

                return quoteData;
            } catch (error) {
                // Lanza excepción HTTP en caso de error
                throw new HttpException(
                    'Failed to fetch quote data',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        // Método para obtener información de países con caching
        async getCountryInfo(countryCode: string): Promise<any> {
            // Genera clave de cache única para el código de país
            const cacheKey = `country-${countryCode.toLowerCase()}`;

            // Intenta obtener datos del cache (TTL largo porque los datos de países cambian raramente)
            const cacheData = await this.cacheManager.get<any>(cacheKey);
            if (cacheData) {
                return cacheData; // Retorna datos cacheados si existen
            }

            try {
                // URL de la API REST Countries usando código alfa del país
                const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

                // Realiza la petición HTTP
                const response = await firstValueFrom(
                    this.httpService.get(url)
                );

                // Extrae el primer país de la respuesta (debería ser único)
                const country = response.data[0];
                // Mapea la respuesta al formato interno
                const countryData = {
                    name: country.name.common,        // Nombre común del país
                    capital: country.capital?.[0],    // Primera capital (algunos países tienen múltiples)
                    population: country.population,   // Población total
                    region: country.region,           // Región geográfica
                    flag: country.flags.png,          // URL de la bandera en formato PNG
                };

                // Guarda en cache por 1 hora (3600 segundos) - datos estáticos
                await this.cacheManager.set(cacheKey, countryData, 3600);

                return countryData;
            } catch (error) {
                // Lanza excepción HTTP en caso de error
                throw new HttpException(
                    'Failed to fetch country data',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
}
