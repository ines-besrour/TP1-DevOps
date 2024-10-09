import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserSubscribeDto } from '../authentification/dto/user-subscribe.dto';
import { LoginCredentialsDto } from '../authentification/dto/login-credientials.dto';
import { AuthentificationService } from './authentification.service';


@Controller('subscribe')
export class AuthentificationController {
  constructor(
    private authentificationService: AuthentificationService
  ) {
  }
  
  @Post()
  register(
    @Body() userData: UserSubscribeDto
  ) {
    return this.authentificationService.register(userData);
  }

  
  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.authentificationService.login(credentials);
  }

}
