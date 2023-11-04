import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'myuser',
      database: 'dnname',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
