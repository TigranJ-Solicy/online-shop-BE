import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShopDto {
  @ApiProperty({ example: 'my-shop', description: 'Shop name' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'user-id', description: 'Shop owner' })
  @IsString()
  owner: string;

  @ApiProperty({ example: 'Password123', description: 'Shop image' })
  @IsString()
  image: string;
}
