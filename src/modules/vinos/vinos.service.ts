import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vino } from '../../entities/vino.entity';
import { CreateVinoInput, UpdateVinoInput } from './dto/vino.input';

@Injectable()
export class VinosService {
  constructor(
    @InjectRepository(Vino)
    private vinoRepository: Repository<Vino>,
  ) {}

  async findAll(includeInactive = false): Promise<Vino[]> {
    const where = includeInactive ? {} : { isActive: true };
    return this.vinoRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Vino> {
    const vino = await this.vinoRepository.findOne({
      where: { id },
    });

    if (!vino) {
      throw new NotFoundException(`Vino con ID ${id} no encontrado`);
    }

    return vino;
  }

  async create(createVinoInput: CreateVinoInput): Promise<Vino> {
    const vino = this.vinoRepository.create(createVinoInput);
    return this.vinoRepository.save(vino);
  }

  async update(id: string, updateVinoInput: UpdateVinoInput): Promise<Vino> {
    const vino = await this.findOne(id);
    Object.assign(vino, updateVinoInput);
    return this.vinoRepository.save(vino);
  }

  async remove(id: string): Promise<Vino> {
    const vino = await this.findOne(id);
    await this.vinoRepository.remove(vino);
    vino.id = id; // TypeORM strips id after remove, restore it for GraphQL
    return vino;
  }

  async toggleActive(id: string): Promise<Vino> {
    const vino = await this.findOne(id);
    vino.isActive = !vino.isActive;
    return this.vinoRepository.save(vino);
  }

  async updateStock(id: string, cantidad: number): Promise<Vino> {
    const vino = await this.findOne(id);
    vino.stock = cantidad;
    return this.vinoRepository.save(vino);
  }
}
