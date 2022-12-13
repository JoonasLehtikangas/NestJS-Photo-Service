import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
@ApiTags('login')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}

    // listens GET request from localhost:3000/login and check if user exists in the database
    // then validates username and password before passing the JWT token
  @Post('login')
  @ApiOperation({ summary: "Login to the application"})
  @ApiResponse({status: 200, description: "OK, login successful and token received", type: CreateUserDto})
  
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const token = this.authService.login(req.user);
    return token;
  }

}
