import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../entities/admin.entity';
import { CreateAdminInput, UpdateAdminInput } from './dto/admin.input';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }

    return admin;
  }

  async create(createAdminInput: CreateAdminInput): Promise<Admin> {
    const { email, password } = createAdminInput;

    // Verificar si el email ya está en uso
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('El email ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = this.adminRepository.create({
      email,
      password: hashedPassword,
    });

    return this.adminRepository.save(admin);
  }

  async update(id: string, updateAdminInput: UpdateAdminInput): Promise<Admin> {
    const admin = await this.findOne(id);

    // Si se proporciona un nuevo email, verificar que no esté en uso
    if (updateAdminInput.email && updateAdminInput.email !== admin.email) {
      const existingAdmin = await this.adminRepository.findOne({
        where: { email: updateAdminInput.email },
      });

      if (existingAdmin) {
        throw new ConflictException('El email ya está en uso');
      }
    }

    // Si se proporciona una nueva contraseña, hashearla
    if (updateAdminInput.password) {
      updateAdminInput.password = await bcrypt.hash(updateAdminInput.password, 10);
    }

    Object.assign(admin, updateAdminInput);
    return this.adminRepository.save(admin);
  }

  async remove(id: string): Promise<Admin> {
    const admin = await this.findOne(id);
    await this.adminRepository.remove(admin);
    return admin;
  }

  async createDefaultAdmin(email: string, password: string): Promise<Admin> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });

    if (existingAdmin) {
      return existingAdmin;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      email,
      password: hashedPassword,
    });

    return this.adminRepository.save(admin);
  }
}
