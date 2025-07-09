import { Reach360Client } from "../client";
import {
  ListCoursesInputSchema,
  GetCourseInputSchema,
  CoursesResponseSchema,
  CourseSchema,
} from "../types";
import { buildPaginationParams } from "../utils/pagination";

export class CourseTools {
  constructor(private client: Reach360Client) {}

  async listCourses(args: any) {
    const input = ListCoursesInputSchema.parse(args);
    const params = buildPaginationParams(input);

    if (input.contentType) {
      params.contentType = input.contentType;
    }

    const response = await this.client.get("/courses", params);
    const parsed = CoursesResponseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            courses: parsed.courses,
            nextUrl: parsed.nextUrl,
            total: parsed.courses.length,
          }, null, 2),
        },
      ],
    };
  }

  async getCourse(args: any) {
    const input = GetCourseInputSchema.parse(args);
    
    const response = await this.client.get(`/courses/${input.courseId}`);
    const course = CourseSchema.parse(response);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(course, null, 2),
        },
      ],
    };
  }
}
