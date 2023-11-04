import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/shop/shop.entity';
import { ShopItemEntity } from 'src/shop/shopItem.entity';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShopDto } from '../dto/shop.dto';
import { ShopItemDto } from 'src/dto/shopItem.dto';

@Controller('shops')
@ApiTags('Shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiBody({ type: ShopDto })
  @ApiResponse({ type: Shop })
  async createShop(@Body() shopData: Partial<Shop>): Promise<Shop> {
    return this.shopService.createShop(shopData);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: ShopItemEntity })
  async getShopItem(
    @Param('id') shopId: FindOneOptions<ShopItemEntity>,
  ): Promise<ShopItemEntity> {
    return this.shopService.getShopItemByShopId(shopId);
  }

  @Get()
  async getShops(): Promise<Shop[]> {
    return this.shopService.getShops();
  }

  @Get('user/:userId')
  async getShopsByUserId(@Param('userId') userId: string): Promise<Shop[]> {
    return this.shopService.getShopsByUserId(userId);
  }

  @Post(':id/shop-item')
  @ApiBody({ type: ShopItemDto })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Shop })
  async addShopItemToShop(
    @Param('id') shopId: FindOneOptions<Shop>,
    @Body() shopItemData: ShopItemEntity,
  ): Promise<ShopItemEntity[] | null> {
    return this.shopService.addShopItem(shopId, shopItemData);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async deleteShop(@Param('id') id: string): Promise<void> {
    await this.shopService.deleteShop(id);
  }

  @Delete(':shopId/shop-item/:itemId')
  @ApiParam({ name: 'shopId', type: String })
  async deleteShopItem(
    @Param('shopId') shopId: string,
    @Param('itemId') itemId: string,
  ): Promise<Shop | null> {
    return this.shopService.deleteShopItem(shopId, itemId);
  }
}
