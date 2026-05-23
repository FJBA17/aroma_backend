import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

@Controller('upload')
export class UploadController {
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(private config: ConfigService) {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) {
      throw new Error('Supabase env vars missing: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
    }
    this.supabaseUrl = url;
    this.supabaseKey = key;
  }

  @Post('vino-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadVinoImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se recibió ningún archivo');

    const ext = file.originalname.split('.').pop();
    const path = `vinos/${Date.now()}.${ext}`;
    const bucket = 'images';

    try {
      await axios.post(
        `${this.supabaseUrl}/storage/v1/object/${bucket}/${path}`,
        file.buffer,
        {
          headers: {
            Authorization: `Bearer ${this.supabaseKey}`,
            'Content-Type': file.mimetype,
            'x-upsert': 'true',
          },
          maxBodyLength: Infinity,
        },
      );
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : String(err);
      console.error('[Upload] Supabase error:', msg);
      throw new InternalServerErrorException(`Supabase: ${msg}`);
    }

    const publicUrl = `${this.supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
    return { url: publicUrl };
  }
}
