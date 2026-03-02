# AI-Powered Workflow Orchestrator

A high-performance, event-driven workflow engine that enables users to define, automate, and monitor complex business processes using Natural Language Processing (NLP) and dynamic task orchestration.

---

## 🚀 Core Architectural Pillars

- **Generative Workflow Logic:** Uses Google Gemini 1.5 Flash to parse user intent into a strict JSON-Schema, ensuring that natural language is transformed into a validated, executable structure.
- **Dynamic Task Orchestration:** A decoupled execution engine that resolves cross-task dependencies using a `{{placeholder}}` syntax, allowing the output of one AI model to serve as the input for the next (e.g., Skill Extraction → Matching → Notification).
- **Registry-Based Extensibility:** A centralized `taskRegistry` that maps dynamic JSON types to backend service functions, making the engine "plugin-ready" for new capabilities.
- **Enterprise-Grade Security:** Leverages Supabase Row-Level Security (RLS) combined with custom JWT-verified backend middleware to ensure data isolation.

---

## 🛠 Tech Stack

| Domain      | Technology                                |
|-------------|-------------------------------------------|
|    |            |
| Backend     | Node.js, Express, TypeScript              |
| Database    | Supabase (PostgreSQL)                     |
| AI          | Google Gemini (Generative AI SDK)         |
| Messaging   | Nodemailer (SMTP - Ethereal/Gmail)        |

---

## 🔗 API Documentation

_All endpoints require a valid Supabase `access_token` in the `Authorization: Bearer` header._

1. **POST** `/api/workflows`  
   Translates prompt to JSON definition and persists to `workflows` table.
2. **GET** `/api/workflows`  
   Retrieves the workflow history for the authenticated user.
3. **POST** `/api/workflows/:id/run`  
   Executes the engine orchestration loop for a specific workflow.
4. **GET** `/api/workflow_runs/:id`  
   Returns the execution status, logs, and final task outputs.

---

## 🏗 System Execution Flow

The system operates on a state-based pipeline to ensure reliability:

1. **Orchestration:** The engine iterates through the `steps` array retrieved from the database.
2. **Context Injection:** Before each task, the `resolveParams` utility traverses the current global context object, performing Regex replacement on dynamic placeholders.
3. **Task Execution:** The `taskRegistry` verifies the task existence and executes the associated service.
4. **Audit Logging:** Every successful run, and every failure, is logged to the `workflow_runs` table, providing full traceability for the user.

---

## 🚀 Setup Guide

### Environment Configuration
Create a `.env` file in your `Server/` root:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_key
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Running the Application

1. **Database:** Execute your SQL schema in Supabase to create `workflows` and `workflow_runs` tables.
2. **Backend:** Run `npm install` followed by `npm run dev` in the `Server/` directory.
3. **Frontend:** Run `npm install` followed by `npm start` in the `client/` directory.

---

## 💡 Key Design Decisions

- **Fail-Safe Loops:** Wrapped execution steps in try/catch blocks to ensure a single task failure does not hang the entire pipeline.
- **Decoupled Logic:** The `emailService` is strictly separated from the `executionService`, allowing for easy swapping between providers (e.g., SendGrid vs. Nodemailer).
- **Security-First:** Used Supabase `getUser` on the backend to validate tokens, ensuring API integrity is independent of the frontend state.
