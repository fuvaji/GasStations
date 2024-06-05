import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly validUsername = 'postgres';
    private readonly validPassword = '123';

    async validateUser(username: string, password: string): Promise<Boolean>{
        return username===this.validUsername && password===this.validPassword;
    }
}
