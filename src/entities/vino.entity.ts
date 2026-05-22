import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('vinos')
export class Vino {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nombre: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioMercado?: number;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioCaja?: number;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'simple-json', nullable: true })
  fotos: string[];

  @Field()
  @Column('text')
  descripcion: string;

  @Field(() => Int)
  @Column({ default: 0 })
  stock: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
