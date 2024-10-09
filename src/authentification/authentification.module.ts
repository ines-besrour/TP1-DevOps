import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/user/entities/UserEntity';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';





dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
        secret: process.env.SECRET,
        signOptions: {
          expiresIn: 3600
        }
      })
  ],
  controllers: [
    AuthentificationController,
  ],
  providers: [AuthentificationService],
  exports: [AuthentificationService]
})
export class AuthentificationModule {}