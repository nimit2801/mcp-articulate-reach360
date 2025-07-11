# Reach 360 MCP Server

## Overview

This is a Model Context Protocol (MCP) server that provides AI applications with standardized access to Reach 360 LMS (Learning Management System) functionality. The server acts as a bridge between AI applications and the Reach 360 API, exposing user management, course management, group management, and enrollment capabilities through the MCP protocol.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### July 11, 2025
- ✅ Added comprehensive Reports API functionality to the MCP server
- ✅ Implemented 6 new report tools: activity, course, learner, group courses, learning path courses, and learning path learners reports
- ✅ Added report resource providers for standardized URI-based report access
- ✅ Extended type definitions with complete report schemas and validation
- ✅ Updated server to handle pagination limits up to 2000 for reports (as per API specification)
- ✅ Server successfully rebuilt and running with all new reports functionality

### July 9, 2025
- ✅ Successfully built and deployed a fully functional MCP server for Reach 360 LMS
- ✅ Configured TypeScript compilation for CommonJS compatibility
- ✅ Replaced node-fetch with built-in Node.js HTTP(S) modules for better CommonJS support
- ✅ Implemented comprehensive error handling and API authentication
- ✅ Server now running successfully with proper environment variable configuration

## System Architecture

### Backend Architecture
The application follows a modular TypeScript architecture built around the Model Context Protocol (MCP) framework:

- **MCP Server Core**: Uses the `@modelcontextprotocol/sdk` to provide standardized tool and resource interfaces
- **API Client Layer**: Custom `Reach360Client` class handles HTTP communication with the Reach 360 API
- **Tool Modules**: Separate classes for different functional areas (Users, Courses, Groups, Enrollments)
- **Resource Provider**: Exposes data through standardized URI-based resources
- **Type Safety**: Comprehensive Zod schemas for runtime validation and TypeScript types

### Communication Pattern
- **Stdio Transport**: Uses standard input/output for communication with AI applications
- **JSON-based Protocol**: All data exchange follows MCP's JSON schema requirements
- **RESTful API Integration**: Makes HTTP requests to Reach 360's REST API endpoints

## Key Components

### 1. Core Server (`src/index.ts`)
- Main MCP server setup and request routing
- Integrates all tool modules and resource providers
- Handles server lifecycle and error management

### 2. API Client (`src/client.ts`)
- HTTP client wrapper for Reach 360 API
- Handles authentication, error parsing, and response validation
- Supports both US and EU regional endpoints

### 3. Tool Modules
- **UserTools** (`src/tools/users.ts`): List, get, and delete users
- **CourseTools** (`src/tools/courses.ts`): List and get course information
- **GroupTools** (`src/tools/groups.ts`): Full CRUD operations for groups
- **EnrollmentTools** (`src/tools/enrollments.ts`): Manage course enrollments and group memberships
- **ReportTools** (`src/tools/reports.ts`): Comprehensive reporting functionality including activity, course, learner, group, and learning path reports

### 4. Resource Provider (`src/resources/index.ts`)
- Exposes data through standardized URIs like `reach360://users` and `reach360://user/{userId}`
- Provides both collection and individual resource access
- Supports dynamic resource resolution

### 5. Configuration (`src/config.ts`)
- Environment-based configuration management
- Supports multiple regions (US/EU)
- API versioning support

## Data Flow

1. **AI Application Request**: AI application sends MCP request via stdio
2. **Server Routing**: Main server routes request to appropriate tool or resource handler
3. **API Translation**: Tool modules translate MCP requests to Reach 360 API calls
4. **HTTP Request**: Client makes authenticated HTTP request to Reach 360 API
5. **Response Validation**: Response data is validated against Zod schemas
6. **MCP Response**: Validated data is formatted according to MCP protocol and returned

### Authentication Flow
- Bearer token authentication using `REACH360_API_KEY` environment variable
- Token passed in Authorization header for all API requests
- Regional endpoint selection based on `REACH360_REGION` configuration

## External Dependencies

### Runtime Dependencies
- **@modelcontextprotocol/sdk**: Core MCP framework for building protocol-compliant servers
- **node-fetch**: HTTP client for making API requests to Reach 360
- **zod**: Runtime type validation and schema definition
- **dotenv**: Environment variable management

### Development Dependencies
- **TypeScript**: Type safety and modern JavaScript features
- **@types/node**: Node.js type definitions

### External APIs
- **Reach 360 API**: Primary data source for LMS functionality
  - Supports US endpoint (api.reach360.com) and EU endpoint (api.reach360.eu)
  - Uses API versioning (default: 2023-04-04)
  - Requires bearer token authentication

## Deployment Strategy

### Environment Configuration
The application requires the following environment variables:
- `REACH360_API_KEY`: Required bearer token for API authentication
- `REACH360_REGION`: Optional region selector (us/eu, defaults to us)
- `REACH360_API_VERSION`: Optional API version (defaults to 2023-04-04)

### Runtime Requirements
- Node.js 18+ (as specified by MCP SDK requirements)
- Standard input/output availability for MCP communication
- Network access to reach360.com or reach360.eu APIs

### Integration Pattern
The server is designed to be consumed by AI applications that support the MCP protocol. It runs as a standalone process that communicates via stdio, making it suitable for:
- Local development environments
- Containerized deployments
- Integration with AI development platforms like Replit

### Error Handling Strategy
- Comprehensive error parsing from Reach 360 API responses
- Graceful degradation with meaningful error messages
- Type-safe error handling throughout the application stack
- MCP-compliant error response formatting