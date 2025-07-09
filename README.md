# Reach 360 MCP Server

A Model Context Protocol (MCP) server that provides AI applications with access to Reach 360 LMS functionality through standardized tools and resources.

## Features

### Tools
- **User Management**: List, get, and delete users
- **Course Management**: List and get course details
- **Group Management**: Create, read, update, and delete groups
- **Enrollment Management**: Enroll/unenroll users in courses, manage group memberships

### Resources
- Access to user, course, and group data through standardized URIs
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

1. Install dependencies:
```bash
npm install @modelcontextprotocol/sdk node-fetch zod dotenv
npm install -D typescript @types/node
