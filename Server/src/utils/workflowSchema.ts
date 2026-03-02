import { z } from 'zod';

export const StepSchema = z.object({
  id: z.string(),
  type: z.string(),
  condition: z.string().optional(),
});

export const WorkflowSchema = z.object({
  name: z.string(),          // Added this
  trigger: z.string(),       // This was missing from the LLM output
  steps: z.array(StepSchema),
});