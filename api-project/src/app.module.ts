import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import { CommonData } from './models/user.module';
import { ConfigModule } from '@nestjs/config';
import { ApiToken } from './middleware/api-token';
import * as dotenv from 'dotenv';

dotenv.config();
const appModules = [UserModule, CommonData];
const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    typeOrmModule,
    ...appModules,
  ],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiToken)
      .forRoutes(
        { path: 'users/getAllUsers', method: RequestMethod.ALL },
        { path: 'users/addUser', method: RequestMethod.ALL },
        { path: 'users/updateUser', method: RequestMethod.ALL },
        { path: 'users/deleteUser', method: RequestMethod.ALL },
      );
  }
}
