// Importaciones de decoradores de TypeORM para definir entidades y relaciones
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// Importación de la entidad Post para establecer la relación
import { Post } from "src/posts/entities/post.entity";

// Decorador que marca esta clase como una entidad de base de datos
// El parámetro 'users' especifica el nombre de la tabla en la BD
@Entity('users')
export class User {
    // Clave primaria que se genera automáticamente (auto-increment)
    @PrimaryGeneratedColumn()
    id: number;

    // Columna simple para almacenar el nombre del usuario
    @Column()
    name: string;

    // Columna con restricción de unicidad - no puede haber emails duplicados
    @Column({ unique: true})
    email: string;

    // Columna para almacenar la edad del usuario
    @Column()
    age: number;

    // Columna para almacenar la contraseña encriptada
    @Column()
    password: string;

    // Relación uno a muchos: Un usuario puede tener muchos posts
    // El primer parámetro es una función que retorna la entidad relacionada
    // El segundo parámetro especifica cómo la entidad relacionada apunta de vuelta
    @OneToMany(() => Post, post => post.author)
    posts: Post[]; // Array de posts que pertenecen a este usuario
}