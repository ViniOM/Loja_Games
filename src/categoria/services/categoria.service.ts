import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    let busca = await this.categoriaRepository.findOne({
      where: {
        descricao: categoria.descricao,
      },
    });

    if (busca)
      throw new HttpException('Tema ja Existente', HttpStatus.CONFLICT);

    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    let busca = await this.categoriaRepository.find({
      relations: {
        jogo: true,
      },
    });

    if (busca.length == 0)
      throw new HttpException('Nenhum Tema cadastrado!', HttpStatus.NOT_FOUND);

    return busca;
  }

  async findById(id: number): Promise<Categoria> {
    let busca = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        jogo: true,
      },
    });

    if (!busca)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return busca;
  }

  async findByDesc(desc: string): Promise<Categoria[]> {
    let busca = await this.categoriaRepository.find({
      where: {
        descricao: ILike(`%${desc}%`),
      },
      relations: {
        jogo: true,
      },
    });

    if (busca.length == 0)
      throw new HttpException(
        `Não existe descricao parecidas com '${desc}'`,
        HttpStatus.NOT_FOUND,
      );

    return busca;
  }

  async update(categoria: Categoria): Promise<Categoria> {
    let busca = await this.findById(categoria.id);

    if (!busca || !categoria.id) {
      throw new HttpException(
        'Categoria não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    let busca = await this.findById(id);

    if (!busca)
      throw new HttpException(
        `Categoria com o id: '${id}' não encontrado!`,
        HttpStatus.NOT_FOUND,
      );

    return await this.categoriaRepository.delete(id);
  }
}
