import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Jogo } from 'src/jogos/entities/jogos.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Column({ length: 100, nullable: false })
  @IsNotEmpty()
  descricao: string;

  @OneToMany(() => Jogo, (jogos) => jogos.categoria)
  jogo: Jogo[];
}
