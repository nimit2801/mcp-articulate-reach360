import { Reach360Client } from "../client";
import {
  ActivityReportInputSchema,
  CourseReportInputSchema,
  LearnerReportInputSchema,
  GroupCoursesReportInputSchema,
  LearningPathCoursesReportInputSchema,
  LearningPathLearnersReportInputSchema,
  ActivityReportResponseSchema,
  CourseReportResponseSchema,
  LearnerReportResponseSchema,
  GroupCoursesReportResponseSchema,
  LearningPathCoursesReportResponseSchema,
  LearningPathLearnersReportResponseSchema,
} from "../types";
import { buildPaginationParams } from "../utils/pagination";

export class ReportTools {
  constructor(private client: Reach360Client) {}

  async getActivityReport(args: any) {
    const input = ActivityReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get("/reports/activity", params);
    const parsed = ActivityReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            activities: parsed.activities,
            nextUrl: parsed.nextUrl,
            total: parsed.activities.length,
          }, null, 2),
        },
      ],
    };
  }

  async getCourseReport(args: any) {
    const input = CourseReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/reports/courses/${input.courseId}`, params);
    const parsed = CourseReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            courseId: input.courseId,
            courseDeleted: parsed.courseDeleted,
            courseUrl: parsed.courseUrl,
            learners: parsed.learners,
            nextUrl: parsed.nextUrl,
            total: parsed.learners.length,
          }, null, 2),
        },
      ],
    };
  }

  async getLearnerReport(args: any) {
    const input = LearnerReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/reports/learners/${input.userId}`, params);
    const parsed = LearnerReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            userId: input.userId,
            userDeleted: parsed.userDeleted,
            userUrl: parsed.userUrl,
            courses: parsed.courses,
            nextUrl: parsed.nextUrl,
            total: parsed.courses.length,
          }, null, 2),
        },
      ],
    };
  }

  async getGroupCoursesReport(args: any) {
    const input = GroupCoursesReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/reports/groups/${input.groupId}/courses`, params);
    const parsed = GroupCoursesReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            groupId: input.groupId,
            groupDeleted: parsed.groupDeleted,
            groupUrl: parsed.groupUrl,
            courses: parsed.courses,
            nextUrl: parsed.nextUrl,
            total: parsed.courses.length,
          }, null, 2),
        },
      ],
    };
  }

  async getLearningPathCoursesReport(args: any) {
    const input = LearningPathCoursesReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/reports/learning-paths/${input.learningPathId}/courses`, params);
    const parsed = LearningPathCoursesReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            learningPathId: input.learningPathId,
            learningPathDeleted: parsed.learningPathDeleted,
            learningPathUrl: parsed.learningPathUrl,
            learnersReportUrl: parsed.learnersReportUrl,
            courses: parsed.courses,
            nextUrl: parsed.nextUrl,
            total: parsed.courses.length,
          }, null, 2),
        },
      ],
    };
  }

  async getLearningPathLearnersReport(args: any) {
    const input = LearningPathLearnersReportInputSchema.parse(args);
    const params = buildPaginationParams(input);

    const response = await this.client.get(`/reports/learning-paths/${input.learningPathId}/learners`, params);
    const parsed = LearningPathLearnersReportResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            learningPathId: input.learningPathId,
            learningPathUrl: parsed.learningPathUrl,
            coursesReportUrl: parsed.coursesReportUrl,
            learners: parsed.learners,
            nextUrl: parsed.nextUrl,
            total: parsed.learners.length,
          }, null, 2),
        },
      ],
    };
  }
}