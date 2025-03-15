import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);
