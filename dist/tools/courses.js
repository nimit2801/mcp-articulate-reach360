"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTools = void 0;
const types_1 = require("../types");
const pagination_1 = require("../utils/pagination");
class CourseTools {
    client;
    constructor(client) {
        this.client = client;
    }
    async listCourses(args) {
        const input = types_1.ListCoursesInputSchema.parse(args);
        const params = (0, pagination_1.buildPaginationParams)(input);
        if (input.contentType) {
            params.contentType = input.contentType;
        }
        const response = await this.client.get("/courses", params);
        const parsed = types_1.CoursesResponseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        courses: parsed.courses,
                        nextUrl: parsed.nextUrl,
                        total: parsed.courses.length,
                    }, null, 2),
                },
            ],
        };
    }
    async getCourse(args) {
        const input = types_1.GetCourseInputSchema.parse(args);
        const response = await this.client.get(`/courses/${input.courseId}`);
        const course = types_1.CourseSchema.parse(response);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(course, null, 2),
                },
            ],
        };
    }
}
exports.CourseTools = CourseTools;
//# sourceMappingURL=courses.js.map