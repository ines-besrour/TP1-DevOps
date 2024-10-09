import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { FirstMiddleware } from './midddlewares/first/first.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TodoEntity } from './todo/entities/entities/TodoEntity';
import { UserEntity } from './user/entities/UserEntity';
import { AuthentificationModule } from './authentification/authentification.module';
import { AuthentificationController } from './authentification/authentification.controller';


//import HelmetMiddlware from 'helmet'


@Module({
  imports: [TodoModule, CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '14656718',
      database: 'nest-js',
      autoLoadEntities: true,
      entities: [TodoEntity,UserEntity],
      synchronize: true,
      debug: false
    }),    
    TodoModule, AuthentificationModule,


  ],
  controllers: [AppController, AuthentificationController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any{
      consumer.apply(FirstMiddleware).forRoutes(
        {
          path:'todo',
          method: RequestMethod.GET
        },        {
          path:'todo*',
          method: RequestMethod.DELETE
        },
      )
//      .apply(HelmetMiddlware).forRoutes('')
;
  }
}