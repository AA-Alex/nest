import { forwardRef, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from './Entity/user.entity';
import { UserInfo } from './Entity/user_info.entity';
import { faAuthSysMiddleware } from 'src/Middleware';
import { AccessLevelT } from './Dto/user.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo,])],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(faAuthSysMiddleware(AccessLevelT.noob))
      .forRoutes('user/login');

    consumer
      .apply(faAuthSysMiddleware(AccessLevelT.registered))
      .forRoutes('user/update-user-password');

    consumer
      .apply(faAuthSysMiddleware(AccessLevelT.registered))
      .forRoutes('user/update-user-info');
  }

}

