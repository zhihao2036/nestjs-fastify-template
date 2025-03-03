import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { LoginPasswordDTO } from './dto/login.dto';
import { BaseCreateResponse } from 'src/common/bo/baseCreateResponse';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiResponse({
    description: 'login by password, token in response',
  })
  @Post('login-pass')
  loginByPassword(
    @Body() loginPasswordDTO: LoginPasswordDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.loginByPassword(loginPasswordDTO);
  }

  @Public()
  @ApiCreatedResponse({
    type: BaseCreateResponse,
    description: '注册用户',
  })
  @Post('register')
  register(@Body() registerDTO: RegisterDTO): Promise<BaseCreateResponse> {
    return this.authService.register(registerDTO);
  }
}
