import { Field, ObjectType } from '@nestjs/graphql';
import { UserSetting as PrismaUserSetting } from '@prisma/client';

@ObjectType()
export class UserSetting implements PrismaUserSetting {
  @Field()
  theme_color: string;
  @Field()
  background_url: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field()
  createdBy: string;
  @Field()
  updatedBy: string;
}
