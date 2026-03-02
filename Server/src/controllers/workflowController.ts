
import { Request, Response } from 'express';
import { createWorkflowService } from '../services/workflowService.js';
import { runWorkflowService } from '../services/executionService.js';

export const handleCreateWorkflow = async (req: Request, res: Response) => {
  try {
    // Expecting prompt and userId (from your auth middleware)
    const { prompt, userId } = req.body;
    
    if (!prompt || !userId) {
      return res.status(400).json({ error: 'Prompt and userId are required' });
    }

    const workflow = await createWorkflowService(prompt, userId);
    res.status(201).json(workflow);
  } catch (error: any) {
    console.error('Workflow creation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate workflow' });
  }
};

export const executeWorkflowController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await runWorkflowService(id);
    res.status(200).json({ message: 'Workflow executed successfully', result });
  } catch (error: any) {
    console.error('Execution error:', error);
    res.status(500).json({ error: error.message || 'Failed to run workflow' });
  }
};

