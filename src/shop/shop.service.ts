import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Shop } from './shop.entity';
import { ShopItemEntity } from './shopItem.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async createShop(shopData: Partial<Shop>): Promise<Shop> {
    try {
      const createdShop = this.shopRepository.create(shopData);
      return await this.shopRepository.save(createdShop);
    } catch (error) {
      throw new Error('Failed to create a shop');
    }
  }

  async getShopById(shopId: FindOneOptions<Shop>): Promise<Shop> {
    try {
      const shop = await this.shopRepository.findOne(shopId);

      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      return shop;
    } catch (error) {
      throw new NotFoundException('Shop not found');
    }
  }

  async getShops(): Promise<Shop[]> {
    try {
      return await this.shopRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch shops');
    }
  }

  async getShopsByUserId(userId: string): Promise<Shop[]> {
    try {
      return await this.shopRepository.find({
        owner: userId,
      } as FindManyOptions<Shop>);
    } catch (error) {
      throw new Error('Failed to fetch shops by user ID');
    }
  }

  async addShopItem(
    shopId: FindOneOptions<Shop>,
    shopItemData: ShopItemEntity,
  ): Promise<Shop> {
    try {
      const shop = await this.shopRepository.findOne(shopId);

      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      shop.shopItems.push(shopItemData);

      return await this.shopRepository.save(shop);
    } catch (error) {
      throw new Error('Failed to add a shop item');
    }
  }

  async deleteShop(shopId: FindOneOptions<Shop>): Promise<void> {
    try {
      const shop = await this.shopRepository.findOne(shopId);

      if (!shop) {
        throw new NotFoundException(`Shop with id ${shopId} not found.`);
      }

      await this.shopRepository.remove(shop);
    } catch (error) {
      throw new Error('Failed to delete the shop');
    }
  }

  async deleteShopItem(
    shopId: FindOneOptions<Shop>,
    itemId: string,
  ): Promise<Shop> {
    try {
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
      return await this.shopRepository.save(shop);
    } catch (error) {
      throw new Error('Failed to delete the shop item');
    }
  }
}
