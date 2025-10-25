// Importaciones de decoradores de TypeORM para entidades, relaciones y timestamps
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
// Importación de la entidad User para establecer la relación de autor
import { User } from "src/users/entities/user.entity";

// Decorador que marca esta clase como una entidad de base de datos
// El parámetro 'posts' especifica el nombre de la tabla en la BD
@Entity('posts')
export class Post {
    // Clave primaria que se genera automáticamente (auto-increment)
    @PrimaryGeneratedColumn()
    id: number;

    // Columna para almacenar el título del post
    @Column()
    title: string;

    // Columna de tipo TEXT para almacenar contenido largo del post
    @Column('text')
    content: string;

    // Timestamp que se establece automáticamente al crear el registro
    @CreateDateColumn()
    createdAt: Date;

    // Timestamp que se actualiza automáticamente cada vez que se modifica el registro
    @UpdateDateColumn()
    updatedAt: Date;

    // Relación muchos a uno: Muchos posts pueden pertenecer a un usuario
    // El primer parámetro es una función que retorna la entidad relacionada
    // El segundo parámetro especifica cómo la entidad relacionada apunta de vuelta
    @ManyToOne(() => User, user => user.posts)
    author: User; // Referencia al objeto User completo

    // Columna que almacena el ID del autor (clave foránea)
    // Se usa para optimizar consultas cuando solo necesitamos el ID
    @Column()
    authorId: number;
}