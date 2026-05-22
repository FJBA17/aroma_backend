import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  private supabase;

  constructor(private config: ConfigService) {
    this.supabase = createClient(
      this.config.get<string>('SUPABASE_URL')!,
      this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
    );
  }

  @Post('vino-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadVinoImage(@UploadedFile() file: Express.Multer.File) {
    const ext = file.originalname.split('.').pop();
    const path = `vinos/${Date.now()}.${ext}`;

    const { error } = await this.supabase.storage
      .from('images')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(error.message);

    const { data } = this.supabase.storage.from('images').getPublicUrl(path);
    return { url: data.publicUrl };
  }
}
