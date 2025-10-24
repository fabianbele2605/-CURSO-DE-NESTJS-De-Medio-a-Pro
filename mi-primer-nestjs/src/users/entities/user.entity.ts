import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "src/posts/entities/post.entity";

@Entity('users') // Nombre de la tabla
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    email: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];
}