import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Jogo } from './jogos/entities/jogos.entity';
import { JogoModule } from './jogos/jogos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_loja_games',
      synchronize: true,
      entities: [Categoria, Jogo],
      logging: true,
    }),
    CategoriaModule,
    JogoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
