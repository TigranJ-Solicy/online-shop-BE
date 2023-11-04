import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  async findById(@Query('userId') userId: number) {
    return this.userService.findById(userId);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
