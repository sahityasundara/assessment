import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { User } from './users/user.entity';
import { Item } from './items/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USER || 'nest',
        password: process.env.DATABASE_PASSWORD || 'nestpass',
        database: process.env.DATABASE_NAME || 'nest_assessment',
        entities: [User, Item],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ItemsModule,
  ],
})
export class AppModule {}
