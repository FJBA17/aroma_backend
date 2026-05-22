import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../entities/admin.entity';
import { LoginInput } from '../admin/dto/admin.input';
import { AuthResponse } from './dto/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const admin = await this.adminRepository.findOne({
      where: { email, isActive: true },
    });

    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: admin.id, email: admin.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      admin,
    };
  }

  async validateUser(userId: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id: userId, isActive: true },
    });

    if (!admin) {
      throw new UnauthorizedException('Usuario no encontrado o inactivo');
    }

    return admin;
  }
}
