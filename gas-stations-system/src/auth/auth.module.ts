import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret-key',
      signOptions: {expiresIn: '60m'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
