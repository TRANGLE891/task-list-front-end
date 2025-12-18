import axios from 'axios';

export const getTasks = () => {
  return axios
    .get('http://127.0.0.1:5000/tasks')
    .then((response) => {
      return response.data.map((task) => {
        return {
          key: task.id,
          id: task.id,
          title: task.title,
          isComplete: task.is_complete,
        };
      });
    });
};

export const addTask = ({
  title, description,
}) => {
  return axios
    .post('localhost:5000/tasks', {
      body: {
        'title': title,
        'description': description,
      }
    })
    .catch((error) => console.log(error));
};

export const deleteTask = (id) => {
  return axios
    .delete(`${'http://127.0.0.1:5000/tasks'}/${id}`)
    .catch((error) => {
      console.log(error);
    });
};

export const toggleComplete = (id) => {
  return axios
    .patch(`http://127.0.0.1:5000/tasks/${id}/mark_complete`, {})
    .catch((error) => {
      console.log(error);
    });
};

export const toggleIncomplete = (id) => {
  return axios
    .patch(`http://127.0.0.1:5000/tasks/${id}/mark_incomplete`, {})
    .catch((error) => {
      console.log(error);
    });
};

