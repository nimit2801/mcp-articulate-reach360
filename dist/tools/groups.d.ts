import { Reach360Client } from "../client";
export declare class GroupTools {
    private client;
    constructor(client: Reach360Client);
    listGroups(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    getGroup(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    createGroup(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    updateGroup(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    deleteGroup(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=groups.d.ts.map