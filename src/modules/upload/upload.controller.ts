import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  private supabase;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) {
      throw new Error('Supabase env vars missing: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
    }
    this.supabase = createClient(url, key);
  }

  @Post('vino-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadVinoImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');

    const ext = file.originalname.split('.').pop();
    const path = `vinos/${Date.now()}.${ext}`;

    const { error } = await this.supabase.storage
      .from('images')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('[Upload] Supabase error:', error);
      throw new InternalServerErrorException(`Supabase: ${error.message}`);
    }

    const { data } = this.supabase.storage.from('images').getPublicUrl(path);
    return { url: data.publicUrl };
  }
}
