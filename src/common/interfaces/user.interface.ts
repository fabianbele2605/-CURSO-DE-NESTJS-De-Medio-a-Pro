export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IUserService {
    findAll(): IUser[];
    findById(id: number): IUser | null;
}

