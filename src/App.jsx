import TaskList from './components/TaskList.jsx';
import './App.css';
import { deleteTask, getTasks } from './apis/tasks.js';
import { useEffect, useState } from 'react';
import { toggleComplete, toggleIncomplete } from './apis/tasks.js';


const App = () => {
  // const toggleComplete = (id) => {
  //   // setTasks(prevTasks =>
  //   //   prevTasks.map(task =>
  //   //     task.id === id ? { ...task, isComplete: !task.isComplete } : task
  //   //   )
  //   // );
  // };

  const deleteTaskCallback = async (id) => {
    await deleteTask(id);
    getTasks().then((data) => setTasks(data));
    //setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  const toggleCompleteCallback = async (id, newIsComplete) => {
    if (newIsComplete) {
      await toggleComplete(id);
    } else {
      await toggleIncomplete(id);
    }
    getTasks().then((data) => setTasks(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={tasks}
          onToggleComplete={toggleCompleteCallback}
          deleteTask={deleteTaskCallback}
        />}</div>
      </main>
    </div>
  );
};

export default App;
