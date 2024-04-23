const express = require("express");
const app = express();
const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
let data = JSON.parse(fs.readFileSync("data.json"));

console.log(data);

const statusRank = {
  "TO DO": 1,
  "In Progress": 2,
  Completed: 3,
};

app.get("/tasks", (req, res) => {
  try {
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
});

// POST route to add a new task
app.post("/tasks", (req, res) => {
  try {
    const newTask = req.body;
    data.push(newTask);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task", error: error.message });
  }
});

// PUT route to update a task
app.put("/tasks/:id", (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const index = data.findIndex(task => task.id === taskId);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedTask };
      fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
      res.json({ message: "Task updated successfully", task: data[index] });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
});

// DELETE route to delete a task
app.delete("/tasks/:id", (req, res) => {
  try {
    const taskId = req.params.id;
    const index = data.findIndex(task => task.id === taskId);
    if (index !== -1) {
      data.splice(index, 1);
      fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
