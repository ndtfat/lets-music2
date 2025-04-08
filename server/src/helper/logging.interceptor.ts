import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const payload = ctx.getArgs();
    const user = ctx.getContext().req?.user;
    const resolverName = ctx.getInfo().path.key;

    console.log('\n━━━━━━━━━━━━━━━━ 🚀 API CALL ━━━━━━━━━━━━━━━━');
    console.log('📌 Endpoint:', resolverName);
    console.log('👤 User:', user || 'unauthorized');
    console.log('📥 Payload:', JSON.stringify(payload, null, 2));
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return next.handle().pipe(
      tap((response) => {
        console.log('\n━━━━━━━━━━━━━━━ 📦 API RESPONSE ━━━━━━━━━━━━━━');
        console.log('📌 Endpoint:', resolverName);
        console.log('📤 Response:', JSON.stringify(response, null, 2));
        console.log('⏰ Timestamp:', new Date().toISOString());
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }),
    );
  }
}
