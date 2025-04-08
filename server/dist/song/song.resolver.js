"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const song_service_1 = require("./song.service");
const song_entity_1 = require("./entities/song.entity");
const user_decorator_1 = require("../decorators/user.decorator");
const user_dto_model_1 = require("../user/dto/user-dto.model");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const create_song_dto_input_1 = require("./dto/create-song-dto.input");
let SongResolver = class SongResolver {
    songService;
    constructor(songService) {
        this.songService = songService;
    }
    async songs() {
        return this.songService.getSongs();
    }
    async song(user, payload) {
        return this.songService.createAndUpdateSong(user, payload);
    }
};
exports.SongResolver = SongResolver;
__decorate([
    (0, graphql_1.Query)(() => [song_entity_1.Song]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SongResolver.prototype, "songs", null);
__decorate([
    (0, graphql_1.Mutation)(() => song_entity_1.Song),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.UserFromToken)()),
    __param(1, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_model_1.UserDTO,
        create_song_dto_input_1.SongInput]),
    __metadata("design:returntype", Promise)
], SongResolver.prototype, "song", null);
exports.SongResolver = SongResolver = __decorate([
    (0, graphql_1.Resolver)('Song'),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongResolver);
//# sourceMappingURL=song.resolver.js.map