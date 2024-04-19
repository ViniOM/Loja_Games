import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Jogo } from '../entities/jogos.entity';
import { CategoriaService } from 'src/categoria/services/categoria.service';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private jogoRepository: Repository<Jogo>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Jogo[]> {
    return await this.jogoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async create(jogo: Jogo): Promise<Jogo> {
    let buscaNome = await this.jogoRepository.findOne({
      where: {
        nome: jogo.nome,
      },
    });

    if (buscaNome)
      throw new HttpException('Jogo ja existente!', HttpStatus.NOT_FOUND);

    return await this.jogoRepository.save(jogo);
  }

  async update(jogo: Jogo): Promise<Jogo> {
    let busca = await this.findById(jogo.id);

    if (!busca || !jogo.id) {
      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (jogo.categoria) {
      let categoria = await this.categoriaService.findById(jogo.categoria.id);

      if (!categoria)
        throw new HttpException(
          'Categoria não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      return await this.jogoRepository.save(jogo);
    }

    return await this.jogoRepository.save(jogo);
  }

  async findByNome(nome: string): Promise<Jogo[]> {
    let busca = await this.jogoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });

    if (busca.length == 0)
      throw new HttpException(
        `Nome: '${nome}' não existente!`,
        HttpStatus.NOT_FOUND,
      );

    return busca;
  }

  async findByMenorPreco(preco: number): Promise<Jogo[]> {
    let menorPreco = await this.jogoRepository.findBy({
      preco: LessThanOrEqual(preco),
    });

    if (!menorPreco)
      throw new HttpException(
        `Não existe preco nessa media: ${menorPreco}`,
        HttpStatus.NOT_FOUND,
      );

    return menorPreco;
  }

  async findByMaiorPreco(preco: number): Promise<Jogo[]> {
    let menorPreco = await this.jogoRepository.findBy({
      preco: MoreThanOrEqual(preco),
    });

    if (!menorPreco)
      throw new HttpException(
        `Não existe preco nessa media: ${menorPreco}`,
        HttpStatus.NOT_FOUND,
      );

    return menorPreco;
  }

  async findById(id: number): Promise<Jogo> {
    let busca = await this.jogoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!busca)
      throw new HttpException(
        `ID: '${id}' não existente!`,
        HttpStatus.NOT_FOUND,
      );

    return busca;
  }

  async delete(id: number): Promise<DeleteResult> {
    let busca = await this.findById(id);

    if (!busca)
      throw new HttpException('Jogo não encontrado!', HttpStatus.NOT_FOUND);

    return await this.jogoRepository.delete(id);
  }
}
