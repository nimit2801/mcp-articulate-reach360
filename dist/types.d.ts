import { z } from "zod";
export declare const ConfigSchema: z.ZodObject<{
    apiKey: z.ZodString;
    baseUrl: z.ZodString;
    apiVersion: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    baseUrl: string;
    apiVersion: string;
}, {
    apiKey: string;
    baseUrl: string;
    apiVersion?: string | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export declare const PaginationSchema: z.ZodObject<{
    nextUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nextUrl: string | null;
}, {
    nextUrl: string | null;
}>;
export type Pagination = z.infer<typeof PaginationSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodEnum<["learner", "manager", "admin"]>;
    lastActiveAt: z.ZodNullable<z.ZodString>;
    groupsUrl: z.ZodString;
    learnerReportUrl: z.ZodString;
    favoritesUrl: z.ZodString;
    articulate360User: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "learner" | "manager" | "admin";
    lastActiveAt: string | null;
    groupsUrl: string;
    learnerReportUrl: string;
    favoritesUrl: string;
    articulate360User: boolean;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "learner" | "manager" | "admin";
    lastActiveAt: string | null;
    groupsUrl: string;
    learnerReportUrl: string;
    favoritesUrl: string;
    articulate360User: boolean;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const UsersResponseSchema: z.ZodObject<{
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        role: z.ZodEnum<["learner", "manager", "admin"]>;
        lastActiveAt: z.ZodNullable<z.ZodString>;
        groupsUrl: z.ZodString;
        learnerReportUrl: z.ZodString;
        favoritesUrl: z.ZodString;
        articulate360User: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "learner" | "manager" | "admin";
        lastActiveAt: string | null;
        groupsUrl: string;
        learnerReportUrl: string;
        favoritesUrl: string;
        articulate360User: boolean;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "learner" | "manager" | "admin";
        lastActiveAt: string | null;
        groupsUrl: string;
        learnerReportUrl: string;
        favoritesUrl: string;
        articulate360User: boolean;
    }>, "many">;
    nextUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nextUrl: string | null;
    users: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "learner" | "manager" | "admin";
        lastActiveAt: string | null;
        groupsUrl: string;
        learnerReportUrl: string;
        favoritesUrl: string;
        articulate360User: boolean;
    }[];
}, {
    nextUrl: string | null;
    users: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: "learner" | "manager" | "admin";
        lastActiveAt: string | null;
        groupsUrl: string;
        learnerReportUrl: string;
        favoritesUrl: string;
        articulate360User: boolean;
    }[];
}>;
export type UsersResponse = z.infer<typeof UsersResponseSchema>;
export declare const CourseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    coverImageUrl: z.ZodNullable<z.ZodString>;
    authorUrl: z.ZodString;
    courseReportUrl: z.ZodString;
    contentType: z.ZodEnum<["RISE", "STORYLINE", "MICROLEARNING", "IMPORTED"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    coverImageUrl: string | null;
    authorUrl: string;
    courseReportUrl: string;
    contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
}, {
    id: string;
    title: string;
    coverImageUrl: string | null;
    authorUrl: string;
    courseReportUrl: string;
    contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
}>;
export type Course = z.infer<typeof CourseSchema>;
export declare const CoursesResponseSchema: z.ZodObject<{
    courses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        coverImageUrl: z.ZodNullable<z.ZodString>;
        authorUrl: z.ZodString;
        courseReportUrl: z.ZodString;
        contentType: z.ZodEnum<["RISE", "STORYLINE", "MICROLEARNING", "IMPORTED"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        coverImageUrl: string | null;
        authorUrl: string;
        courseReportUrl: string;
        contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
    }, {
        id: string;
        title: string;
        coverImageUrl: string | null;
        authorUrl: string;
        courseReportUrl: string;
        contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
    }>, "many">;
    nextUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nextUrl: string | null;
    courses: {
        id: string;
        title: string;
        coverImageUrl: string | null;
        authorUrl: string;
        courseReportUrl: string;
        contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
    }[];
}, {
    nextUrl: string | null;
    courses: {
        id: string;
        title: string;
        coverImageUrl: string | null;
        authorUrl: string;
        courseReportUrl: string;
        contentType: "RISE" | "STORYLINE" | "MICROLEARNING" | "IMPORTED";
    }[];
}>;
export type CoursesResponse = z.infer<typeof CoursesResponseSchema>;
export declare const GroupSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    membersUrl: z.ZodString;
    reportersUrl: z.ZodString;
    managersUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    membersUrl: string;
    reportersUrl: string;
    managersUrl: string;
}, {
    id: string;
    name: string;
    membersUrl: string;
    reportersUrl: string;
    managersUrl: string;
}>;
export type Group = z.infer<typeof GroupSchema>;
export declare const GroupsResponseSchema: z.ZodObject<{
    groups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        membersUrl: z.ZodString;
        reportersUrl: z.ZodString;
        managersUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        membersUrl: string;
        reportersUrl: string;
        managersUrl: string;
    }, {
        id: string;
        name: string;
        membersUrl: string;
        reportersUrl: string;
        managersUrl: string;
    }>, "many">;
    nextUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    nextUrl: string | null;
    groups: {
        id: string;
        name: string;
        membersUrl: string;
        reportersUrl: string;
        managersUrl: string;
    }[];
}, {
    nextUrl: string | null;
    groups: {
        id: string;
        name: string;
        membersUrl: string;
        reportersUrl: string;
        managersUrl: string;
    }[];
}>;
export type GroupsResponse = z.infer<typeof GroupsResponseSchema>;
export declare const ErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
}, {
    code: string;
    message: string;
}>;
export declare const ErrorResponseSchema: z.ZodObject<{
    errors: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
    }, {
        code: string;
        message: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    errors: {
        code: string;
        message: string;
    }[];
}, {
    errors: {
        code: string;
        message: string;
    }[];
}>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export declare const ListUsersInputSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    email: z.ZodOptional<z.ZodString>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}, {
    email?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}>;
export declare const GetUserInputSchema: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export declare const DeleteUserInputSchema: z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>;
export declare const ListCoursesInputSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    contentType: z.ZodOptional<z.ZodEnum<["rise", "storyline", "microlearning", "imported", "all"]>>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    contentType?: "rise" | "storyline" | "microlearning" | "imported" | "all" | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}, {
    contentType?: "rise" | "storyline" | "microlearning" | "imported" | "all" | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}>;
export declare const GetCourseInputSchema: z.ZodObject<{
    courseId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    courseId: string;
}, {
    courseId: string;
}>;
export declare const ListGroupsInputSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}, {
    name?: string | undefined;
    limit?: number | undefined;
    cursor?: string | undefined;
}>;
export declare const GetGroupInputSchema: z.ZodObject<{
    groupId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupId: string;
}, {
    groupId: string;
}>;
export declare const CreateGroupInputSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const UpdateGroupInputSchema: z.ZodObject<{
    groupId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    groupId: string;
}, {
    name: string;
    groupId: string;
}>;
export declare const DeleteGroupInputSchema: z.ZodObject<{
    groupId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    groupId: string;
}, {
    groupId: string;
}>;
export declare const EnrollUserInputSchema: z.ZodObject<{
    courseId: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    courseId: string;
}, {
    userId: string;
    courseId: string;
}>;
export declare const UnenrollUserInputSchema: z.ZodObject<{
    courseId: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    courseId: string;
}, {
    userId: string;
    courseId: string;
}>;
export declare const GetUserGroupsInputSchema: z.ZodObject<{
    userId: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
}, {
    userId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
}>;
export declare const GetGroupUsersInputSchema: z.ZodObject<{
    groupId: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    cursor: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    groupId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
}, {
    groupId: string;
    limit?: number | undefined;
    cursor?: string | undefined;
}>;
export interface ApiRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    params?: Record<string, string | number>;
    body?: any;
}
export interface PaginatedResponse<T> {
    data: T[];
    nextUrl: string | null;
}
//# sourceMappingURL=types.d.ts.map