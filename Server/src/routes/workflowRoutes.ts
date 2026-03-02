
import { Router } from 'express';
import { handleCreateWorkflow,executeWorkflowController } from '../controllers/workflowController.js';


const router = Router();
router.post('/', handleCreateWorkflow); // User submits prompt here
// Add this line to your existing router
router.post('/:id/run', executeWorkflowController);
export default router;