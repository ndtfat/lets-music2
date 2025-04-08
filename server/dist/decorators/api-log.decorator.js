"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAPI = LogAPI;
const graphql_1 = require("@nestjs/graphql");
function LogAPI() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const context = graphql_1.GqlExecutionContext.create(args[2]);
            const payload = context.getArgs();
            const user = context.getContext().req?.user;
            console.log('\n━━━━━━━━━━━━━━━━ 🚀 API CALL ━━━━━━━━━━━━━━━━');
            console.log('📌 Endpoint:', propertyKey);
            console.log('👤 User:', user || 'unauthorized');
            console.log('📥 Payload:', JSON.stringify(payload, null, 2));
            console.log('⏰ Timestamp:', new Date().toISOString());
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            const result = await originalMethod.apply(this, args);
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
//# sourceMappingURL=api-log.decorator.js.map