#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const config_1 = require("./config");
const client_1 = require("./client");
const users_1 = require("./tools/users");
const courses_1 = require("./tools/courses");
const groups_1 = require("./tools/groups");
const enrollments_1 = require("./tools/enrollments");
const index_1 = require("./resources/index");
const errors_1 = require("./utils/errors");
class Reach360MCPServer {
    server;
    client;
    userTools;
    courseTools;
    groupTools;
    enrollmentTools;
    resourceProvider;
    constructor() {
        this.server = new index_js_1.Server({
            name: "reach360-mcp-server",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
                resources: {},
            },
        });
        this.client = new client_1.Reach360Client(config_1.config);
        this.userTools = new users_1.UserTools(this.client);
        this.courseTools = new courses_1.CourseTools(this.client);
        this.groupTools = new groups_1.GroupTools(this.client);
        this.enrollmentTools = new enrollments_1.EnrollmentTools(this.client);
        this.resourceProvider = new index_1.ResourceProvider(this.client);
        this.setupHandlers();
    }
    setupHandlers() {
        // List available tools
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
            return {
                tools: [
                    // User management tools
                    {
                        name: "list_users",
                        description: "List all users in the Reach 360 account with optional email filter",
                        inputSchema: {
                            type: "object",
                            properties: {
                                limit: {
                                    type: "number",
                                    description: "Number of results per page (1-100, default 50)",
                                    minimum: 1,
                                    maximum: 100,
                                },
                                email: {
                                    type: "string",
                                    description: "Filter by specific email address",
                                },
                                cursor: {
                                    type: "string",
                                    description: "Pagination cursor for next page",
                                },
                            },
                        },
                    },
                    {
                        name: "get_user",
                        description: "Get details of a specific user by ID",
                        inputSchema: {
                            type: "object",
                            properties: {
                                userId: {
                                    type: "string",
                                    description: "The ID of the user to retrieve",
                                },
                            },
                            required: ["userId"],
                        },
                    },
                    {
                        name: "delete_user",
                        description: "Delete a user (limited to non-SSO learners)",
                        inputSchema: {
                            type: "object",
                            properties: {
                                userId: {
                                    type: "string",
                                    description: "The ID of the user to delete",
                                },
                            },
                            required: ["userId"],
                        },
                    },
                    // Course management tools
                    {
                        name: "list_courses",
                        description: "List all courses with optional content type filter",
                        inputSchema: {
                            type: "object",
                            properties: {
                                limit: {
                                    type: "number",
                                    description: "Number of results per page (1-100, default 50)",
                                    minimum: 1,
                                    maximum: 100,
                                },
                                contentType: {
                                    type: "string",
                                    description: "Filter by content type",
                                    enum: ["rise", "storyline", "microlearning", "imported", "all"],
                                },
                                cursor: {
                                    type: "string",
                                    description: "Pagination cursor for next page",
                                },
                            },
                        },
                    },
                    {
                        name: "get_course",
                        description: "Get details of a specific course by ID",
                        inputSchema: {
                            type: "object",
                            properties: {
                                courseId: {
                                    type: "string",
                                    description: "The ID of the course to retrieve",
                                },
                            },
                            required: ["courseId"],
                        },
                    },
                    // Group management tools
                    {
                        name: "list_groups",
                        description: "List all groups with optional name filter",
                        inputSchema: {
                            type: "object",
                            properties: {
                                limit: {
                                    type: "number",
                                    description: "Number of results per page (1-100, default 50)",
                                    minimum: 1,
                                    maximum: 100,
                                },
                                name: {
                                    type: "string",
                                    description: "Filter by group name",
                                },
                                cursor: {
                                    type: "string",
                                    description: "Pagination cursor for next page",
                                },
                            },
                        },
                    },
                    {
                        name: "get_group",
                        description: "Get details of a specific group by ID",
                        inputSchema: {
                            type: "object",
                            properties: {
                                groupId: {
                                    type: "string",
                                    description: "The ID of the group to retrieve",
                                },
                            },
                            required: ["groupId"],
                        },
                    },
                    {
                        name: "create_group",
                        description: "Create a new group",
                        inputSchema: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "Name of the new group",
                                },
                            },
                            required: ["name"],
                        },
                    },
                    {
                        name: "update_group",
                        description: "Update group name",
                        inputSchema: {
                            type: "object",
                            properties: {
                                groupId: {
                                    type: "string",
                                    description: "The ID of the group to update",
                                },
                                name: {
                                    type: "string",
                                    description: "New name for the group",
                                },
                            },
                            required: ["groupId", "name"],
                        },
                    },
                    {
                        name: "delete_group",
                        description: "Delete a group",
                        inputSchema: {
                            type: "object",
                            properties: {
                                groupId: {
                                    type: "string",
                                    description: "The ID of the group to delete",
                                },
                            },
                            required: ["groupId"],
                        },
                    },
                    // Enrollment management tools
                    {
                        name: "enroll_user_in_course",
                        description: "Enroll a user in a course",
                        inputSchema: {
                            type: "object",
                            properties: {
                                courseId: {
                                    type: "string",
                                    description: "The ID of the course",
                                },
                                userId: {
                                    type: "string",
                                    description: "The ID of the user",
                                },
                            },
                            required: ["courseId", "userId"],
                        },
                    },
                    {
                        name: "unenroll_user_from_course",
                        description: "Unenroll a user from a course",
                        inputSchema: {
                            type: "object",
                            properties: {
                                courseId: {
                                    type: "string",
                                    description: "The ID of the course",
                                },
                                userId: {
                                    type: "string",
                                    description: "The ID of the user",
                                },
                            },
                            required: ["courseId", "userId"],
                        },
                    },
                    {
                        name: "get_user_groups",
                        description: "Get groups that a user belongs to",
                        inputSchema: {
                            type: "object",
                            properties: {
                                userId: {
                                    type: "string",
                                    description: "The ID of the user",
                                },
                                limit: {
                                    type: "number",
                                    description: "Number of results per page (1-100, default 50)",
                                    minimum: 1,
                                    maximum: 100,
                                },
                                cursor: {
                                    type: "string",
                                    description: "Pagination cursor for next page",
                                },
                            },
                            required: ["userId"],
                        },
                    },
                    {
                        name: "get_group_users",
                        description: "Get users in a specific group",
                        inputSchema: {
                            type: "object",
                            properties: {
                                groupId: {
                                    type: "string",
                                    description: "The ID of the group",
                                },
                                limit: {
                                    type: "number",
                                    description: "Number of results per page (1-100, default 50)",
                                    minimum: 1,
                                    maximum: 100,
                                },
                                cursor: {
                                    type: "string",
                                    description: "Pagination cursor for next page",
                                },
                            },
                            required: ["groupId"],
                        },
                    },
                ],
            };
        });
        // Handle tool calls
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    // User tools
                    case "list_users":
                        return await this.userTools.listUsers(args);
                    case "get_user":
                        return await this.userTools.getUser(args);
                    case "delete_user":
                        return await this.userTools.deleteUser(args);
                    // Course tools
                    case "list_courses":
                        return await this.courseTools.listCourses(args);
                    case "get_course":
                        return await this.courseTools.getCourse(args);
                    // Group tools
                    case "list_groups":
                        return await this.groupTools.listGroups(args);
                    case "get_group":
                        return await this.groupTools.getGroup(args);
                    case "create_group":
                        return await this.groupTools.createGroup(args);
                    case "update_group":
                        return await this.groupTools.updateGroup(args);
                    case "delete_group":
                        return await this.groupTools.deleteGroup(args);
                    // Enrollment tools
                    case "enroll_user_in_course":
                        return await this.enrollmentTools.enrollUserInCourse(args);
                    case "unenroll_user_from_course":
                        return await this.enrollmentTools.unenrollUserFromCourse(args);
                    case "get_user_groups":
                        return await this.enrollmentTools.getUserGroups(args);
                    case "get_group_users":
                        return await this.enrollmentTools.getGroupUsers(args);
                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            }
            catch (error) {
                return (0, errors_1.handleError)(error);
            }
        });
        // List available resources
        this.server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => {
            return await this.resourceProvider.listResources();
        });
        // Read resource content
        this.server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
            try {
                return await this.resourceProvider.readResource(request.params.uri);
            }
            catch (error) {
                throw (0, errors_1.handleError)(error);
            }
        });
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error("Reach 360 MCP Server started successfully");
    }
}
async function main() {
    const server = new Reach360MCPServer();
    await server.start();
}
if (require.main === module) {
    main().catch((error) => {
        console.error("Server failed to start:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map