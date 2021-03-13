import React from 'react';
import './App.scss';
import CategoryList from './CategoryList';
import TaskList from './TaskList';

import data from './data.json';

function getTasksByCategory(categoryId) {
  const tasks = data.tasks;
  return tasks.filter((task) => (task.categoryId === categoryId));
}

function getCategoryById(categoryId) {
  const categories = data.categories;
  return categories.find((category) => (category.id === categoryId));
}

function App() {
  const categories = data.categories;
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(categories[0].id);
  const [visibleTasks, setVisibleTasks] = React.useState(getTasksByCategory(selectedCategoryId));

  const selectedCategory = getCategoryById(selectedCategoryId);

  const handleTaskAdd = (task) => {
    const id = new Date().getTime(); // Unique ID generator (not ideal)
    const newTask = {
      ...task,
      id,
      categoryId: selectedCategoryId
    };
    data.tasks.push(newTask);
    setVisibleTasks(getTasksByCategory(selectedCategoryId));
  }

  const handleTaskCheck = (taskId) => {
    const taskList = data.tasks;
    const selectedTask = taskList.find((task) => (task.id === taskId));
    console.log('before', selectedTask.completed);
    selectedTask.completed = !selectedTask.completed;
    console.log('after', selectedTask.completed);
    setVisibleTasks(getTasksByCategory(selectedCategoryId));
  }

  const handleTaskDelete = (taskId) => {
    const taskList = data.tasks;
    const selectedTaskIdx = taskList.findIndex((task) => (task.id === taskId));
    const newTaskList = [...taskList];
    newTaskList.splice(selectedTaskIdx, 1);
    data.tasks = newTaskList;
    setVisibleTasks(getTasksByCategory(selectedCategoryId));
  }

  const handleCategorySelect = (categoryId) => {
    const taskList = getTasksByCategory(categoryId);
    setSelectedCategoryId(categoryId);
    setVisibleTasks(taskList);
  }

  const handleCategoryAdd = (category) => {
    const id = new Date().getTime();  // Unique ID generator (not ideal)
    const newCategory = {
      ...category,
      id
    }
    data.categories.push(newCategory);
    handleCategorySelect(id);
  }

  return (
    <div className="App">
      <CategoryList
        list={categories}
        selected={selectedCategoryId}
        onSelect={handleCategorySelect}
        onAdd={handleCategoryAdd}
      />
      <TaskList
        title={selectedCategory.name}
        list={visibleTasks}
        onCheck={handleTaskCheck}
        onDelete={handleTaskDelete}
        onAdd={handleTaskAdd}
      />
    </div>
  );
}

export default App;
