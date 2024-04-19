import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { JogoService } from '../services/jogo.service';
import { Jogo } from '../entities/jogos.entity';
import { DeleteResult } from 'typeorm';

@Controller('/jogos')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Jogo[]> {
    return this.jogoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Jogo> {
    return this.jogoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Jogo[]> {
    return this.jogoService.findByNome(nome);
  }

  @Get('/preco/menor/:preco')
  @HttpCode(HttpStatus.OK)
  findByMenorPreco(
    @Param('preco', ParseIntPipe) preco: number,
  ): Promise<Jogo[]> {
    return this.jogoService.findByMenorPreco(preco);
  }

  @Get('/preco/maior/:preco')
  @HttpCode(HttpStatus.OK)
  findByMaiorPreco(
    @Param('preco', ParseIntPipe) preco: number,
  ): Promise<Jogo[]> {
    return this.jogoService.findByMaiorPreco(preco);
  }

  @Post('/criar')
  @HttpCode(HttpStatus.OK)
  create(@Body() jogo: Jogo): Promise<Jogo> {
    return this.jogoService.create(jogo);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.CREATED)
  update(@Body() jogo: Jogo): Promise<Jogo> {
    return this.jogoService.update(jogo);
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.jogoService.delete(id);
  }
}
