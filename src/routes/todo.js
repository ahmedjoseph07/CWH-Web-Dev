import express from 'express';
import todoController from '../controllers/todoControl.js';

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.readTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id/complete', todoController.completeTodo);

export default router;
