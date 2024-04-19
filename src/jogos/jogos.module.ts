import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogoController } from './controllers/jogo.controller';
import { JogoService } from './services/jogo.service';
import { Jogo } from './entities/jogos.entity';

import { CategoriaModule } from 'src/categoria/categoria.module';
import { CategoriaService } from 'src/categoria/services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo]), CategoriaModule],
  providers: [JogoService, CategoriaService],
  controllers: [JogoController],
  exports: [TypeOrmModule],
})
export class JogoModule {}
