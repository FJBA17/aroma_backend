import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { Admin } from '../../entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule implements OnModuleInit {
  constructor(
    private adminService: AdminService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Crear admin por defecto al iniciar la aplicación
    const defaultEmail = this.configService.get('DEFAULT_ADMIN_EMAIL');
    const defaultPassword = this.configService.get('DEFAULT_ADMIN_PASSWORD');
    
    if (defaultEmail && defaultPassword) {
      await this.adminService.createDefaultAdmin(defaultEmail, defaultPassword);
      console.log(`✅ Admin por defecto creado/verificado: ${defaultEmail}`);
    }
  }
}
