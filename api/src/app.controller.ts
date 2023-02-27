import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }
}
