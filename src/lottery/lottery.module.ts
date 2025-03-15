import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';
import { Lottery, LotterySchema } from './lottery.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lottery.name, schema: LotterySchema }])],
  controllers: [LotteryController],
  providers: [LotteryService],
})
export class LotteryModule {}
