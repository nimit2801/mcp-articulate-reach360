import { Reach360Client } from "../client";
import {
  EnrollUserInputSchema,
  UnenrollUserInputSchema,
  GetUserGroupsInputSchema,
  GetGroupUsersInputSchema,
  GroupsResponseSchema,
  UsersResponseSchema,
} from "../types";
import { buildPaginationParams } from "../utils/pagination";

export class EnrollmentTools {
  constructor(private client: Reach360Client) {}

  async enrollUserInCourse(args: any) {
    const input = EnrollUserInputSchema.parse(args);
    
    await this.client.post(`/courses/${input.courseId}/users/${input.userId}`);

    return {
      content: [
        {
          type: "text" as const,
          text: `User ${input.userId} has been successfully enrolled in course ${input.courseId}.`,
        },
      ],
    };
  }

  async unenrollUserFromCourse(args: any) {
    const input = UnenrollUserInputSchema.parse(args);
    
    await this.client.delete(`/courses/${input.courseId}/users/${input.userId}`);

    return {
      content: [
        {
          type: "text" as const,
          text: `User ${input.userId} has been successfully unenrolled from course ${input.courseId}.`,
        },
      ],
    };
  }

  async getUserGroups(args: any) {
    const input = GetUserGroupsInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/users/${input.userId}/groups`, params);
    const parsed = GroupsResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
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

  async getGroupUsers(args: any) {
    const input = GetGroupUsersInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/groups/${input.groupId}/users`, params);
    const parsed = UsersResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
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
