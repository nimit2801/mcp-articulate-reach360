# mcp-articulate-reach360

A Model Context Protocol (MCP) server and CLI that provides AI applications with access to Articulate Reach 360 LMS functionality through standardized tools and resources.

## Features

### Tools

- **User Management**: List, get, and delete users
- **Course Management**: List and get course details
- **Group Management**: Create, read, update, and delete groups
- **Enrollment Management**: Enroll/unenroll users in courses, manage group memberships
- **Reports Management**: Activity, course, learner, group courses, and learning path reports

### Resources

- Access to user, course, group, and report data through standardized URIs
- Support for both individual and bulk data access
- Real-time data from Reach 360 API

### Key Capabilities

- ✅ Bearer token authentication
- ✅ Support for both US and EU endpoints
- ✅ Comprehensive error handling
- ✅ Cursor-based pagination support
- ✅ Type safety with TypeScript and Zod validation
- ✅ API versioning support
- ✅ MCP protocol compliance

## Installation

Install globally with npm:

```bash
npm install -g mcp-articulate-reach360
```

Or use directly with npx:

```bash
npx mcp-articulate-reach360
```

## Environment Setup

Set your Reach360 API key as an environment variable:

```bash
export REACH360_API_KEY=your_actual_api_key
```

Or create a `.env` file in your working directory:

```
REACH360_API_KEY=your_actual_api_key
```

## Usage

Start the MCP server:

```bash
npx mcp-articulate-reach360
```

## Supported Tools

- **list_users**: List all users in the Reach 360 account (with optional email filter)
- **get_user**: Get details of a specific user by ID
- **delete_user**: Delete a user (limited to non-SSO learners)
- **list_courses**: List all courses (with optional content type filter)
- **get_course**: Get details of a specific course by ID
- **list_groups**: List all groups (with optional name filter)
- **get_group**: Get details of a specific group by ID
- **create_group**: Create a new group
- **update_group**: Update group name
- **delete_group**: Delete a group
- **enroll_user_in_course**: Enroll a user in a course
- **unenroll_user_from_course**: Unenroll a user from a course
- **get_user_groups**: Get groups that a user belongs to
- **get_group_users**: Get users in a specific group
- **get_activity_report**: Get user activity report (list of user sessions)
- **get_course_report**: Get course learner report (list of learner sessions for a specific course)
- **get_learner_report**: Get learner course report (list of course sessions for a specific learner)
- **get_group_courses_report**: Get group courses report (list of course sessions in a group)
- **get_learning_path_courses_report**: Get learning path courses report (list of courses in a learning path)
- **get_learning_path_learners_report**: Get learning path learners report (list of learner sessions in a learning path)

## Example Prompts

Here are some example prompts you can use to get started:

- List all users from the Reach360 account.
- Get details of the user with email "john.doe@example.com".
- List all groups in the Reach360 account.
- Get details of the group named "Employees".
- List all courses available in Reach360.
- Get details of the course with ID "abc123".
- Enroll the user with email "jane.doe@example.com" in the course "Onboarding 101".
- Unenroll the user with email "jane.doe@example.com" from the course "Onboarding 101".
- Create a new group named "New Hires".
- Delete the user with email "john.doe@example.com" from the Reach360 account.

## License

MIT
