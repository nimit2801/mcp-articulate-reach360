import { Reach360Client } from "../client";
export declare class EnrollmentTools {
    private client;
    constructor(client: Reach360Client);
    enrollUserInCourse(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    unenrollUserFromCourse(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    getUserGroups(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    getGroupUsers(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=enrollments.d.ts.map