import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ){}

    @Post('login')
    async login(@Body() loginDto: {username: string, password: string}){
        const isValid = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: loginDto.username };
    const token = this.jwtService.sign(payload);
    return { success: true, token };
    }
}
