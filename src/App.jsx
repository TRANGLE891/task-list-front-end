import TaskList from './components/TaskList.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';


const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

getAllTasksAPI().then(tasks => console.log(tasks));

const convertFromAPI = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    isComplete: !!task.is_complete,
    completedAt: task.completed_at || null
  };
};

const addTaskAPI = (newTask) => {
  return axios.post(`${kbaseURL}/tasks`, newTask)
    .catch(error => console.log(error));
};

const markCompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch(error => console.log(error));
};

const markInCompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .catch(error => console.log(error));
};

const deleteTaskAPI = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const convertedTasks = tasks.map(convertFromAPI);
        setTasks(convertedTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleComplete = (id, isComplete) => {
    const request = isComplete ? markInCompleteAPI(id) : markCompleteAPI(id);

    return request.then(()=>{
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, isComplete: !task.isComplete }
            : task
        )
      );
    });
  };

  const deleteTask = (id) => {
    return deleteTaskAPI(id)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      });
  };

  const onHandleSubmit = (data) => {
    return addTaskAPI(data)
      .then((result) => {
        setTasks((prevTasks) => [convertFromAPI(result.data), ...prevTasks]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />}
        </div>
        <NewTaskForm onHandleSubmit={onHandleSubmit}/>
      </main>
    </div>
  );
};

export default App;
