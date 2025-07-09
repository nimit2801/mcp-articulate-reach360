import { Reach360Client } from "../client";
import {
  ListGroupsInputSchema,
  GetGroupInputSchema,
  CreateGroupInputSchema,
  UpdateGroupInputSchema,
  DeleteGroupInputSchema,
  GroupsResponseSchema,
  GroupSchema,
} from "../types";
import { buildPaginationParams } from "../utils/pagination";

export class GroupTools {
  constructor(private client: Reach360Client) {}

  async listGroups(args: any) {
    const input = ListGroupsInputSchema.parse(args);
    const params = buildPaginationParams(input);

    if (input.name) {
      params.name = input.name;
    }

    const response = await this.client.get("/groups", params);
    const parsed = GroupsResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            groups: parsed.groups,
            nextUrl: parsed.nextUrl,
            total: parsed.groups.length,
          }, null, 2),
        },
      ],
    };
  }

  async getGroup(args: any) {
    const input = GetGroupInputSchema.parse(args);
    
    const response = await this.client.get(`/groups/${input.groupId}`);
    const group = GroupSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(group, null, 2),
        },
      ],
    };
  }

  async createGroup(args: any) {
    const input = CreateGroupInputSchema.parse(args);
    
    const response = await this.client.post("/groups", { name: input.name });
    const group = GroupSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            message: "Group created successfully",
            group,
          }, null, 2),
        },
      ],
    };
  }

  async updateGroup(args: any) {
    const input = UpdateGroupInputSchema.parse(args);
    
    const response = await this.client.put(`/groups/${input.groupId}`, { name: input.name });
    const group = GroupSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            message: "Group updated successfully",
            group,
          }, null, 2),
        },
      ],
    };
  }

  async deleteGroup(args: any) {
    const input = DeleteGroupInputSchema.parse(args);
    
    await this.client.delete(`/groups/${input.groupId}`);

    return {
      content: [
        {
          type: "text" as const,
          text: `Group ${input.groupId} has been successfully deleted.`,
        },
      ],
    };
  }
}
