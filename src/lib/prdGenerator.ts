export interface PRDData {
  projectSummary: {
    whatUserWants: string;
    targetAudience: string;
    targetPlatforms: string[];
    expectedOutcomes: string[];
  };
  coreFeatures: {
    title: string;
    description: string;
    userStory: string;
    acceptanceCriteria: string[];
    uxBehavior: string;
    priority: "must" | "should" | "could" | "wont";
  }[];
  systemRequirements: {
    techStack: string[];
    libraries: string[];
    authentication: string;
    database: string;
    deployment: string;
  };
  dataModels: {
    name: string;
    attributes: {
      name: string;
      type: string;
      required: boolean;
      description: string;
    }[];
    relationships: string[];
  }[];
  userFlow: {
    id: string;
    title: string;
    description: string;
  }[];
  mvpScope: {
    must: string[];
    should: string[];
    could: string[];
    wont: string[];
  };
}

export function generateSamplePRD(idea: string): PRDData {
  // This generates a sample PRD structure - in production, this would be AI-generated
  return {
    projectSummary: {
      whatUserWants: idea || "A modern web application",
      targetAudience: "Developers, startups, and tech teams",
      targetPlatforms: ["Web (Desktop)", "Web (Mobile)", "PWA"],
      expectedOutcomes: [
        "Streamlined workflow for target users",
        "Reduced time-to-value by 50%",
        "Intuitive user experience",
        "Scalable architecture",
      ],
    },
    coreFeatures: [
      {
        title: "User Authentication",
        description: "Secure login and registration system with multiple auth providers",
        userStory: "As a user, I want to securely log in so that my data is protected",
        acceptanceCriteria: [
          "Users can register with email/password",
          "OAuth support for Google and GitHub",
          "Password reset functionality",
          "Session management with JWT",
        ],
        uxBehavior: "Smooth transitions between auth states, clear error messaging, loading indicators",
        priority: "must",
      },
      {
        title: "Dashboard",
        description: "Central hub for users to view and manage their data",
        userStory: "As a user, I want a dashboard to quickly see my key metrics",
        acceptanceCriteria: [
          "Display key metrics in cards",
          "Real-time data updates",
          "Responsive layout",
          "Customizable widgets",
        ],
        uxBehavior: "Data loads progressively, skeleton states for loading, smooth animations",
        priority: "must",
      },
      {
        title: "Data Export",
        description: "Export data in multiple formats",
        userStory: "As a user, I want to export my data so I can use it elsewhere",
        acceptanceCriteria: [
          "Export to CSV and JSON",
          "Select date ranges",
          "Include/exclude fields",
        ],
        uxBehavior: "Progress indicator during export, success notification, auto-download",
        priority: "should",
      },
      {
        title: "Notifications",
        description: "In-app and email notifications for important events",
        userStory: "As a user, I want to be notified of important updates",
        acceptanceCriteria: [
          "In-app notification center",
          "Email notifications (configurable)",
          "Push notifications (optional)",
        ],
        uxBehavior: "Non-intrusive toast notifications, notification badge, preference settings",
        priority: "could",
      },
    ],
    systemRequirements: {
      techStack: ["React 18", "TypeScript", "Tailwind CSS", "Supabase"],
      libraries: [
        "react-router-dom",
        "react-query",
        "framer-motion",
        "lucide-react",
        "date-fns",
        "zod",
      ],
      authentication: "Supabase Auth with JWT",
      database: "PostgreSQL (Supabase)",
      deployment: "Vercel / Netlify with CI/CD",
    },
    dataModels: [
      {
        name: "User",
        attributes: [
          { name: "id", type: "uuid", required: true, description: "Unique identifier" },
          { name: "email", type: "string", required: true, description: "User email address" },
          { name: "name", type: "string", required: true, description: "Display name" },
          { name: "avatar_url", type: "string", required: false, description: "Profile picture URL" },
          { name: "created_at", type: "timestamp", required: true, description: "Account creation date" },
        ],
        relationships: ["Project", "Settings"],
      },
      {
        name: "Project",
        attributes: [
          { name: "id", type: "uuid", required: true, description: "Unique identifier" },
          { name: "user_id", type: "uuid", required: true, description: "Owner reference" },
          { name: "title", type: "string", required: true, description: "Project name" },
          { name: "description", type: "text", required: false, description: "Project details" },
          { name: "status", type: "enum", required: true, description: "draft | active | archived" },
          { name: "updated_at", type: "timestamp", required: true, description: "Last modification" },
        ],
        relationships: ["User"],
      },
    ],
    userFlow: [
      { id: "1", title: "Landing", description: "User arrives at landing page" },
      { id: "2", title: "Sign Up", description: "User creates account or logs in" },
      { id: "3", title: "Onboarding", description: "Quick setup wizard" },
      { id: "4", title: "Dashboard", description: "Main workspace view" },
      { id: "5", title: "Create", description: "User creates new content" },
      { id: "6", title: "Export", description: "User exports their work" },
    ],
    mvpScope: {
      must: [
        "User authentication (email/password)",
        "Basic dashboard with metrics",
        "CRUD operations for main entity",
        "Responsive design",
      ],
      should: [
        "OAuth (Google)",
        "Data export (CSV)",
        "Search functionality",
        "Dark mode",
      ],
      could: [
        "Email notifications",
        "Advanced filtering",
        "Collaboration features",
        "API access",
      ],
      wont: [
        "Mobile native app",
        "Offline mode",
        "AI features (phase 2)",
        "White-label customization",
      ],
    },
  };
}

export function generateCursorPrompt(prd: PRDData): string {
  return `You are Cursor. Build the following app.

## Project Overview
${prd.projectSummary.whatUserWants}

## Tech Stack
- ${prd.systemRequirements.techStack.join("\n- ")}

## Libraries
- ${prd.systemRequirements.libraries.join("\n- ")}

## Pages
1. Landing Page - Hero section, features overview, CTA
2. Auth Page - Login/Signup forms with validation
3. Dashboard - Main workspace with metrics cards
4. Settings - User preferences and account management

## Core Components
${prd.coreFeatures.filter(f => f.priority === "must").map(f => `- ${f.title}: ${f.description}`).join("\n")}

## Database Models
${prd.dataModels.map(m => `### ${m.name}
${m.attributes.map(a => `- ${a.name}: ${a.type}${a.required ? " (required)" : ""}`).join("\n")}`).join("\n\n")}

## Authentication
${prd.systemRequirements.authentication}

## API Routes
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/user - Get current user
- GET /api/projects - List user projects
- POST /api/projects - Create project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

## Acceptance Criteria
${prd.coreFeatures.filter(f => f.priority === "must").flatMap(f => f.acceptanceCriteria.map(c => `- ${c}`)).join("\n")}

Build this app step by step, starting with the project setup and authentication.`;
}

export function generateReplitSteps(prd: PRDData): string {
  return `Agent: Build this app step-by-step.

## Step 1: Setup Project
Initialize a new React + TypeScript project with Vite. Install these dependencies:
${prd.systemRequirements.libraries.map(l => `- ${l}`).join("\n")}

## Step 2: Configure Design System
Set up Tailwind CSS with custom colors and typography. Create a consistent design system with:
- Primary color scheme
- Typography scale
- Spacing system
- Component variants

## Step 3: Implement Authentication
Set up ${prd.systemRequirements.authentication}:
- Create auth context and hooks
- Build login/signup forms
- Implement session management
- Add protected routes

## Step 4: Create Database Schema
Using ${prd.systemRequirements.database}:
${prd.dataModels.map(m => `
### ${m.name} Table
${m.attributes.map(a => `- ${a.name}: ${a.type}`).join("\n")}`).join("\n")}

## Step 5: Build Core Features
${prd.coreFeatures.filter(f => f.priority === "must").map((f, i) => `
### ${i + 1}. ${f.title}
${f.description}

User Story: ${f.userStory}

Acceptance Criteria:
${f.acceptanceCriteria.map(c => `- ${c}`).join("\n")}`).join("\n")}

## Step 6: Implement User Flow
${prd.userFlow.map((step, i) => `${i + 1}. ${step.title}: ${step.description}`).join("\n")}

## Step 7: Add Polish
- Implement loading states and skeletons
- Add error handling and toast notifications
- Ensure responsive design
- Add animations with Framer Motion

## Step 8: Test & Deploy
- Test all user flows
- Fix any edge cases
- Deploy to ${prd.systemRequirements.deployment}`;
}

export function generateMarkdown(prd: PRDData): string {
  return `# Product Requirements Document

## 1. Project Summary

**What the user wants:** ${prd.projectSummary.whatUserWants}

**Target Audience:** ${prd.projectSummary.targetAudience}

**Target Platforms:**
${prd.projectSummary.targetPlatforms.map(p => `- ${p}`).join("\n")}

**Expected Outcomes:**
${prd.projectSummary.expectedOutcomes.map(o => `- ${o}`).join("\n")}

---

## 2. Core Features

${prd.coreFeatures.map(f => `### ${f.title} [${f.priority.toUpperCase()}]

${f.description}

**User Story:** ${f.userStory}

**Acceptance Criteria:**
${f.acceptanceCriteria.map(c => `- [ ] ${c}`).join("\n")}

**UX Behavior:** ${f.uxBehavior}
`).join("\n---\n\n")}

---

## 3. System Requirements

**Tech Stack:**
${prd.systemRequirements.techStack.map(t => `- ${t}`).join("\n")}

**Libraries:**
${prd.systemRequirements.libraries.map(l => `- ${l}`).join("\n")}

**Authentication:** ${prd.systemRequirements.authentication}

**Database:** ${prd.systemRequirements.database}

**Deployment:** ${prd.systemRequirements.deployment}

---

## 4. Data Models

${prd.dataModels.map(m => `### ${m.name}

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
${m.attributes.map(a => `| ${a.name} | ${a.type} | ${a.required ? "Yes" : "No"} | ${a.description} |`).join("\n")}

**Relationships:** ${m.relationships.join(", ") || "None"}
`).join("\n")}

---

## 5. User Flow

${prd.userFlow.map((s, i) => `${i + 1}. **${s.title}** - ${s.description}`).join("\n")}

---

## 6. MVP Scope (MoSCoW)

### Must Have
${prd.mvpScope.must.map(m => `- ${m}`).join("\n")}

### Should Have
${prd.mvpScope.should.map(s => `- ${s}`).join("\n")}

### Could Have
${prd.mvpScope.could.map(c => `- ${c}`).join("\n")}

### Won't Have (This Release)
${prd.mvpScope.wont.map(w => `- ${w}`).join("\n")}
`;
}
