import { Reach360Client } from "../client";
export declare class UserTools {
    private client;
    constructor(client: Reach360Client);
    listUsers(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    getUser(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    deleteUser(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=users.d.ts.map