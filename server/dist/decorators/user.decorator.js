"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFromToken = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.UserFromToken = (0, common_1.createParamDecorator)((data, context) => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;
    }
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
//# sourceMappingURL=user.decorator.js.map