const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos
// app.post('/todos', (req, res) => {
//   const { title } = req.body;
//   if (!title) {
//     return res.status(400).json({ error: 'Title is required' });
//   }
//   const newTodo = { id: Date.now(), title };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });

// POST /todos
app.post('/todos', (req, res) => {
  const newTodos = req.body;
  if (!Array.isArray(newTodos)) {
    return res.status(400).json({ error: 'Data must be an array' });
  }
  
  // Loop through each new todo and add it to the todos array
  newTodos.forEach(todo => {
    const { id, title } = todo;
    if (!title) {
      return res.status(400).json({ error: 'Title is required for each todo' });
    }
    todos.push({ id, title });
  });

  res.status(201).json({ message: 'Todos added successfully' });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
