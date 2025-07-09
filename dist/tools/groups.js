"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupTools = void 0;
const types_1 = require("../types");
const pagination_1 = require("../utils/pagination");
class GroupTools {
    client;
    constructor(client) {
        this.client = client;
    }
    async listGroups(args) {
        const input = types_1.ListGroupsInputSchema.parse(args);
        const params = (0, pagination_1.buildPaginationParams)(input);
        if (input.name) {
            params.name = input.name;
        }
        const response = await this.client.get("/groups", params);
        const parsed = types_1.GroupsResponseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        groups: parsed.groups,
                        nextUrl: parsed.nextUrl,
                        total: parsed.groups.length,
                    }, null, 2),
                },
            ],
        };
    }
    async getGroup(args) {
        const input = types_1.GetGroupInputSchema.parse(args);
        const response = await this.client.get(`/groups/${input.groupId}`);
        const group = types_1.GroupSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(group, null, 2),
                },
            ],
        };
    }
    async createGroup(args) {
        const input = types_1.CreateGroupInputSchema.parse(args);
        const response = await this.client.post("/groups", { name: input.name });
        const group = types_1.GroupSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        message: "Group created successfully",
                        group,
                    }, null, 2),
                },
            ],
        };
    }
    async updateGroup(args) {
        const input = types_1.UpdateGroupInputSchema.parse(args);
        const response = await this.client.put(`/groups/${input.groupId}`, { name: input.name });
        const group = types_1.GroupSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        message: "Group updated successfully",
                        group,
                    }, null, 2),
                },
            ],
        };
    }
    async deleteGroup(args) {
        const input = types_1.DeleteGroupInputSchema.parse(args);
        await this.client.delete(`/groups/${input.groupId}`);
        return {
            content: [
                {
                    type: "text",
                    text: `Group ${input.groupId} has been successfully deleted.`,
                },
            ],
        };
    }
}
exports.GroupTools = GroupTools;
//# sourceMappingURL=groups.js.map