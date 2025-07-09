import { z } from "zod";

// API Configuration
export const ConfigSchema = z.object({
  apiKey: z.string(),
  baseUrl: z.string().url(),
  apiVersion: z.string().optional().default("2023-04-04"),
});

export type Config = z.infer<typeof ConfigSchema>;

// Common API Response Types
export const PaginationSchema = z.object({
  nextUrl: z.string().nullable(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// User Types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["learner", "manager", "admin"]),
  lastActiveAt: z.string().nullable(),
  groupsUrl: z.string().url(),
  learnerReportUrl: z.string().url(),
  favoritesUrl: z.string().url(),
  articulate360User: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
  nextUrl: z.string().nullable(),
});

export type UsersResponse = z.infer<typeof UsersResponseSchema>;

// Course Types
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  coverImageUrl: z.string().nullable(),
  authorUrl: z.string().url(),
  courseReportUrl: z.string().url(),
  contentType: z.enum(["RISE", "STORYLINE", "MICROLEARNING", "IMPORTED"]),
});

export type Course = z.infer<typeof CourseSchema>;

export const CoursesResponseSchema = z.object({
  courses: z.array(CourseSchema),
  nextUrl: z.string().nullable(),
});

export type CoursesResponse = z.infer<typeof CoursesResponseSchema>;

// Group Types
export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  membersUrl: z.string().url(),
  reportersUrl: z.string().url(),
  managersUrl: z.string().url(),
});

export type Group = z.infer<typeof GroupSchema>;

export const GroupsResponseSchema = z.object({
  groups: z.array(GroupSchema),
  nextUrl: z.string().nullable(),
});

export type GroupsResponse = z.infer<typeof GroupsResponseSchema>;

// Error Types
export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  errors: z.array(ErrorSchema),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Tool Input Schemas
export const ListUsersInputSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  email: z.string().email().optional(),
  cursor: z.string().optional(),
});

export const GetUserInputSchema = z.object({
  userId: z.string(),
});

export const DeleteUserInputSchema = z.object({
  userId: z.string(),
});

export const ListCoursesInputSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  contentType: z.enum(["rise", "storyline", "microlearning", "imported", "all"]).optional(),
  cursor: z.string().optional(),
});

export const GetCourseInputSchema = z.object({
  courseId: z.string(),
});

export const ListGroupsInputSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  name: z.string().optional(),
  cursor: z.string().optional(),
});

export const GetGroupInputSchema = z.object({
  groupId: z.string(),
});

export const CreateGroupInputSchema = z.object({
  name: z.string(),
});

export const UpdateGroupInputSchema = z.object({
  groupId: z.string(),
  name: z.string(),
});

export const DeleteGroupInputSchema = z.object({
  groupId: z.string(),
});

export const EnrollUserInputSchema = z.object({
  courseId: z.string(),
  userId: z.string(),
});

export const UnenrollUserInputSchema = z.object({
  courseId: z.string(),
  userId: z.string(),
});

export const GetUserGroupsInputSchema = z.object({
  userId: z.string(),
  limit: z.number().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

export const GetGroupUsersInputSchema = z.object({
  groupId: z.string(),
  limit: z.number().min(1).max(100).optional(),
  cursor: z.string().optional(),
});

// API Request Types
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
