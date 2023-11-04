import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopItemEntity } from './shopItem.entity';
import { ShopItemService, ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, ShopItemEntity])],
  controllers: [ShopController],
  providers: [ShopService, ShopItemService],
  exports: [ShopService, ShopItemService],
})
export class ShopModule {}
