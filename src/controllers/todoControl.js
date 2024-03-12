import Todo from '../models/Todo';

const todoController = {
    async createTodo(req, res) {
        try {
            const { task } = req.body;
            const newTodo = new Todo({
                user: req.userId,
                task,
            });

            await newTodo.save();

            res.status(201).json({ message: 'Todo created successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async readTodos(req, res) {
        try {
            const todos = await Todo.find({ user: req.userId });
            res.status(200).json({ todos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async updateTodo(req, res) {
        try {
            const { task } = req.body;

            await Todo.findByIdAndUpdate(req.params.id, { task });

            res.status(200).json({ message: 'Todo updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async deleteTodo(req, res) {
        try {
            await Todo.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async completeTodo(req, res) {
        try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            todo.completed = !todo.completed;
            await todo.save();

            res.status(200).json({ message: 'Todo status updated successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

export default todoController;