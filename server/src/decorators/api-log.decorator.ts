import { GqlExecutionContext } from '@nestjs/graphql';
import { UserDTO } from '../user/dto/user-dto.model';
import { ExecutionContext } from '@nestjs/common';

export function LogAPI() {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod: Function = descriptor.value;

    descriptor.value = async function (
      ...args: [unknown, unknown, ExecutionContext]
    ) {
      const context: GqlExecutionContext = GqlExecutionContext.create(args[2]);
      const payload: Record<string, any> = context.getArgs();
      const user: UserDTO | undefined = context.getContext().req?.user;

      console.log('\n━━━━━━━━━━━━━━━━ 🚀 API CALL ━━━━━━━━━━━━━━━━');
      console.log('📌 Endpoint:', propertyKey);
      console.log('👤 User:', user || 'unauthorized');
      console.log('📥 Payload:', JSON.stringify(payload, null, 2));
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      const result: unknown = await originalMethod.apply(this, args);

      console.log('\n━━━━━━━━━━━━━━━ 📦 API RESPONSE ━━━━━━━━━━━━━━');
      console.log('📌 Endpoint:', propertyKey);
      console.log('📤 Response:', JSON.stringify(result, null, 2));
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      return result;
    };

    return descriptor;
  };
}
