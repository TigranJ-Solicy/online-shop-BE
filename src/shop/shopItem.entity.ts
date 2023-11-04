import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class ShopItemEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  shopId: string;

  @OneToMany(() => Shop, (shop) => shop.shopItems)
  shop: Shop;
}
