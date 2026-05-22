import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinosService } from './vinos.service';
import { VinosResolver } from './vinos.resolver';
import { Vino } from '../../entities/vino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vino])],
  providers: [VinosService, VinosResolver],
  exports: [VinosService],
})
export class VinosModule {}
