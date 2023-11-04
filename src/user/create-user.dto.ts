import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'jordan', description: 'User name' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'Password123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'owner', description: 'User role' })
  @IsString()
  role: string;
}
