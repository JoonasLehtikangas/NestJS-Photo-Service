import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const token = this.authService.login(req.user);
    return token;
    // return await this.authService.validateUser(req.body.username, req.body.password);
  }

}
