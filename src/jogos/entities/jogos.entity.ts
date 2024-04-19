import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'tb_jogos' })
export class Jogo {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 100, nullable: false })
  @IsNotEmpty()
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 1000, nullable: false })
  @IsNotEmpty()
  foto: string;

  @Column({ type: 'decimal', nullable: false })
  @IsNotEmpty()
  preco: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.jogo, {
    onDelete: 'CASCADE',
  })
  @IsNotEmpty()
  categoria: Categoria;
}
