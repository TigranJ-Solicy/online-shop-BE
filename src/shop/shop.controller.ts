import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { ShopItemService, ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/shop/shop.entity';
import { ShopItemEntity } from 'src/shop/shopItem.entity';

@Controller('shops')
export class ShopController {
  constructor(
    private readonly shopService: ShopService,
    private readonly shopItemService: ShopItemService,
  ) {}

  @Post()
  async createShop(@Body() shopData: Partial<Shop>): Promise<Shop> {
    return this.shopService.createShop(shopData);
  }

  @Get(':id')
  async getShopItem(
    @Param('id') shopId: FindOneOptions<ShopItemEntity>,
  ): Promise<ShopItemEntity[] | null> {
    return this.shopItemService.getShopItemByShopId(shopId);
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
  async addShopItemToShop(
    @Param('id') shopId: FindOneOptions<Shop>,
    @Body() shopItemData: ShopItemEntity,
  ): Promise<ShopItemEntity[] | null> {
    return this.shopService.addShopItem(shopId, shopItemData);
  }

  @Delete(':id')
  async deleteShop(@Param('id') id: FindOneOptions<Shop>): Promise<void> {
    await this.shopService.deleteShop(id);
  }

  @Delete(':shopId/shop-item/:itemId')
  async deleteShopItem(
    @Param('shopId') shopId: FindOneOptions<Shop>,
    @Param('itemId') itemId: string,
  ): Promise<Shop | null> {
    return this.shopService.deleteShopItem(shopId, itemId);
  }
}
