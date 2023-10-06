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
    @InjectRepository(ShopItemEntity)
    private readonly shopItemRepository: Repository<ShopItemEntity>,
  ) {}

  async createShop(shopData: Partial<Shop>): Promise<Shop> {
    try {
      const createdShop = this.shopRepository.create(shopData);
      return await this.shopRepository.save(createdShop);
    } catch (error) {
      throw new Error('Failed to create a shop');
    }
  }

  async getShopItemByShopId(
    shopId: FindOneOptions<ShopItemEntity>,
  ): Promise<ShopItemEntity> {
    try {
      const shop = await this.shopItemRepository.findOne(shopId);

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
  ): Promise<ShopItemEntity[]> {
    try {
      const obj = {
        ...shopItemData,
        shopId,
      };
      return await this.shopItemRepository.save(obj as any);
    } catch (error) {
      throw new Error('Failed to add a shop item');
    }
  }

  async deleteShop(shopId: string): Promise<void> {
    try {
      const shop = await this.shopRepository.findOneById(shopId);

      if (!shop) {
        throw new NotFoundException(`Shop with id ${shopId} not found.`);
      }

      await this.shopRepository.remove(shop);
    } catch (error) {
      throw new Error('Failed to delete the shop');
    }
  }

  async deleteShopItem(shopId: string, itemId: string): Promise<any> {
    try {
      const shop = await this.shopItemRepository.findOneById(itemId);

      if (!shop) {
        throw new NotFoundException(`Shop with id ${shopId} not found.`);
      }

      await this.shopItemRepository.remove(shop);
    } catch (error) {
      throw new Error('Failed to delete the shop item');
    }
  }
}

@Injectable()
export class ShopItemService {
  constructor(
    @InjectRepository(ShopItemEntity)
    private readonly shopItemRepository: Repository<ShopItemEntity>,
  ) {}

  async getShopItemByShopId(
    shopId: FindOneOptions<ShopItemEntity>,
  ): Promise<ShopItemEntity[]> {
    try {
      const shop = await this.shopItemRepository.find(shopId);
      console.log(shop, 'shop');

      if (!shop) {
        throw new NotFoundException('Shop not foundzzz');
      }

      return shop;
    } catch (error) {
      throw new NotFoundException('Shop not foundccc');
    }
  }
}
