import { Reach360Client } from "../client";

export class ResourceProvider {
  constructor(private client: Reach360Client) {}

  async listResources() {
    return {
      resources: [
        {
          uri: "reach360://users",
          name: "All Users",
          description: "Complete list of all users in the Reach 360 account",
          mimeType: "application/json",
        },
        {
          uri: "reach360://courses",
          name: "All Courses",
          description: "Complete list of all courses in the Reach 360 account",
          mimeType: "application/json",
        },
        {
          uri: "reach360://groups",
          name: "All Groups",
          description: "Complete list of all groups in the Reach 360 account",
          mimeType: "application/json",
        },
        {
          uri: "reach360://user/{userId}",
          name: "User Details",
          description: "Detailed information about a specific user",
          mimeType: "application/json",
        },
        {
          uri: "reach360://course/{courseId}",
          name: "Course Details",
          description: "Detailed information about a specific course",
          mimeType: "application/json",
        },
        {
          uri: "reach360://group/{groupId}",
          name: "Group Details",
          description: "Detailed information about a specific group",
          mimeType: "application/json",
        },
        {
          uri: "reach360://user/{userId}/groups",
          name: "User Groups",
          description: "Groups that a specific user belongs to",
          mimeType: "application/json",
        },
        {
          uri: "reach360://group/{groupId}/users",
          name: "Group Members",
          description: "Users that belong to a specific group",
          mimeType: "application/json",
        },
        // Report resources
        {
          uri: "reach360://reports/activity",
          name: "Activity Report",
          description: "User activity report showing all user sessions",
          mimeType: "application/json",
        },
        {
          uri: "reach360://reports/course/{courseId}",
          name: "Course Report",
          description: "Course learner report showing learner sessions for a specific course",
          mimeType: "application/json",
        },
        {
          uri: "reach360://reports/learner/{userId}",
          name: "Learner Report",
          description: "Learner course report showing course sessions for a specific learner",
          mimeType: "application/json",
        },
        {
          uri: "reach360://reports/group/{groupId}/courses",
          name: "Group Courses Report",
          description: "Group courses report showing course sessions in a group",
          mimeType: "application/json",
        },
        {
          uri: "reach360://reports/learning-path/{learningPathId}/courses",
          name: "Learning Path Courses Report",
          description: "Learning path courses report showing courses in a learning path",
          mimeType: "application/json",
        },
        {
          uri: "reach360://reports/learning-path/{learningPathId}/learners",
          name: "Learning Path Learners Report",
          description: "Learning path learners report showing learner sessions in a learning path",
          mimeType: "application/json",
        },
      ],
    };
  }

  async readResource(uri: string) {
    const uriParts = uri.replace("reach360://", "").split("/");
    
    try {
      switch (uriParts[0]) {
        case "users":
          if (uriParts.length === 1) {
            // Get all users
            const response = await this.client.get("/users", { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 2) {
            // Get specific user
            const userId = uriParts[1];
            const response = await this.client.get(`/users/${userId}`);
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "courses":
          if (uriParts.length === 1) {
            // Get all courses
            const response = await this.client.get("/courses", { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "course":
          if (uriParts.length === 2) {
            // Get specific course
            const courseId = uriParts[1];
            const response = await this.client.get(`/courses/${courseId}`);
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "groups":
          if (uriParts.length === 1) {
            // Get all groups
            const response = await this.client.get("/groups", { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "group":
          if (uriParts.length === 2) {
            // Get specific group
            const groupId = uriParts[1];
            const response = await this.client.get(`/groups/${groupId}`);
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 3 && uriParts[2] === "users") {
            // Get group users
            const groupId = uriParts[1];
            const response = await this.client.get(`/groups/${groupId}/users`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "user":
          if (uriParts.length === 3 && uriParts[2] === "groups") {
            // Get user groups
            const userId = uriParts[1];
            const response = await this.client.get(`/users/${userId}/groups`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        case "reports":
          if (uriParts.length === 2 && uriParts[1] === "activity") {
            // Get activity report
            const response = await this.client.get("/reports/activity", { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 3 && uriParts[1] === "course") {
            // Get course report
            const courseId = uriParts[2];
            const response = await this.client.get(`/reports/courses/${courseId}`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 3 && uriParts[1] === "learner") {
            // Get learner report
            const userId = uriParts[2];
            const response = await this.client.get(`/reports/learners/${userId}`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 4 && uriParts[1] === "group" && uriParts[3] === "courses") {
            // Get group courses report
            const groupId = uriParts[2];
            const response = await this.client.get(`/reports/groups/${groupId}/courses`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 4 && uriParts[1] === "learning-path" && uriParts[3] === "courses") {
            // Get learning path courses report
            const learningPathId = uriParts[2];
            const response = await this.client.get(`/reports/learning-paths/${learningPathId}/courses`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          } else if (uriParts.length === 4 && uriParts[1] === "learning-path" && uriParts[3] === "learners") {
            // Get learning path learners report
            const learningPathId = uriParts[2];
            const response = await this.client.get(`/reports/learning-paths/${learningPathId}/learners`, { limit: 100 });
            return {
              contents: [
                {
                  uri,
                  mimeType: "application/json",
                  text: JSON.stringify(response, null, 2),
                },
              ],
            };
          }
          break;

        default:
          throw new Error(`Unknown resource type: ${uriParts[0]}`);
      }

      throw new Error(`Invalid resource URI format: ${uri}`);
    } catch (error) {
      throw new Error(`Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
