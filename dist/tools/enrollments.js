"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentTools = void 0;
const types_1 = require("../types");
const pagination_1 = require("../utils/pagination");
class EnrollmentTools {
    client;
    constructor(client) {
        this.client = client;
    }
    async enrollUserInCourse(args) {
        const input = types_1.EnrollUserInputSchema.parse(args);
        await this.client.post(`/courses/${input.courseId}/users/${input.userId}`);
        return {
            content: [
                {
                    type: "text",
                    text: `User ${input.userId} has been successfully enrolled in course ${input.courseId}.`,
                },
            ],
        };
    }
    async unenrollUserFromCourse(args) {
        const input = types_1.UnenrollUserInputSchema.parse(args);
        await this.client.delete(`/courses/${input.courseId}/users/${input.userId}`);
        return {
            content: [
                {
                    type: "text",
                    text: `User ${input.userId} has been successfully unenrolled from course ${input.courseId}.`,
                },
            ],
        };
    }
    async getUserGroups(args) {
        const input = types_1.GetUserGroupsInputSchema.parse(args);
        const params = (0, pagination_1.buildPaginationParams)(input);
        const response = await this.client.get(`/users/${input.userId}/groups`, params);
        const parsed = types_1.GroupsResponseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        userId: input.userId,
                        groups: parsed.groups,
                        nextUrl: parsed.nextUrl,
                        total: parsed.groups.length,
                    }, null, 2),
                },
            ],
        };
    }
    async getGroupUsers(args) {
        const input = types_1.GetGroupUsersInputSchema.parse(args);
        const params = (0, pagination_1.buildPaginationParams)(input);
        const response = await this.client.get(`/groups/${input.groupId}/users`, params);
        const parsed = types_1.UsersResponseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        groupId: input.groupId,
                        users: parsed.users,
                        nextUrl: parsed.nextUrl,
                        total: parsed.users.length,
                    }, null, 2),
                },
            ],
        };
    }
}
exports.EnrollmentTools = EnrollmentTools;
//# sourceMappingURL=enrollments.js.map