import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ShopItemDto {
  @ApiProperty({ example: 'banana', description: 'Shop item name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'image-url', description: 'Shop image' })
  @IsString()
  image: string;

  @ApiProperty({ example: 100, description: 'Shop price' })
  @IsString()
  price: number;
}
