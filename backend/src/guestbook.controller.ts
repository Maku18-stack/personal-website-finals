import { Body, Controller, Get, Post } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

@Controller('guestbook')
export class GuestbookController {
  @Get()
  async getAll() {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return { error: error.message };
    return data;
  }

  @Post()
  async add(@Body() body: { name: string; message: string }) {
    const name = (body?.name || '').trim();
    const message = (body?.message || '').trim();

    if (!name || !message) return { error: 'Name and message are required.' };

    const { data, error } = await supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select()
      .single();

    if (error) return { error: error.message };
    return data;
  }
}