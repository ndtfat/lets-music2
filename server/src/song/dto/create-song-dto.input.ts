import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SongInput {
  @Field({ nullable: true })
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsString()
  singer: string;

  @Field(() => [String])
  @IsString({ each: true })
  genres: string[];
}
