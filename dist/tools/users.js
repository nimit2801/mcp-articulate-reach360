"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTools = void 0;
const types_1 = require("../types");
const pagination_1 = require("../utils/pagination");
class UserTools {
    client;
    constructor(client) {
        this.client = client;
    }
    async listUsers(args) {
        const input = types_1.ListUsersInputSchema.parse(args);
        const params = (0, pagination_1.buildPaginationParams)(input);
        if (input.email) {
            params.email = input.email;
        }
        const response = await this.client.get("/users", params);
        const parsed = types_1.UsersResponseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        users: parsed.users,
                        nextUrl: parsed.nextUrl,
                        total: parsed.users.length,
                    }, null, 2),
                },
            ],
        };
    }
    async getUser(args) {
        const input = types_1.GetUserInputSchema.parse(args);
        const response = await this.client.get(`/users/${input.userId}`);
        const user = types_1.UserSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(user, null, 2),
                },
            ],
        };
    }
    async deleteUser(args) {
        const input = types_1.DeleteUserInputSchema.parse(args);
        await this.client.delete(`/users/${input.userId}`);
        return {
            content: [
                {
                    type: "text",
                    text: `User ${input.userId} has been successfully deleted.`,
                },
            ],
        };
    }
}
exports.UserTools = UserTools;
//# sourceMappingURL=users.js.map