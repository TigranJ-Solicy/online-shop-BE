import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findOne(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }

  async login(email: any, password: any) {
    try {
      const existUser = await this.validateUser(email, password);

      if (existUser) {
        const payload = { email: existUser.email, sub: existUser.id };
        return {
          access_token: this.jwtService.sign(payload),
          id: payload.sub,
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
