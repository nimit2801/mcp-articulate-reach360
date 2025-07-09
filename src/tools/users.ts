import { Reach360Client } from "../client";
import {
  ListUsersInputSchema,
  GetUserInputSchema,
  DeleteUserInputSchema,
  UsersResponseSchema,
  UserSchema,
} from "../types";
import { buildPaginationParams } from "../utils/pagination";

export class UserTools {
  constructor(private client: Reach360Client) {}

  async listUsers(args: any) {
    const input = ListUsersInputSchema.parse(args);
    const params = buildPaginationParams(input);

    if (input.email) {
      params.email = input.email;
    }

    const response = await this.client.get("/users", params);
    const parsed = UsersResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            users: parsed.users,
            nextUrl: parsed.nextUrl,
            total: parsed.users.length,
          }, null, 2),
        },
      ],
    };
  }

  async getUser(args: any) {
    const input = GetUserInputSchema.parse(args);
    
    const response = await this.client.get(`/users/${input.userId}`);
    const user = UserSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(user, null, 2),
        },
      ],
    };
  }

  async deleteUser(args: any) {
    const input = DeleteUserInputSchema.parse(args);
    
    await this.client.delete(`/users/${input.userId}`);

    return {
      content: [
        {
          type: "text" as const,
          text: `User ${input.userId} has been successfully deleted.`,
        },
      ],
    };
  }
}
