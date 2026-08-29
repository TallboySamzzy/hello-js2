require('dotenv').config();

const express = require('express');
const app = express();

// Body parsing middleware
app.use(express.json());

// Our todos
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build CRUD API', completed: false }
];

// GET all todos
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// GET one todo
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
});

// POST - Add a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }

    const newTodo = {
        id: todos.length + 1,
        task: task,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// PATCH - Update a todo
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    Object.assign(todo, req.body);

    res.status(200).json(todo);
});

// DELETE - Remove a todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const initialLength = todos.length;

    todos = todos.filter((t) => t.id !== id);

    if (todos.length === initialLength) {
        return res.status(404).json({ error: 'Not found' });
    }

    res.status(204).send();
});

// Bonus: Get only incomplete todos
app.get('/todos/active', (req, res) => {
    const activeTodos = todos.filter((t) => t.completed === false);

    res.status(200).json(activeTodos);
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});