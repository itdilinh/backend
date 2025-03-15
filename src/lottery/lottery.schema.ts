import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LotteryDocument = Lottery & Document;

@Schema({ timestamps: true })
export class Lottery {
  @Prop({ required: true })
  date: string; // Ngày xổ số

  @Prop({ required: true })
  province: string; // Tỉnh thành

  @Prop({ type: Object, required: true })
  results: Record<string, string[]>; // Kết quả từng giải

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const LotterySchema = SchemaFactory.createForClass(Lottery);
