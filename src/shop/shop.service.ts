import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { ShopItemEntity } from './shopItem.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async createShop(shopData: Partial<Shop>): Promise<Shop> {
    const createdShop = this.shopRepository.create(shopData);
    return this.shopRepository.save(createdShop);
  }

  async getShopById(shopId: FindOneOptions<Shop>): Promise<Shop | null> {
    const shop = await this.shopRepository.findOne(shopId);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    return shop;
  }

  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  async getShopsByUserId(userId: string): Promise<Shop[]> {
    return this.shopRepository.find({ owner: userId } as any);
  }

  async addShopItem(
    shopId: FindOneOptions<Shop>,
    shopItemData: ShopItemEntity,
  ): Promise<Shop | null> {
    const shop = await this.shopRepository.findOne(shopId);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    shop.shopItems.push(shopItemData);

    await this.shopRepository.save(shop);

    return shop;
  }

  async deleteShop(shopId: FindOneOptions<Shop>): Promise<void> {
    const shop = await this.shopRepository.findOne(shopId);

    if (!shop) {
      throw new NotFoundException(`Shop with id ${shopId} not found.`);
    }

    await this.shopRepository.remove(shop);
  }

  async deleteShopItem(
    shopId: FindOneOptions<Shop>,
    itemId: string,
  ): Promise<Shop | null> {
    const shop = await this.shopRepository.findOne(shopId);

    if (!shop) {
      throw new NotFoundException(`Shop with id ${shopId} not found.`);
    }

    const itemIndex = shop.shopItems.findIndex(
      (item) => item.id.toString() == itemId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(`Shop item with id ${itemId} not found.`);
    }

    shop.shopItems.splice(itemIndex, 1);
    await this.shopRepository.save(shop);

    return shop;
  }
}
