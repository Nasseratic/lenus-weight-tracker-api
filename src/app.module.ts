import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      keepConnectionAlive: true,
      url: process.env.MONGODB_CONNECTION_STRING,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
