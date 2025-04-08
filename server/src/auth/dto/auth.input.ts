import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 7,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  password: string;
}
