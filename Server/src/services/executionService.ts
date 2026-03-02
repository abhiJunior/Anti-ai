import { supabase } from '../config/supabase.js';
import { taskRegistry } from './taskRegistry.js';

export const runWorkflowService = async (workflowId: string) => {
  const { data: workflow } = await supabase.from('workflows').select('definition_json').eq('id', workflowId).single();

  //Shared memory for this run
  const context: Record<string, any> = {};

  for (const step of workflow.definition_json.steps) {
    console.log(`Executing: ${step.id}`);

    const resolvedParams = resolveParams(step.params, context);

    const task = taskRegistry[step.type];

    //Guard against missing tasks
    if (!task) {
      console.error(`Task type '${step.type}' not found in registry!`);
      continue; // Skip this step and move to the next
    }

    const result = await task(resolvedParams);
    context[step.id] = result;
  }

  return context;
};

// Helper function to replace {{step_id.key}} with actual values
function resolveParams(params: any, context: any) {
  // If params are undefined or null, return an empty object immediately
  if (!params) return {};

  const stringified = JSON.stringify(params);
  const resolved = stringified.replace(/\{\{(.*?)\}\}/g, (_, path) => {
    const [stepId, key] = path.split('.');
    return context[stepId]?.[key] || `{{${path}}}`;
  });
  return JSON.parse(resolved);
}