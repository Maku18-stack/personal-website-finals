import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestbookController } from './guestbook.controller';

@Module({
  imports: [],
  controllers: [AppController, GuestbookController],
  providers: [AppService],
})
export class AppModule {}