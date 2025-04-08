import { Field, ObjectType } from '@nestjs/graphql';
import { Song as PrismaSong } from '@prisma/client';
import { IsString } from 'class-validator';

@ObjectType()
export class Song implements PrismaSong {
  @Field()
  id: string;
  @Field()
  url: string;
  @Field()
  name: string;
  @Field()
  singer: string;
  @Field(() => [String])
  @IsString({ each: true })
  genres: string[];
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field()
  createdBy: string;
  @Field()
  updatedBy: string;
}
