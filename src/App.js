import { useState } from 'react';
import './App.css';

function App() {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) { // pressed enter
      if (updateItem) { // user is here for update
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const filteredList = tasks.filter((item) => item.id !== updateItem.id);
        setTasks([...filteredList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prevTasks) => [...prevTasks, obj]);
      }
      setValue('');
    }
  };

  const handleDrag = (e, task) => {
    e.preventDefault();
    setDragTask(task);
  };

  const handleDrop = (e) => {
    const status = e.target.getAttribute('data-status');
    if (status) {
      const updatedTasks = tasks.map((item) => {
        if (dragTask && dragTask.id === item.id) {
          return { ...item, status: status };
        }
        return item;
      });
      setTasks(updatedTasks);
      setDragTask(null);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (item) => {
    const filteredTasks = tasks.filter((task) => task.id !== item.id);
    setTasks(filteredTasks);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div className='App'>
      <h1>Task Manager</h1>
      <input
        onChange={handleChange}
        type='text'
        value={value}
        onKeyDown={handleKeyDown}
      />

      <div className='board'>
        <div
          className='todo'
          onDrop={handleDrop}
          onDragOver={onDragOver}
          data-status={TODO}
        >
          <h2 className='todo-col'>Todo</h2>
          {tasks.length > 0 &&
            tasks.map((task) => (
              task.status === TODO && (
                <div
                  onDrag={(e) => handleDrag(e, task)}
                  draggable
                  key={task.id}
                  className='task-item'
                >
                  {task.title}
                  <div className='btns'>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))}
        </div>

        <div
          className='doing'
          data-status={DOING}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className='doing-col'>Doing</h2>
          {tasks.length > 0 &&
            tasks.map((task) => (
              task.status === DOING && (
                <div
                  onDrag={(e) => handleDrag(e, task)}
                  draggable
                  key={task.id}
                  className='task-item'
                >
                  {task.title}
                  <div>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))}
        </div>

        <div
          className='done'
          data-status={DONE}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className='done-col'>Done</h2>
          {tasks.length > 0 &&
            tasks.map((task) => (
              task.status === DONE && (
                <div
                  onDrag={(e) => handleDrag(e, task)}
                  draggable
                  key={task.id}
                  className='task-item'
                >
                  {task.title}
                  <div>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
