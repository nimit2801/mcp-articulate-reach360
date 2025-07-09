import { Reach360Client } from "../client";
export declare class CourseTools {
    private client;
    constructor(client: Reach360Client);
    listCourses(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    getCourse(args: any): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
}
//# sourceMappingURL=courses.d.ts.map