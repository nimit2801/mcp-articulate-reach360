"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGroupUsersInputSchema = exports.GetUserGroupsInputSchema = exports.UnenrollUserInputSchema = exports.EnrollUserInputSchema = exports.DeleteGroupInputSchema = exports.UpdateGroupInputSchema = exports.CreateGroupInputSchema = exports.GetGroupInputSchema = exports.ListGroupsInputSchema = exports.GetCourseInputSchema = exports.ListCoursesInputSchema = exports.DeleteUserInputSchema = exports.GetUserInputSchema = exports.ListUsersInputSchema = exports.ErrorResponseSchema = exports.ErrorSchema = exports.GroupsResponseSchema = exports.GroupSchema = exports.CoursesResponseSchema = exports.CourseSchema = exports.UsersResponseSchema = exports.UserSchema = exports.PaginationSchema = exports.ConfigSchema = void 0;
const zod_1 = require("zod");
// API Configuration
exports.ConfigSchema = zod_1.z.object({
    apiKey: zod_1.z.string(),
    baseUrl: zod_1.z.string().url(),
    apiVersion: zod_1.z.string().optional().default("2023-04-04"),
});
// Common API Response Types
exports.PaginationSchema = zod_1.z.object({
    nextUrl: zod_1.z.string().nullable(),
});
// User Types
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    role: zod_1.z.enum(["learner", "manager", "admin"]),
    lastActiveAt: zod_1.z.string().nullable(),
    groupsUrl: zod_1.z.string().url(),
    learnerReportUrl: zod_1.z.string().url(),
    favoritesUrl: zod_1.z.string().url(),
    articulate360User: zod_1.z.boolean(),
});
exports.UsersResponseSchema = zod_1.z.object({
    users: zod_1.z.array(exports.UserSchema),
    nextUrl: zod_1.z.string().nullable(),
});
// Course Types
exports.CourseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    coverImageUrl: zod_1.z.string().nullable(),
    authorUrl: zod_1.z.string().url(),
    courseReportUrl: zod_1.z.string().url(),
    contentType: zod_1.z.enum(["RISE", "STORYLINE", "MICROLEARNING", "IMPORTED"]),
});
exports.CoursesResponseSchema = zod_1.z.object({
    courses: zod_1.z.array(exports.CourseSchema),
    nextUrl: zod_1.z.string().nullable(),
});
// Group Types
exports.GroupSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    membersUrl: zod_1.z.string().url(),
    reportersUrl: zod_1.z.string().url(),
    managersUrl: zod_1.z.string().url(),
});
exports.GroupsResponseSchema = zod_1.z.object({
    groups: zod_1.z.array(exports.GroupSchema),
    nextUrl: zod_1.z.string().nullable(),
});
// Error Types
exports.ErrorSchema = zod_1.z.object({
    code: zod_1.z.string(),
    message: zod_1.z.string(),
});
exports.ErrorResponseSchema = zod_1.z.object({
    errors: zod_1.z.array(exports.ErrorSchema),
});
// Tool Input Schemas
exports.ListUsersInputSchema = zod_1.z.object({
    limit: zod_1.z.number().min(1).max(100).optional(),
    email: zod_1.z.string().email().optional(),
    cursor: zod_1.z.string().optional(),
});
exports.GetUserInputSchema = zod_1.z.object({
    userId: zod_1.z.string(),
});
exports.DeleteUserInputSchema = zod_1.z.object({
    userId: zod_1.z.string(),
});
exports.ListCoursesInputSchema = zod_1.z.object({
    limit: zod_1.z.number().min(1).max(100).optional(),
    contentType: zod_1.z.enum(["rise", "storyline", "microlearning", "imported", "all"]).optional(),
    cursor: zod_1.z.string().optional(),
});
exports.GetCourseInputSchema = zod_1.z.object({
    courseId: zod_1.z.string(),
});
exports.ListGroupsInputSchema = zod_1.z.object({
    limit: zod_1.z.number().min(1).max(100).optional(),
    name: zod_1.z.string().optional(),
    cursor: zod_1.z.string().optional(),
});
exports.GetGroupInputSchema = zod_1.z.object({
    groupId: zod_1.z.string(),
});
exports.CreateGroupInputSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.UpdateGroupInputSchema = zod_1.z.object({
    groupId: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.DeleteGroupInputSchema = zod_1.z.object({
    groupId: zod_1.z.string(),
});
exports.EnrollUserInputSchema = zod_1.z.object({
    courseId: zod_1.z.string(),
    userId: zod_1.z.string(),
});
exports.UnenrollUserInputSchema = zod_1.z.object({
    courseId: zod_1.z.string(),
    userId: zod_1.z.string(),
});
exports.GetUserGroupsInputSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    limit: zod_1.z.number().min(1).max(100).optional(),
    cursor: zod_1.z.string().optional(),
});
exports.GetGroupUsersInputSchema = zod_1.z.object({
    groupId: zod_1.z.string(),
    limit: zod_1.z.number().min(1).max(100).optional(),
    cursor: zod_1.z.string().optional(),
});
//# sourceMappingURL=types.js.map