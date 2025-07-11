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

// Report Input Schemas
export const ActivityReportInputSchema = z.object({
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

export const CourseReportInputSchema = z.object({
  courseId: z.string(),
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

export const LearnerReportInputSchema = z.object({
  userId: z.string(),
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

export const GroupCoursesReportInputSchema = z.object({
  groupId: z.string(),
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

export const LearningPathCoursesReportInputSchema = z.object({
  learningPathId: z.string(),
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

export const LearningPathLearnersReportInputSchema = z.object({
  learningPathId: z.string(),
  limit: z.number().min(1).max(2000).optional(),
  cursor: z.string().optional(),
});

// Report Response Types
export const ActivitySessionSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userUrl: z.string().url(),
  sessionStartedAt: z.string(),
  sessionEndedAt: z.string().nullable(),
  duration: z.string().nullable(),
  courseId: z.string(),
  courseTitle: z.string(),
  courseUrl: z.string().url(),
  contentType: z.string(),
  progress: z.number(),
  status: z.enum(["Not Started", "In Progress", "Complete"]),
});

export const ActivityReportResponseSchema = z.object({
  activities: z.array(ActivitySessionSchema),
  nextUrl: z.string().nullable(),
});

export type ActivityReportResponse = z.infer<typeof ActivityReportResponseSchema>;

export const CourseLearnerSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  learnerReportUrl: z.string().url(),
  userUrl: z.string().url(),
  duration: z.string().nullable(),
  progress: z.number(),
  quizScorePercent: z.number().nullable(),
  dueAt: z.string().nullable(),
  status: z.enum(["Not Started", "In Progress", "Complete"]),
  userDeleted: z.boolean(),
  completedAt: z.string().nullable(),
});

export const CourseReportResponseSchema = z.object({
  courseDeleted: z.boolean(),
  courseUrl: z.string().url(),
  learners: z.array(CourseLearnerSchema),
  nextUrl: z.string().nullable(),
});

export type CourseReportResponse = z.infer<typeof CourseReportResponseSchema>;

export const LearnerCourseSchema = z.object({
  completedAt: z.string().nullable(),
  courseDeleted: z.boolean(),
  courseId: z.string(),
  courseTitle: z.string(),
  courseReportUrl: z.string().url(),
  courseUrl: z.string().url(),
  duration: z.string().nullable(),
  progress: z.number(),
  quizScorePercent: z.number().nullable(),
  dueAt: z.string().nullable(),
  status: z.enum(["Not Started", "In Progress", "Complete"]),
});

export const LearnerReportResponseSchema = z.object({
  userDeleted: z.boolean(),
  userUrl: z.string().url(),
  courses: z.array(LearnerCourseSchema),
  nextUrl: z.string().nullable(),
});

export type LearnerReportResponse = z.infer<typeof LearnerReportResponseSchema>;

export const GroupCourseSchema = z.object({
  courseDeleted: z.boolean(),
  courseId: z.string(),
  courseTitle: z.string(),
  courseUrl: z.string().url(),
  numberOfLessons: z.number(),
  averageDuration: z.string().nullable(),
  courseReportUrl: z.string().url(),
});

export const GroupCoursesReportResponseSchema = z.object({
  groupDeleted: z.boolean(),
  groupUrl: z.string().url(),
  courses: z.array(GroupCourseSchema),
  nextUrl: z.string().nullable(),
});

export type GroupCoursesReportResponse = z.infer<typeof GroupCoursesReportResponseSchema>;

export const LearningPathCourseSchema = z.object({
  courseDeleted: z.boolean(),
  courseId: z.string(),
  courseTitle: z.string(),
  courseUrl: z.string().url(),
  numberOfLessons: z.number(),
  averageDuration: z.string().nullable(),
  courseReportUrl: z.string().url(),
});

export const LearningPathCoursesReportResponseSchema = z.object({
  learningPathDeleted: z.boolean(),
  learningPathUrl: z.string().url(),
  learnersReportUrl: z.string().url(),
  courses: z.array(LearningPathCourseSchema),
  nextUrl: z.string().nullable(),
});

export type LearningPathCoursesReportResponse = z.infer<typeof LearningPathCoursesReportResponseSchema>;

export const LearningPathLearnerSchema = z.object({
  dueAt: z.string().nullable(),
  duration: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  learnerReportUrl: z.string().url(),
  status: z.enum(["Not Started", "In Progress", "Complete"]),
  userDeleted: z.boolean(),
  userId: z.string(),
  userUrl: z.string().url(),
});

export const LearningPathLearnersReportResponseSchema = z.object({
  learningPathUrl: z.string().url(),
  coursesReportUrl: z.string().url(),
  learners: z.array(LearningPathLearnerSchema),
  nextUrl: z.string().nullable(),
});

export type LearningPathLearnersReportResponse = z.infer<typeof LearningPathLearnersReportResponseSchema>;

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
