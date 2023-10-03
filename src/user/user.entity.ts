import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  //@ts-ignore
  @PrimaryGeneratedColumn('uuid', { default: () => 'uuid_generate_v4()' })
  @Generated('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
