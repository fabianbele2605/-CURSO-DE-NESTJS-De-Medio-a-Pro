// Importaciones para crear pipes personalizados de transformación y validación
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";

// Pipe personalizado para validar y transformar strings a números enteros positivos
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
    // Método que transforma y valida el valor de entrada
    transform(value: string, metadata: ArgumentMetadata): number {
        // Convierte el string a número entero en base 10
        const val = parseInt(value, 10);

        // Valida que la conversión sea exitosa (no sea NaN)
        if (isNaN(val)) {
            throw new BadRequestException(`${metadata.data} debe ser un número`);
        }

        // Valida que el número sea positivo (mayor que 0)
        if (val <= 0) {
            throw new BadRequestException(`${metadata.data} debe ser un número positivo`);
        }

        // Retorna el número validado y transformado
        return val;
    }
}