import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Generated,
} from 'typeorm';
import { ShopItemEntity } from './shopItem.entity';

@Entity()
export class Shop {
  //@ts-ignore
  @PrimaryGeneratedColumn('uuid', { default: () => 'uuid_generate_v4()' })
  @Generated('uuid')
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Column()
  image: string;

  @OneToMany(() => ShopItemEntity, (item) => item.shop)
  shopItems: ShopItemEntity[];
}
