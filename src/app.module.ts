import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User/Entity/user.entity';
import { UserModule } from './User/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfo } from './User/Entity/user_info.entity';
import { AdminUserModule } from './Admin-user/admin-user.module';
import { TagModule } from './Tag/tag.module';
import { Tag } from './Tag/Entity/tag.entity';
import { dbConf } from './Config/Config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConf.type,
      host: dbConf.host,
      port: dbConf.port,
      username: dbConf.username,
      password: dbConf.password,
      database: dbConf.database,
      entities: [User, UserInfo, Tag],
      synchronize: true,
    }),

    UserModule,
    AdminUserModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
}
