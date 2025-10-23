import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Post('register') 
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: 
        { email: string; 
          password: string;
        }) {
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            if (!user) {
                throw new UnauthorizedException('Credenciales incorrecta!');
            }
            return this.authService.login(user);
        }


}
