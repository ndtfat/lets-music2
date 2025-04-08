"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const rxjs_1 = require("rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const payload = ctx.getArgs();
        const user = ctx.getContext().req?.user;
        const resolverName = ctx.getInfo().path.key;
        console.log('\n━━━━━━━━━━━━━━━━ 🚀 API CALL ━━━━━━━━━━━━━━━━');
        console.log('📌 Endpoint:', resolverName);
        console.log('👤 User:', user || 'unauthorized');
        console.log('📥 Payload:', JSON.stringify(payload, null, 2));
        console.log('⏰ Timestamp:', new Date().toISOString());
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return next.handle().pipe((0, rxjs_1.tap)((response) => {
            console.log('\n━━━━━━━━━━━━━━━ 📦 API RESPONSE ━━━━━━━━━━━━━━');
            console.log('📌 Endpoint:', resolverName);
            console.log('📤 Response:', JSON.stringify(response, null, 2));
            console.log('⏰ Timestamp:', new Date().toISOString());
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map