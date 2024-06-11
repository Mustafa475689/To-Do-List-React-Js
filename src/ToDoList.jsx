import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editNewTask, setEditNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the task being edited

  // Function for handling input changes for new task
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Function for handling input changes for edited task
  function handleEditInputChange(event) {
    setEditNewTask(event.target.value);
  }

  // Function for adding a new task
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  // Function for deleting a task
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // Reset editIndex if the task being edited is deleted
    if (editIndex === index) {
      setEditIndex(null);
      setEditNewTask("");
    }
  }

  // Function for editing a task
  function editTask(index) {
    setEditIndex(index); // Set editIndex to the index of the task being edited
    setEditNewTask(tasks[index]); // Set editNewTask to the current task content
  }

  // Function for saving the edited task
  function saveEditedTask() {
    if (editNewTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editNewTask;
      setTasks(updatedTasks);
      setEditIndex(null); // Reset editIndex after saving the edited task
      setEditNewTask(""); // Reset editNewTask after saving
    }
  }

  // Function for moving a task up
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] =
        [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
      if (editIndex === index || editIndex === index - 1) {
        setEditIndex(editIndex - 1); // Update editIndex if the edited task is moved
      }
    }
  }

  // Function for moving a task down
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] =
        [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
      if (editIndex === index || editIndex === index + 1) {
        setEditIndex(editIndex + 1); // Update editIndex if the edited task is moved
      }
    }
  }

  return (
    <div className="to-do-list">
      <h1>ToDo List</h1>
      <div className="div-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                className='edit-input'
                value={editNewTask}
                onChange={handleEditInputChange}
              />
            ) : (
              <span className="text">{task}</span>
            )}
            <button
              className="edit-btn"
              onClick={() => editTask(index)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
            <button
              className="move-btn"
              onClick={() => moveTaskUp(index)}
            >
              👆
            </button>
            <button
              className="move-btn"
              onClick={() => moveTaskDown(index)}
            >
              👇
            </button>
            {editIndex === index && (
              <button
                className="save-btn"
                onClick={saveEditedTask}
              >
                Save
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
