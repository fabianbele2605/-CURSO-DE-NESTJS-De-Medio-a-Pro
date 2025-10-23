import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}