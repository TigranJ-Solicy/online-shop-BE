import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class ShopItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne(() => Shop, (shop) => shop.shopItems)
  shop: Shop;
}
